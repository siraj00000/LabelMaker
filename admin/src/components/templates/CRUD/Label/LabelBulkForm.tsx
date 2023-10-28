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
import HorizontalSingleSelect from '../../Fields/HorizontalSingleSelect';
import HorizontalDropdownSelect from '../../Fields/Dropdown';
import FormikCheckbox from '../../Fields/FormikCheckbox';
import CombineServices from '../../../../services/CombineService';

const LabelBulkForm = ({ closeDrawer, selectedIds }: any) => {
    const submit = useSubmit();
    const { t } = useTranslation();

    const [brands, setBrands] = useState<Array<ListData> | null>(null);
    const [products, setProducts] = useState<Array<any> | null>(null);

    const fetchBrands = async () => {
        if (brands && brands.length > 0) return;
        try {
            const response = await CombineServices.fetchManufacturerBrands() as ApiGetResponse
            if (response.data) {
                setBrands(response.data.data);
            }
        } catch (error) {
            notifyError('Failed to fetch');
        }
    }

    const fetchBrandProducts = async () => {
        if (products && products.length > 0) return;
        try {
            const response = await CombineServices.fetchManufacturerBrandProducts(formik.values.brand_id) as ApiGetResponse
            if (response.data) {
                setProducts(response.data.data);
            }
        } catch (error) {
            notifyError('Failed to fetch');
        }
    }

    let initialValues = {
        plant_name: "",
        batch_number: "",
        status: "show", // Default status
        formType: "bulk",
        brand_id: "",
        product_id: "",
        tag_number: "",
        tag_active: false,
        labelIds: selectedIds
    }

    // Define validation schema for the form
    const validationSchema = yup.object({
        plant_name: yup.string(),
        status: yup.string().oneOf(["show", "hide"]).required("Status is required"),
        formType: yup.string(),
    });


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);

            // Submit the FormData
            submit(values, { method: "PUT", action: "/label" });
        },
    });

    return (
        <DynamicForm title={t('bulk-label')} handleSubmit={formik.handleSubmit} closeDrawer={closeDrawer} >
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

                <h1 className="w-full text-primaryGreen font-jakartaPlus text-lg max-sm:text-dm font-semibold capitalize py-2">
                    Label Info
                </h1>

                <HorizontalInputField
                    id="batch_number"
                    type="text"
                    label={t('batch_number')}
                    name={`batch_number`}
                    value={formik.values.batch_number}
                    onChange={formik.handleChange}
                    placeholder={t("batch-number-placeholder")}
                    errormessage={formik.touched.batch_number ? formik.errors.batch_number : ""}
                />

                <HorizontalInputField
                    id="plant_name"
                    type="text"
                    label={t('plant_name')}
                    name={`plant_name`}
                    value={formik.values.plant_name}
                    onChange={formik.handleChange}
                    placeholder={t("plant-name-placeholder")}
                    errormessage={formik.touched.plant_name ? formik.errors.plant_name : ""}
                />

                <FormikCheckbox
                    label='Tag'
                    setFieldName="tag_active"
                    setFieldValue={formik.setFieldValue}
                />

                {formik.values.tag_active && <HorizontalInputField
                    id="tag_number"
                    type="text"
                    label={t('tag_number')}
                    name={`tag_number`}
                    value={formik.values.tag_number}
                    onChange={formik.handleChange}
                    placeholder={t("tag-number-placeholder")}
                    errormessage={formik.touched.tag_number ? formik.errors.tag_number : ""}
                />}

                <h1 className="w-full text-primaryGreen font-jakartaPlus text-lg max-sm:text-dm font-semibold capitalize py-5">
                    Brand, Product & Variant
                </h1>

                <HorizontalSingleSelect
                    setFieldValue={formik.setFieldValue}
                    name="brand_id"
                    data={brands}
                    fetchRelatedData={fetchBrands}
                    placeholder='brand'
                    label='Brand'
                    dataKey='name'
                />

                {formik.values.brand_id &&
                    <HorizontalSingleSelect
                        setFieldValue={formik.setFieldValue}
                        name="product_id"
                        data={products || null}
                        fetchRelatedData={fetchBrandProducts}
                        placeholder='product'
                        label='product'
                        dataKey='name'
                    />
                }

                {formik.values.product_id && products && products.length > 0 &&
                    <HorizontalDropdownSelect
                        setKeyName="variant"
                        title="Variant"
                        options={products.flatMap((product) => Object.keys(product.feature).map((key) => ({ name: String(key) })))}
                        updateOption={formik.setFieldValue}
                    />}

            </div>
        </DynamicForm >
    )
}

export default LabelBulkForm