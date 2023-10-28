import DynamicForm from '../../Forms/DynamicForm';
import * as yup from "yup";
import ToggleSwitch from '../../../switch/Switch';
import { useFormik } from 'formik';
import { HorizontalInputField } from '../../Fields/HorizontalInputField';
import { useTranslation } from 'react-i18next';
import { useSubmit } from 'react-router-dom';
import HorizontalDropdownSelect from '../../Fields/Dropdown';
import HorizontalSingleSelect from '../../Fields/HorizontalSingleSelect';
import ImageUpload from '../../../Upload/ImageUpload';
import { useState } from 'react';
import { ListData } from '../../../../types';
import CompanyService from '../../../../services/CompanyServices';
import { ApiGetResponse } from '../../../../types/response.type';
import { notifyError } from '../../../../utils/toast';
import ManufacturerService from '../../../../services/ManufacturerServices';

const StaffCreateForm = ({ closeDrawer }: any) => {
    const submit = useSubmit();
    const { t } = useTranslation();

    const [parentOrgData, setParentOrgData] = useState<Array<ListData> | null>(null);

    const fetchParentOrg = async (type: 'Company' | 'Manufacturer') => {
        if (parentOrgData && parentOrgData.length > 0) return
        try {
            let response;

            if (type === 'Company') {
                response = await CompanyService.getIdAndName() as ApiGetResponse
            } else if (type === 'Manufacturer') {
                response = await ManufacturerService.getIdAndName() as ApiGetResponse
            }

            if (response && response.data.success) {
                setParentOrgData(response.data.data);
            } else {
                return
            }
        } catch (error) {
            notifyError('Failed to get company')
        }
    }

    const onRoleChange = () => {
        setParentOrgData(null);
    }

    let initialValues = {
        name: "",
        email: "",
        city: "",
        address: "",
        country: "",
        joining_date: "",
        role: "Company Admin",
        status: "active", // Default status
        formType: "add",
        image: ""
    }

    // Define validation schema for the form
    const validationSchema = yup.object({
        name: yup.string().required(`name is required`),
        email: yup.string().required(`email is required`),
        city: yup.string(),
        address: yup.string(),
        country: yup.string(),
        joining_date: yup.string(),
        status: yup.string().oneOf(["active", "block"]).required("Status is required"),
        formType: yup.string(),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();

            for (const key in values) {
                const value = values[key as keyof typeof values];

                if (values.hasOwnProperty(key)) {
                    formData.append(key, value as string | Blob);
                }
            }

            // Submit the FormData
            submit(formData, { method: "POST", action: "/staff", encType: "multipart/form-data" });
        },
    });

    return (
        <DynamicForm title={t('add-staff')} handleSubmit={formik.handleSubmit} closeDrawer={closeDrawer} >
            <div className="px-5 py-5 pb-[50%] space-y-3 overflow-y-auto">
                <ImageUpload
                    uploadImage={formik.setFieldValue}
                />

                <div className="mb-3">
                    <label htmlFor="status" className="flex items-center justify-end gap-2 text-primaryDarkGray text-[14px] font-semibold capitalize">
                        {t('published')}
                        <ToggleSwitch
                            status={formik.values.status === "active"}
                            onStatusChange={(newStatus) => formik.setFieldValue("status", newStatus ? "active" : "block")}
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
                    placeholder={t("name-placeholder")}
                    errormessage={formik.touched.name ? formik.errors.name : ""}
                />

                <HorizontalInputField
                    id="email"
                    type="text"
                    label={t('email')}
                    name={`email`}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder={t("email-placeholder")}
                    errormessage={formik.touched.email ? formik.errors.email : ""}
                />

                <HorizontalInputField
                    id="city"
                    type="text"
                    label={t('city')}
                    name={`city`}
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    placeholder={t("city-placeholder")}
                    errormessage={formik.touched.city ? formik.errors.city : ""}
                />

                <HorizontalInputField
                    id="country"
                    type="text"
                    label={t('country')}
                    name={`country`}
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    placeholder={t("country-placeholder")}
                    errormessage={formik.touched.country ? formik.errors.country : ""}
                />

                <HorizontalInputField
                    id="address"
                    type="text"
                    label={t('address')}
                    name={`address`}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    placeholder={t("address-placeholder")}
                    errormessage={formik.touched.address ? formik.errors.address : ""}
                />

                <HorizontalInputField
                    id="joining_date"
                    type="date"
                    label={t('joining_date')}
                    name={`joining_date`}
                    value={formik.values.joining_date}
                    onChange={formik.handleChange}
                    placeholder={t("joining_date-placeholder")}
                    errormessage={formik.touched.joining_date ? formik.errors.joining_date : ""}
                />

                <h1 className="w-full text-primaryGreen font-jakartaPlus text-lg max-sm:text-dm font-semibold capitalize pt-5">
                    Role & Parent Organisation
                </h1>

                <HorizontalDropdownSelect
                    setKeyName="role"
                    title="Role"
                    options={[
                        { name: 'Company Admin' },
                        { name: 'Manufacturer Admin' },
                    ]}
                    updateOption={formik.setFieldValue}
                    defaultValue='Company Admin'
                    onChange={onRoleChange}
                />

                {formik.values.role === 'Company Admin' &&
                    <HorizontalSingleSelect
                        setFieldValue={formik.setFieldValue}
                        name="associatedId"
                        data={parentOrgData}
                        fetchRelatedData={() => fetchParentOrg('Company')}
                        placeholder={'company'}
                        label='Companies'
                        dataKey='name'
                    />
                }

                {formik.values.role === 'Manufacturer Admin' &&
                    <HorizontalSingleSelect
                        setFieldValue={formik.setFieldValue}
                        name="associatedId"
                        data={parentOrgData}
                        fetchRelatedData={() => fetchParentOrg('Manufacturer')}
                        placeholder={'manufacturer'}
                        label='Manufacturers'
                        dataKey='name'
                    />
                }
            </div>
        </DynamicForm >
    )
}

export default StaffCreateForm
