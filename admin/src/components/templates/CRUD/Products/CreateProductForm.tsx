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
import MultiEntryInput from '../../Fields/VariantField';
import FormikCheckbox from '../../Fields/FormikCheckbox';
import PRODUCT_CHECK_LIST from '../../../../data/productChecksList';
import { HorizontalTextAreaField } from '../../Fields/TextArea';
import VideoUpload from '../../../Upload/UploadVideo';
import CombineServices from '../../../../services/CombineService';
import FeaturesField from '../../Fields/FeaturesField';

const ProductCreateForm = ({ closeDrawer }: any) => {
  const submit = useSubmit();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [checkList, setCheckList] = useState(PRODUCT_CHECK_LIST);
  const { t } = useTranslation();

  const [brands, setBrands] = useState<Array<ListData> | null>(null);
  const [subcategories, setSubcategories] = useState<Array<any>>();

  const fetchBrands = async () => {
    if (brands && brands.length > 0) return
    try {
      const response = await CombineServices.fetchCompanyBrands() as ApiGetResponse

      if (response.data) {
        setBrands(response.data.data);
      }
    } catch (error) {
      notifyError('Failed to get brands')
    }
  }

  const fetchSubcategories = async () => {
    if (subcategories && subcategories.length > 0) return
    try {
      const response = await CombineServices.fetchCompanySubcategories() as ApiGetResponse

      if (response.data) {
        setSubcategories(response.data.data);
      }
    } catch (error) {
      notifyError('Failed to get subcategories')
    }
  }

  let initialValues = {
    name: "",
    variant_type: "",
    sub_category_id: "",
    status: "show",
    feature: {},
    video_url: "",
    product_description: "",
    re_order_link: "",
    formType: 'add'
  }

  // Define validation schema for the form
  const validationSchema = yup.object({
    name: yup.string().required(`Name is required`),
    variant_type: yup.string().required(`Variants are required`),
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
            value.map((file) => {
              return formData.append('images', file);
            });
          } else if (key === 'feature' && typeof value === 'object') {
            formData.append(`feature`, JSON.stringify(value))
          } else {
            // For keys other than 'files', append the values directly to FormData
            formData.append(key, value as string | Blob);
          }
        }
      }

      // Submit the FormData
      submit(formData, { method: "POST", action: "/products", encType: "multipart/form-data" });
    },

  });
  const handleDynamicInputFields = (isChecked: boolean, currentItem: any) => {
    let getPrevList = [...checkList];
    getPrevList[currentItem.index].isCheck = isChecked
    setCheckList(getPrevList)
  }

  // subcategores has the key of features
  let featureLists = subcategories && subcategories?.length > 0 && subcategories?.filter(i => i._id === formik.values.sub_category_id);

  return (
    <DynamicForm title={t('add-product')} handleSubmit={formik.handleSubmit} closeDrawer={closeDrawer}>
      <div className="px-5 py-5 pb-[50%] space-y-3 overflow-y-auto">
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

        <HorizontalInputField
          id="name"
          type="text"
          label={t('product-name')}
          name={`name`}
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder={t("product-name-placeholder")}
          errormessage={formik.touched.name ? formik.errors.name : ""}
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

        <div className="grid grid-cols-3 gap-y-3 py-5">
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

        <h1 className="w-full text-primaryGreen font-jakartaPlus text-lg max-sm:text-dm font-semibold capitalize py-5">
          Brands, Sub Categories & Features
        </h1>

        <HorizontalSingleSelect
          setFieldValue={formik.setFieldValue}
          name='brand_id'
          data={brands}
          fetchRelatedData={fetchBrands}
          placeholder='brand'
          label='Brands'
          dataKey='name'
        />

        <HorizontalSingleSelect
          setFieldValue={formik.setFieldValue}
          name='sub_category_id'
          data={subcategories || null}
          fetchRelatedData={fetchSubcategories}
          placeholder='subcategory'
          label='Sub Categories'
          dataKey='title'
        />

        {featureLists &&
          <FeaturesField
            label='Features'
            featureKeyList={featureLists[0]?.features}
            setFieldValue={formik.setFieldValue}
            fieldName='feature'
          />
        }

        <h1 className="w-full text-primaryGreen font-jakartaPlus text-lg max-sm:text-dm font-semibold capitalize py-5">
          Product Variants
        </h1>

        <HorizontalInputField
          id="variant_type"
          type="text"
          label={t('variant-type')}
          name={`variant_type`}
          value={formik.values.variant_type}
          onChange={formik.handleChange}
          placeholder={t("product-variant-placeholder")}
          errormessage={formik.touched.variant_type ? formik.errors.variant_type : ""}
        />

        <MultiEntryInput
          setFieldValue={formik.setFieldValue}
          setValueName='variants'
          label='Variants'
        />

        <h1 className="w-full text-primaryGreen font-jakartaPlus text-lg max-sm:text-dm font-semibold capitalize py-5">
          Upload Images & Video
        </h1>

        {/* Include the ImageUpload component */}
        <MultiImageUpload
          inputProps={{
            id: "files",
            type: "file",
            name: `files`,
            label: t('product-images'),
            onChange: formik.handleChange
          }}
          label={t('product-images')}
          setFieldValue={formik.setFieldValue}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />

        <div className="h-5" />

        <HorizontalInputField
          id="video_url"
          type="text"
          label={t('video-url')}
          name={`video_url`}
          value={formik.values.video_url}
          onChange={formik.handleChange}
          placeholder={t("type-here")}
          errormessage={formik.touched.video_url ? formik.errors.video_url : ""}
        />

        {!formik.values.video_url && <VideoUpload onVideoUpload={formik.setFieldValue} name='video' />}

        {formik.values.video_url &&
          <iframe
            src={formik.values.video_url}
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

export default ProductCreateForm