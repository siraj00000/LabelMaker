import DynamicForm from '../../Forms/DynamicForm';
import * as yup from "yup";
import ToggleSwitch from '../../../switch/Switch';
import { useFormik } from 'formik';
import { HorizontalInputField } from '../../Fields/HorizontalInputField';
import { useTranslation } from 'react-i18next';
import { useSubmit } from 'react-router-dom';

const EditCategoryForm = ({ closeDrawer, item }: any) => {
  const submit = useSubmit();
  const { t } = useTranslation();

  let initialValues = {
    title: item.title || "",
    description: item.description || "",
    status: item.status || "show", // Default status
    formType: "edit",
    _id: item._id
  }

  // Define validation schema for the form
  const validationSchema = yup.object({
    title: yup.string().required(`Title is required`),
    description: yup.string(),
    status: yup.string().oneOf(["show", "hide"]).required("Status is required"),
    formType: yup.string(),
  });


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // Submit the FormData
      submit(values, { method: "PUT", action: "/categories" });
    },

  });

  return (
    <DynamicForm title={t('edit-category')} handleSubmit={formik.handleSubmit} closeDrawer={closeDrawer} >
      <div className="px-5 py-5 pb-[50%] space-y-3 overflow-y-auto">
        <div className="mb-3">
          <label htmlFor="status" className="flex items-center justify-end gap-2 text-primaryDarkGray text-[14px] font-semibold capitalize">
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
          id="title"
          type="text"
          label={t('title')}
          name={`title`}
          value={formik.values.title}
          onChange={formik.handleChange}
          placeholder={t("category-title-placeholder")}
          errormessage={
            formik.touched.title
              ? Array.isArray(formik.errors.title)
                ? formik.errors.title.join(", ")
                : typeof formik.errors.title === "string"
                  ? formik.errors.title
                  : ""
              : ""}
        />

        <HorizontalInputField
          id="description"
          type="text"
          label={t('description')}
          name={`description`}
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder={t("category-description-placeholder")}
          errormessage={
            formik.touched.description
              ? Array.isArray(formik.errors.description)
                ? formik.errors.description.join(", ")
                : typeof formik.errors.description === "string"
                  ? formik.errors.description
                  : ""
              : ""}
        />

      </div>
    </DynamicForm >
  )
}

export default EditCategoryForm