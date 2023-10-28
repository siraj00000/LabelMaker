import DynamicForm from '../../Forms/DynamicForm';
import * as yup from "yup";
import ToggleSwitch from '../../../switch/Switch';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSubmit } from 'react-router-dom';

const EditCategoryForm = ({ closeDrawer, item }: any) => {
  const submit = useSubmit();
  const { t } = useTranslation();

  let initialValues = {
    status: item.status || "show", // Default status
    formType: "bulk",
    _id: item._id
  }

  // Define validation schema for the form
  const validationSchema = yup.object({
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
      </div>
    </DynamicForm >
  )
}

export default EditCategoryForm