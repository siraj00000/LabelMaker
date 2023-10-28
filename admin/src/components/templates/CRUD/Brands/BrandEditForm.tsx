import DynamicForm from '../../Forms/DynamicForm'
import * as yup from "yup";
import ToggleSwitch from '../../../switch/Switch';
import { useFormik } from 'formik';
import { HorizontalInputField } from '../../Fields/HorizontalInputField';
import { useTranslation } from 'react-i18next';
import { useSubmit } from 'react-router-dom';
import React, { useState } from 'react';
import { ListData } from '../../../../types';
import { ApiGetResponse } from '../../../../types/response.type';
import { notifyError } from '../../../../utils/toast';
import MultiImageUpload from '../../../Upload/MultiImageUpload';
import HorizontalSingleSelect from '../../Fields/HorizontalSingleSelect';
import HorizontalSingleDropdown from '../../Fields/Dropdown';
import CompanyService from '../../../../services/CompanyServices';
import MultiEntryInput from '../../Fields/VariantField';
import FormikCheckbox from '../../Fields/FormikCheckbox';
import BRAND_CHECK_LIST from '../../../../data/brandCheckList';
import { HorizontalTextAreaField } from '../../Fields/TextArea';
import VideoUpload from '../../../Upload/UploadVideo';

const BrandEditForm = ({ closeDrawer, item }: any) => {
  const submit = useSubmit();
  const [selectedImages, setSelectedImages] = useState<File[]>(item.images || []);
  const [checkList, setCheckList] = useState(BRAND_CHECK_LIST);
  const { t } = useTranslation();

  const [companies, setCompanies] = useState<Array<ListData> | null>(null);

  const fetchCompany = async () => {
    if (companies && companies.length > 0) return
    try {
      const response = await CompanyService.getIdAndName() as ApiGetResponse

      if (response.data) {
        setCompanies(response.data.data);
      }
    } catch (error) {
      notifyError('Failed to get companies')
    }
  }

  let initialValues = {
    name: item.name || "",
    status: item.status || "show",
    videoURL: item.videoURL || "",
    product_description: item.product_description || "",
    re_order_link: item.re_order_link || "",
    formType: 'edit',
    _id: item._id
  }

  // Define validation schema for the form
  const validationSchema = yup.object({
    name: yup.string().required(`Name is required`),
    status: yup.string().oneOf(["show", "hide"]).required("Status is required"),
    re_order_link: yup
      .string()
      .url('Reorder Link must be a valid URL'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {

      const formData = new FormData();

      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          const value = values[key as keyof typeof values];

          if (key === 'files' && Array.isArray(value)) {
            value.map(file => {
              return formData.append('images', file)
            })

          } else {
            // For keys other than 'files', append the values directly to FormData
            formData.append(key, value as string | Blob);
          }
        }
      }
      // Submit the FormData
      submit(formData, { method: "POST", action: "/brands", encType: "multipart/form-data" });
    },

  });

  const handleDynamicInputFields = (isChecked: boolean, currentItem: any) => {
    let getPrevList = [...checkList];
    getPrevList[currentItem.index].isCheck = isChecked
    setCheckList(getPrevList)
  }

  return (
    <DynamicForm title={t('edit-brand')} handleSubmit={formik.handleSubmit} closeDrawer={closeDrawer} >
      <div className="px-5 py-5 pb-[50%] space-y-3 overflow-y-auto">
        <div className="mb-3">
          <label htmlFor="status" className="flex items-center gap-2 text-primaryDarkGray text-[14px] font-semibold capitalize">
            {t('published')}
            <ToggleSwitch
              status={formik.values.status === "show"}
              onStatusChange={(newStatus) => formik.setFieldValue("status", newStatus ? "show" : "hide")}
            />
          </label>
          {formik.touched.status && typeof formik.errors.status === "string" && (
            <div className="text-danger">{formik.errors.status}</div>
          )}
        </div>

        <HorizontalInputField
          id="name"
          type="text"
          label={t('Brand name')}
          name={`name`}
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder={t("brand-name-placeholder")}
          errormessage={
            formik.touched.name
              ? Array.isArray(formik.errors.name)
                ? formik.errors.name.join(", ")
                : typeof formik.errors.name === "string"
                  ? formik.errors.name
                  : ""
              : ""}
        />

        <HorizontalSingleSelect
          setFieldValue={formik.setFieldValue}
          name='company_id'
          data={companies}
          fetchRelatedData={fetchCompany}
          placeholder='company'
          label='Company'
          dataKey='name'
          defaultData={[item.company_id]}
        />

        {/* Include the ImageUpload component */}
        <MultiImageUpload
          inputProps={{
            id: "files",
            type: "file",
            label: t('Product Images'),
            name: `files`,
            onChange: formik.handleChange
          }}
          label={t('product-images')}
          setFieldValue={formik.setFieldValue}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />

        <HorizontalSingleDropdown
          setKeyName='authentication_feature'
          title="Feature"
          options={[
            { name: 'Label' },
            { name: 'Batch' },
            { name: 'No feature' },
          ]}
          updateOption={formik.setFieldValue}
          defaultValue={item.authentication_feature}
        />

        <MultiEntryInput
          setFieldValue={formik.setFieldValue}
          setValueName='carousel_headings'
          label='Carousel Headings'
          oldData={item.carousel_headings}
        />

        <MultiEntryInput
          setFieldValue={formik.setFieldValue}
          setValueName='carousel_text'
          label='Carousel Text'
          oldData={item.carousel_text}
        />

        <HorizontalInputField
          id="re_order_link"
          type="text"
          label={t('re_order_link')}
          name={`re_order_link`}
          value={formik.values.re_order_link}
          onChange={formik.handleChange}
          placeholder={t("type-here")}
          errormessage={
            formik.touched.re_order_link
              ? Array.isArray(formik.errors.re_order_link)
                ? formik.errors.re_order_link.join(", ")
                : typeof formik.errors.re_order_link === "string"
                  ? formik.errors.re_order_link
                  : ""
              : ""}
        />

        <HorizontalInputField
          id="videoURL"
          type="text"
          label={t('video URL')}
          name={`videoURL`}
          value={formik.values.videoURL}
          onChange={formik.handleChange}
          placeholder={t("type-here")}
          errormessage={
            formik.touched.videoURL
              ? Array.isArray(formik.errors.videoURL)
                ? formik.errors.videoURL.join(", ")
                : typeof formik.errors.videoURL === "string"
                  ? formik.errors.videoURL
                  : ""
              : ""}
        />

        <HorizontalTextAreaField
          id="product_description"
          type="text"
          label={t('product_description')}
          name={`product_description`}
          value={formik.values.product_description}
          onChange={formik.handleChange}
          placeholder={t("type-here")}
          errormessage={
            formik.touched.product_description
              ? Array.isArray(formik.errors.product_description)
                ? formik.errors.product_description.join(", ")
                : typeof formik.errors.product_description === "string"
                  ? formik.errors.product_description
                  : ""
              : ""}
        />

        <div className="grid grid-cols-3 gap-x-5 gap-y-3 py-5">
          {checkList.map((listItem, index) => (
            <FormikCheckbox
              key={index}
              setFieldValue={formik.setFieldValue}
              setFieldName={listItem.checkName}
              checked={item[listItem.checkName]}
              label={listItem.checkName}
              onChange={(isChecked) => handleDynamicInputFields(isChecked, { ...listItem, index })}
            />
          ))}
        </div>

        {checkList.map(({ inputName, isCheck, relationship, inputType }, index) => (
          <React.Fragment key={index}>
            {isCheck && relationship &&
              <HorizontalInputField
                id={inputName}
                label={t(inputName)}
                name={inputName}
                type={inputType}
                onChange={formik.handleChange}
                placeholder={t("type-here")}
              />
            }
          </React.Fragment>
        ))}

        {!formik.values.videoURL && <VideoUpload onVideoUpload={formik.setFieldValue} name='video' />}

        {formik.values.videoURL &&
          <iframe
            src={formik.values.videoURL || item.videoURL}
            title="Brand Video"
            width="100%"
            height="300" // You can adjust the height as needed
            className='py-5 w-3/4 ml-auto'
          ></iframe>
        }
      </div>
    </DynamicForm >
  )
}

export default BrandEditForm