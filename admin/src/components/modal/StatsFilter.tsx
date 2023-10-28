import { FormEvent, useState } from "react";
import useModal from "../../hooks/useModal";
import CombineServices from "../../services/CombineService";
import LabelServices from "../../services/LabelServices"
import { ApiGetResponse } from "../../types/response.type";
import { notifyError } from "../../utils/toast";
import Modal from "./common";
import { ListData } from "../../types";
import * as yup from "yup";
import { useFormik } from "formik";
import { HorizontalInputField } from "../templates/Fields/HorizontalInputField";
import { useTranslation } from "react-i18next";
import HorizontalSingleSelect from "../templates/Fields/HorizontalSingleSelect";
import HorizontalDropdownSelect from "../templates/Fields/Dropdown";
import ButtonsWithIcon from "../templates/Button/ButtonWithIcon";
import { TbFileTypeCsv } from "react-icons/tb";

type StatsFilterModalProps = {
    buttonLayout: React.ReactNode;
    buttonTitle: string
}

type filterQueriesTypes = {
    brand_id: string;
    product_id: string;
    batch_number: string;
    variant: string;
    createdAt: string;
}

const StatsFilter: React.FC<StatsFilterModalProps> = ({ buttonTitle, buttonLayout }) => {
    const { handleCloseModal, type, handleOpenModal } = useModal();
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

    const downloadCSV = async ({ brand_id, batch_number, product_id, variant, createdAt }: filterQueriesTypes) => {
        try {
            const response: any = await LabelServices.downloadLabel(brand_id, product_id, variant, batch_number, createdAt)
            
            if (response.data) {
                window.open(`${process.env.REACT_APP_URL_FILES}/${response.data?.downloadURL}`, "_parent");
            }
        } catch (error: any) {
            notifyError(error)
        }
    }

    let initialValues = {
        brand_id: "", product_id: "", batch_number: "", createdAt: "", variant: ""
    }

    const validationSchema = yup.object({
        brand_id: yup.string().required('Brand is required'),
        product_id: yup.string().required('Product is required'),
        variant: yup.string(),
        batch_number: yup.string().required('Batch number is required'),
        createdAt: yup.date().required('Created date is required')
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            downloadCSV(values);
            resetForm();
            setBrands(null);
            setProducts(null);
            handleCloseModal()
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formik.handleSubmit(e);
    }
    return (
        <Modal
            toggleBtn={
                <div onClick={() => handleOpenModal(buttonTitle)} className='max-sm:flex-1'>
                    {buttonLayout}
                </div>
            }
            open={type === buttonTitle}
            handleCloseModal={handleCloseModal}
            maxWidth="max-w-lg"
        >
            <form onSubmit={handleSubmit} className="p-5 space-y-5">
                <h1 className="w-full text-primaryGreen font-jakartaPlus text-lg max-sm:text-dm font-semibold capitalize py-5">
                    Label Filteration
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

                <div>
                    <HorizontalSingleSelect
                        setFieldValue={formik.setFieldValue}
                        name="brand_id"
                        data={brands}
                        fetchRelatedData={fetchBrands}
                        placeholder='brand'
                        label='Brand'
                        dataKey='name'
                    />
                    <p className="mt-2 text-sm text-red-600 font-medium pl-1 text-right">
                        {formik.touched.brand_id ? formik.errors.brand_id : ""}
                    </p>
                </div>

                <div>
                    <HorizontalSingleSelect
                        setFieldValue={formik.setFieldValue}
                        name="product_id"
                        data={products || null}
                        fetchRelatedData={fetchBrandProducts}
                        placeholder='product'
                        label='product'
                        dataKey='name'
                    />
                    <p className="mt-2 text-sm text-red-600 font-medium pl-1 text-right">
                        {formik.touched.product_id ? formik.errors.product_id : ""}
                    </p>
                </div>

                {formik.values.product_id && products && products.length > 0 &&
                    <HorizontalDropdownSelect
                        setKeyName="variant"
                        title="Variant"
                        options={products.flatMap((product) => {
                            if (product._id === formik.values.product_id) {
                                return Object.keys(product.feature).map((key) => ({ name: String(key) }));
                            }
                            return []; // Return an empty array if the condition is not met
                        })}
                        updateOption={formik.setFieldValue}
                    />}

                <HorizontalInputField
                    id="createdAt"
                    type="date"
                    label={t('created-date')}
                    name={`createdAt`}
                    value={formik.values.createdAt}
                    onChange={formik.handleChange}
                    placeholder={t("created-date-placeholder")}
                    errormessage={formik.touched.createdAt ? formik.errors.createdAt : ""}
                />

                <ButtonsWithIcon
                    Icon={TbFileTypeCsv}
                    title="Download CSV"
                    type="submit"
                    extraStyles="flex items-center justify-center"
                />
            </form>
        </Modal>
    )
}

export default StatsFilter