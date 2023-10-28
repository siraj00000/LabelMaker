import DynamicForm from '../../Forms/DynamicForm';
import * as yup from "yup";
import ToggleSwitch from '../../../switch/Switch';
import { useFormik } from 'formik';
import { HorizontalInputField } from '../../Fields/HorizontalInputField';
import { useTranslation } from 'react-i18next';
import { useSubmit } from 'react-router-dom';
import { useState } from 'react';
import { CategoryNameApiGetResponse } from '../../../../types/response.type';
import { notifyError } from '../../../../utils/toast';
import CategoryService from '../../../../services/CategoryServices';
import { ListData } from '../../../../types';
import HorizontalSingleSelect from '../../Fields/HorizontalSingleSelect';
import MultiEntryInput from '../../Fields/VariantField';

const CreateSubCategoryForm = ({ closeDrawer }: any) => {
    const submit = useSubmit();
    const { t } = useTranslation();

    const [categories, setCategories] = useState<Array<ListData> | null>(null);

    const fetchCategory = async () => {
        if (categories && categories.length > 0) return
        try {
            const response = await CategoryService.getCategoryListOfName() as CategoryNameApiGetResponse

            if (response.data) {
                setCategories(response.data.data);
            }
        } catch (error) {
            notifyError('Failed to get categories')
        }
    }

    let initialValues = {
        title: "",
        status: "show", // Default status
        formType: "add",
    }

    // Define validation schema for the form
    const validationSchema = yup.object({
        title: yup.string().required(`Title is required`),
        status: yup.string().oneOf(["show", "hide"]).required("Status is required"),
        formType: yup.string(),
    });


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {          
            // Submit the FormData
            submit(values, { method: "POST", action: "/sub-categories" });
        },

    });

    return (
        <DynamicForm title={t('add-subcategory')} handleSubmit={formik.handleSubmit} closeDrawer={closeDrawer} >
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
                    placeholder={t("subcategory-title-placeholder")}
                    errormessage={formik.touched.title ? formik.errors.title : ""}
                />

                <HorizontalSingleSelect
                    setFieldValue={formik.setFieldValue}
                    name="parent_category_id"
                    data={categories}
                    fetchRelatedData={fetchCategory}
                    placeholder='category'
                    label='parent category'
                    dataKey='title'
                />

                <MultiEntryInput
                    setFieldValue={formik.setFieldValue}
                    setValueName='features'
                    label='Features'
                />

            </div>
        </DynamicForm >
    )
}

export default CreateSubCategoryForm
