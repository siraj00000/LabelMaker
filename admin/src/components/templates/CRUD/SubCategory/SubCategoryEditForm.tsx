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

const EditSubCategoryForm = ({ closeDrawer, item }: any) => {
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
        title: item.title || "",
        status: item.status || "show", // Default status
        formType: "edit",
        parent_category_id: item.parent_category_id || [],
        features: item.features || [],
        _id: item._id
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
            if (typeof values['parent_category_id'] === 'object') {
                values['parent_category_id'] = item.parent_category_id._id
            }

            // Submit the FormData
            submit(values, { method: "PUT", action: "/sub-categories" });
        },

    });

    return (
        <DynamicForm title={t('edit-subcategory')} handleSubmit={formik.handleSubmit} closeDrawer={closeDrawer} >
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
                    placeholder={t("subcategory-title-placeholder")}
                    errormessage={
                        formik.touched.title
                            ? Array.isArray(formik.errors.title)
                                ? formik.errors.title.join(", ")
                                : typeof formik.errors.title === "string"
                                    ? formik.errors.title
                                    : ""
                            : ""} />

                <HorizontalSingleSelect
                    setFieldValue={formik.setFieldValue}
                    name="parent_category_id"
                    data={categories}
                    fetchRelatedData={fetchCategory}
                    placeholder={'category'}
                    label='parent category'
                    dataKey='title'
                    defaultData={[item.parent_category_id]}
                />

                <MultiEntryInput
                    setFieldValue={formik.setFieldValue}
                    setValueName='features'
                    label='Features'
                    oldData={item.features}
                />

            </div>
        </DynamicForm >
    )
}

export default EditSubCategoryForm