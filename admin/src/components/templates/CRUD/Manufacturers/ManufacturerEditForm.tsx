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
import CompanyService from '../../../../services/CompanyServices';
import HorizontalSingleSelect from '../../Fields/HorizontalSingleSelect';

const ManufacturerEditForm = ({ closeDrawer, item }: any) => {
    const submit = useSubmit();
    const { t } = useTranslation();

    const [companies, setCompanies] = useState<Array<ListData> | null>(null);

    const fetchCompanies = async () => {
        if (companies && companies.length > 0) return
        try {
            const response = await CompanyService.getIdAndName() as ApiGetResponse

            if (response.data.success) {
                setCompanies(response.data.data);
            }
        } catch (error) {
            notifyError('Failed to get company')
        }
    }

    let initialValues = {
        name: item.name || "",
        email: item.email || "",
        pincode: item.pincode || "",
        registered_address: item.registered_address || "",
        phone_one: item.phone_one || "",
        phone_two: item.phone_two || "",
        category_id: item.company_id?._id || "",
        status: item.status || "active", // Default status
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
        status: yup.string().oneOf(['active', 'inactive']).required('Status is required'),
        formType: yup.string(),
    });


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            // Submit the FormData
            submit(values, { method: "PUT", action: "/manufacturers" });
        },
    });

    return (
        <DynamicForm title={t('edit-manufacturer')} handleSubmit={formik.handleSubmit} closeDrawer={closeDrawer} >
            <div className="px-5 py-5 pb-[50%] space-y-3 overflow-y-auto">
                <div className="mb-3">
                    <label htmlFor="status" className="flex items-center justify-end gap-2 text-primaryDarkGray text-[14px] font-semibold capitalize">
                        {t('published')}
                        <ToggleSwitch
                            status={formik.values.status === "active"}
                            onStatusChange={(newStatus) => formik.setFieldValue("status", newStatus ? "active" : "inactive")}
                        />
                    </label>
                    {formik.touched.status && typeof formik.errors.status === "string" && (
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
                    placeholder={t("manufacturer-name-placeholder")}
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
                    label={t('manufacturer-email')}
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

                <HorizontalSingleSelect
                    setFieldValue={formik.setFieldValue}
                    name="company_id"
                    data={companies}
                    fetchRelatedData={fetchCompanies}
                    placeholder={'company'}
                    label='Company'
                    dataKey='name'
                    defaultData={[item.company_id]}
                />

            </div>
        </DynamicForm >
    )
}

export default ManufacturerEditForm