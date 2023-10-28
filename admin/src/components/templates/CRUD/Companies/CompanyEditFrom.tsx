import DynamicForm from '../../Forms/DynamicForm';
import * as yup from "yup";
import ToggleSwitch from '../../../switch/Switch';
import { useFormik } from 'formik';
import { HorizontalInputField } from '../../Fields/HorizontalInputField';
import { useTranslation } from 'react-i18next';
import { useSubmit } from 'react-router-dom';
import { useState } from 'react';
import { ApiGetResponse } from '../../../../types/response.type';
import { notifyError } from '../../../../utils/toast';
import { ListData } from '../../../../types';
import SubcategoryService from '../../../../services/SubCategoryServices';
import HorizontalMultiSelect from '../../Fields/HorizontalMultiSelect';

const EditCompanyForm = ({ closeDrawer, item }: any) => {
    const submit = useSubmit();
    const { t } = useTranslation();   

    const [subCategories, setSubCategory] = useState<Array<ListData> | []>([]);

    const fetchSubCategory = async () => {
        if (subCategories && subCategories.length > 0) return
        try {
            const response = await SubcategoryService.getSubcategoryListOfName() as ApiGetResponse

            if (response.data.success) {
                setSubCategory(response.data.data);
            }
        } catch (error) {
            notifyError('Failed to get sub categories')
        }
    }

    let initialValues = {
        name: item.name || "",
        email: item.email || "",
        pincode: item.pincode || "",
        registered_address: item.registered_address || "",
        phone_one: item.phone_one || "",
        phone_two: item.phone_two || "",
        estaiblishment_year: item.estaiblishment_year?.split('T')[0] || "",
        status: "show", // Default status
        sub_category: item.sub_category || [],
        formType: "edit",
        _id: item._id
    }

    // Define validation schema for the form
    const validationSchema = yup.object({
        name: yup.string().required('Name is required'),
        email: yup
            .string()
            .email('Invalid email format')
            .required('Email is required'),
        pincode: yup
            .string()
            .matches(/^\d{6}$/, 'Atleast 6 digits')
            .required('Pincode is required'),
        registered_address: yup.string(),
        phone_one: yup
            .string()
            .matches(/^\d{10}$/, 'Invalid phone number format, atleast 10 digits')
            .nullable(),
        phone_two: yup
            .string()
            .matches(/^\d{10}$/, 'Invalid phone number format, atleast 10 digits')
            .nullable(),
        estaiblishment_year: yup
            .date()
            .nullable()
            .typeError('Invalid date format'),
        status: yup.string().oneOf(['show', 'hide']).required('Status is required'),
        formType: yup.string(),
    });


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            // Submit the FormData
            submit(values, { method: "PUT", action: "/companies" });
        },
    });

    return (
        <DynamicForm title={t('edit-company')} handleSubmit={formik.handleSubmit} closeDrawer={closeDrawer} >
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
                    id="name"
                    type="text"
                    label={t('name')}
                    name={`name`}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder={t("company_name_placeholder")}
                    errormessage={
                        formik.touched.name
                            ? Array.isArray(formik.errors.name)
                                ? formik.errors.name.join(", ")
                                : typeof formik.errors.name === "string"
                                    ? formik.errors.name
                                    : ""
                            : ""} />

                <HorizontalInputField
                    id="email"
                    type="email"
                    label={t('company-email')}
                    name={`email`}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder={t("email_placeholder")}
                    errormessage={
                        formik.touched.email
                            ? Array.isArray(formik.errors.email)
                                ? formik.errors.email.join(", ")
                                : typeof formik.errors.email === "string"
                                    ? formik.errors.email
                                    : ""
                            : ""} />

                <HorizontalInputField
                    id="pincode"
                    type="number"
                    label={t('Pincode')}
                    name={`pincode`}
                    value={formik.values.pincode}
                    onChange={formik.handleChange}
                    placeholder={t("pincode_placeholder")}
                    errormessage={
                        formik.touched.pincode
                            ? Array.isArray(formik.errors.pincode)
                                ? formik.errors.pincode.join(", ")
                                : typeof formik.errors.pincode === "string"
                                    ? formik.errors.pincode
                                    : ""
                            : ""} />

                <HorizontalInputField
                    id="registered_address"
                    type="text"
                    label={t('registered_address_title')}
                    name={`registered_address`}
                    value={formik.values.registered_address}
                    onChange={formik.handleChange}
                    placeholder={t("registered_address_placeholder")}
                    errormessage={
                        formik.touched.registered_address
                            ? Array.isArray(formik.errors.registered_address)
                                ? formik.errors.registered_address.join(", ")
                                : typeof formik.errors.registered_address === "string"
                                    ? formik.errors.registered_address
                                    : ""
                            : ""} />

                <HorizontalInputField
                    id="phone_one"
                    type="tel"
                    label={t('phone_one_title')}
                    name={`phone_one`}
                    value={formik.values.phone_one}
                    onChange={formik.handleChange}
                    placeholder={t("phone_one_placeholder")}
                    errormessage={
                        formik.touched.phone_one
                            ? Array.isArray(formik.errors.phone_one)
                                ? formik.errors.phone_one.join(", ")
                                : typeof formik.errors.phone_one === "string"
                                    ? formik.errors.phone_one
                                    : ""
                            : ""} />

                <HorizontalInputField
                    id="phone_two"
                    type="tel"
                    label={t('phone_two_title')}
                    name={`phone_two`}
                    value={formik.values.phone_two}
                    onChange={formik.handleChange}
                    placeholder={t("phone_two_placeholder")}
                    errormessage={
                        formik.touched.phone_two
                            ? Array.isArray(formik.errors.phone_two)
                                ? formik.errors.phone_two.join(", ")
                                : typeof formik.errors.phone_two === "string"
                                    ? formik.errors.phone_two
                                    : ""
                            : ""} />

                <HorizontalInputField
                    id="estaiblishment_year"
                    type="date"
                    label={t('estaiblishment_year_title')}
                    name={`estaiblishment_year`}
                    value={formik.values.estaiblishment_year}
                    onChange={formik.handleChange}
                    placeholder={t("estaiblishment_year_placeholder")}
                    errormessage={
                        formik.touched.estaiblishment_year
                            ? Array.isArray(formik.errors.estaiblishment_year)
                                ? formik.errors.estaiblishment_year.join(", ")
                                : typeof formik.errors.estaiblishment_year === "string"
                                    ? formik.errors.estaiblishment_year
                                    : ""
                            : ""} />

                <HorizontalMultiSelect
                    setFieldValue={formik.setFieldValue}
                    name="sub_category"
                    data={subCategories}
                    defaultValues={item.sub_category}
                    fetchRelatedData={fetchSubCategory}
                    placeholder={'subcategory'}
                    label='subcategory'
                    dataKey="title"
                />

            </div>
        </DynamicForm >
    )
}

export default EditCompanyForm