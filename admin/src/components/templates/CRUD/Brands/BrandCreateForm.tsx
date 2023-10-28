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

const BrandCreateForm = ({ closeDrawer }: any) => {
  const submit = useSubmit();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
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
    name: "",
    status: "show",
    videoURL: "",
    product_description: "",
    re_order_link: "",
    formType: 'add'
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
    <DynamicForm title={t('add-brand')} handleSubmit={formik.handleSubmit} closeDrawer={closeDrawer} >
      <div className="px-5 py-5 pb-[50%] space-y-3 overflow-y-auto">

        <div className="grid grid-cols-5 gap-x-5 gap-y-3 py-5">
          {checkList.map((listItem, index) => (
            <FormikCheckbox
              key={index}
              setFieldValue={formik.setFieldValue}
              setFieldName={listItem.checkName}
              label={listItem.checkName}
              onChange={(isChecked) => handleDynamicInputFields(isChecked, { ...listItem, index })}
            />
          ))}
        </div>

        <HorizontalInputField
          id="name"
          type="text"
          label={t('Brand name')}
          name={`name`}
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder={t("brand-name-placeholder")}
          errormessage={formik.touched.name ? formik.errors.name : ""}
        />

        <HorizontalSingleSelect
          setFieldValue={formik.setFieldValue}
          name='company_id'
          data={companies}
          fetchRelatedData={fetchCompany}
          placeholder='company'
          label='Company'
          dataKey='name'
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
          defaultValue='No feature'
        />

        <MultiEntryInput
          setFieldValue={formik.setFieldValue}
          setValueName='carousel_headings'
          label='Carousel Headings'
        />

        <MultiEntryInput
          setFieldValue={formik.setFieldValue}
          setValueName='carousel_text'
          label='Carousel Text'
        />

        <HorizontalInputField
          id="re_order_link"
          type="text"
          label={t('re_order_link')}
          name={`re_order_link`}
          value={formik.values.re_order_link}
          onChange={formik.handleChange}
          placeholder={t("type-here")}
          errormessage={formik.touched.re_order_link ? formik.errors.re_order_link : ""}
        />

        <HorizontalInputField
          id="videoURL"
          type="text"
          label={t('video URL')}
          name={`videoURL`}
          value={formik.values.videoURL}
          onChange={formik.handleChange}
          placeholder={t("type-here")}
          errormessage={formik.touched.videoURL ? formik.errors.videoURL : ""}
        />

        <HorizontalTextAreaField
          id="product_description"
          type="text"
          label={t('product_description')}
          name={`product_description`}
          value={formik.values.product_description}
          onChange={formik.handleChange}
          placeholder={t("type-here")}
          errormessage={formik.touched.product_description ? formik.errors.product_description : ""}
        />

        <div className="mb-3">
          <label htmlFor="status" className="flex items-center gap-2 text-primaryDarkGray text-sm max-sm:text-xs font-semibold capitalize">
            {t('published')}
            <ToggleSwitch
              status={formik.values.status === "show"}
              onStatusChange={(newStatus) => formik.setFieldValue("status", newStatus ? "show" : "hide")}
            />
          </label>
          {formik.touched.status && formik.errors.status && (
            <div className="text-danger">{formik.errors.status}</div>
          )}
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
            src={formik.values.videoURL}
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

export default BrandCreateForm