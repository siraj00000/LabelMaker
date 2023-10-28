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

type FeatureList = {
  features: string[];
};

const ProductEditForm = ({ closeDrawer, item }: any) => {
  const submit = useSubmit();
  const [selectedImages, setSelectedImages] = useState<File[]>(item.images || []);
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
    name: item.name || "",
    variant_type: item.variant_type || "",
    sub_category_id: item.sub_category_id._id || "",
    status: item.status || "show",
    feature: item.feature || {},
    videoURL: item.video_url.url || "",
    product_description: item.product_description || "",
    re_order_link: item.re_order_link || "",
    formType: 'edit',
    _id: item._id
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
      console.log(values);


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
      // return
      // Submit the FormData
      submit(formData, { method: "PUT", action: "/products", encType: "multipart/form-data" });
    },

  });
  const handleDynamicInputFields = (isChecked: boolean, currentItem: any) => {
    let getPrevList = [...checkList];
    getPrevList[currentItem.index].isCheck = isChecked
    setCheckList(getPrevList)
  }

  // subcategores has the key of features
  let featureLists = subcategories && subcategories?.length > 0 && subcategories?.filter(i => i._id === formik.values.sub_category_id) as false | FeatureList[];
  let defaultFeatures = Object.keys(item.feature)?.map(i => i);

  return (
    <DynamicForm title={t('edit-product')} handleSubmit={formik.handleSubmit} closeDrawer={closeDrawer}>
      <div className="px-5 py-5 pb-[50%] space-y-3 overflow-y-auto">
        <div className="mb-3">
          <label htmlFor="status" className="flex items-center gap-2 text-primaryDarkGray text-sm max-sm:text-xs font-semibold capitalize">
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
          label={t('product-name')}
          name={`name`}
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder={t("product-name-placeholder")}
          errormessage={
            formik.touched.name
              ? Array.isArray(formik.errors.name)
                ? formik.errors.name.join(", ")
                : typeof formik.errors.name === "string"
                  ? formik.errors.name
                  : ""
              : ""} />

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
              : ""} />

        <div className="grid md:grid-cols-3 grid-cols-2 gap-y-3 py-5">
          {checkList.map((listItem, index) => (
            <FormikCheckbox
              key={index}
              setFieldValue={formik.setFieldValue}
              setFieldName={listItem.checkName}
              label={listItem.checkName}
              checked={item[listItem.checkName]}
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
                defaultValue={item[inputName]}
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
          defaultData={[item.brand_id]}
        />

        <HorizontalSingleSelect
          setFieldValue={formik.setFieldValue}
          name='sub_category_id'
          data={subcategories || null}
          fetchRelatedData={fetchSubcategories}
          placeholder='subcategory'
          label='Sub Categories'
          dataKey='title'
          defaultData={[item.sub_category_id]}
        />

        {(featureLists || item.feature) && (
          <FeaturesField
            label='Features'
            featureKeyList={featureLists ? featureLists[0]?.features : defaultFeatures}
            setFieldValue={formik.setFieldValue}
            fieldName='feature'
            defaultFeatures={item.feature}
          />
        )}

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
          errormessage={
            formik.touched.variant_type
              ? Array.isArray(formik.errors.variant_type)
                ? formik.errors.variant_type.join(", ")
                : typeof formik.errors.variant_type === "string"
                  ? formik.errors.variant_type
                  : ""
              : ""} />

        <MultiEntryInput
          setFieldValue={formik.setFieldValue}
          setValueName='variants'
          label='Variants'
          oldData={item.variants}
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
          id="videoURL"
          type="text"
          label={t('video-url')}
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
              : ""} />

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

export default ProductEditForm