import DynamicForm from '../../Forms/DynamicForm';
import * as yup from "yup";
import ToggleSwitch from '../../../switch/Switch';
import { useFormik } from 'formik';
import { HorizontalInputField } from '../../Fields/HorizontalInputField';
import { useTranslation } from 'react-i18next';
import { useSubmit } from 'react-router-dom';

const CreateCategoryForm = ({ closeDrawer }: any) => {
  const submit = useSubmit();
  const { t } = useTranslation();

  let initialValues = {
    title: "",
    description: "",
    status: "show", // Default status
    formType: "add",
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
      submit(values, { method: "POST", action: "/categories" });
    },

  });

  return (
    <DynamicForm title={t('add-category')} handleSubmit={formik.handleSubmit} closeDrawer={closeDrawer} >
      <div className="px-5 py-5 pb-[50%] space-y-3 overflow-y-auto">
        <div className="mb-3">
          <label htmlFor="status" className="flex items-center justify-end gap-2 text-primaryDarkGray text-[14px] font-semibold capitalize">
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
          id="title"
          type="text"
          label={t('title')}
          name={`title`}
          value={formik.values.title}
          onChange={formik.handleChange}
          placeholder={t("category-title-placeholder")}
          errormessage={formik.touched.title ? formik.errors.title : ""}
        />

        <HorizontalInputField
          id="description"
          type="text"
          label={t('description')}
          name={`description`}
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder={t("category-description-placeholder")}
          errormessage={formik.touched.description ? formik.errors.description : ""}
        />

      </div>
    </DynamicForm >
  )
}

export default CreateCategoryForm
