'use client'

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField } from '@/app/components/form/TextField';
import { WARRANTY_FORM_FIELD_LIST } from '@/app/data/FormFieldData';
import ImageUpload from '@/app/components/form/Upload/SingleImageUpload';
import WarrantyService from '@/app/services/WarranyService';
import { notifyError, notifySuccess } from '@/app/components/toast';
import { useRouter } from 'next/navigation';

type Props = {
    dsN: string;
    link: string;
}

interface FormValues {
    DS1: string;
    warranty_activated: boolean;
    purchase_date: string;
    store_name: string;
    store_pin_code: string;
    warranty_duration: string;
    invoice_number: string;
    pincode: string;
    address1: string;
    address2: string;
}

// Define a type for your form field names
type FormFieldNames = keyof FormValues;

const validationSchema = yup.object({
    purchase_date: yup.string().required('Purchase date is required'),
    store_name: yup.string().required('Store name is required'),
    store_pin_code: yup.string().required('Store pin code is required'),
    warranty_duration: yup.string().required('Warranty duration is required'),
    invoice_number: yup.string().required('Invoice number is required'),
    pincode: yup.string().required('Pincode is required'),
    address1: yup.string().required('Address Line 1 is required'),
    address2: yup.string(),
});

const WarrantyRegFrom = (props: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter();
    const { link } = props;
    let initialValues: FormValues = {
        DS1: link,
        warranty_activated: false,
        purchase_date: '',
        store_name: '',
        store_pin_code: '',
        warranty_duration: '',
        invoice_number: '',
        pincode: '',
        address1: '',
        address2: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true)

            // Handle form submission here
            const formData = new FormData();

            for (const key in values) {
                if (values.hasOwnProperty(key)) {
                    const value = values[key as keyof typeof values];
                    formData.append(key, value as string | Blob);
                }
            }

            try {
                const response = await WarrantyService.registerProduct(formData) as any;

                if (response.data.success) {
                    notifySuccess(response.data.message)
                    setIsLoading(false)

                    setTimeout(() => {
                        router.back();
                    }, 1000);
                }

            } catch (error) {
                setIsLoading(false)

                let err = error as any
                if (err.response.data.error) {
                    notifyError(err.data.error);
                    return
                }
                notifyError("Something went wrong")
            }

        },
    });

    return (
        <form method='POST' onSubmit={formik.handleSubmit} className='max-w-3xl w-full  border rounded-xl md:p-10 px-5 py-10 space-y-10 mx-auto my-10'>
            <h1 className='md:text-5xl text-2xl text-center font-medium text-black capitalize'>Register Product</h1>
            <fieldset className='max-full grid md:grid-cols-2 grid-cols-1 gap-5 mx-auto'>

                {WARRANTY_FORM_FIELD_LIST.map((field, fieldIdx) => (
                    <TextField
                        key={fieldIdx}
                        id={field.name}
                        type={field.type}
                        label={field.label}
                        name={field.name as FormFieldNames} // Assert the type here
                        value={formik.values[field.name as FormFieldNames]} // Assert the type here
                        onChange={formik.handleChange}
                        placeholder={field.placeholder}
                        errormessage={formik.touched[field.name as FormFieldNames] ? formik.errors[field.name as FormFieldNames] : ""}
                    />
                ))}

                {/* Upload Invoice Image */}
                <ImageUpload uploadImage={formik.setFieldValue} />

                <button
                    type="submit"
                    className="md:col-span-2 w-full p-2 px-5 rounded-xl font-nunito700 text-secondary shadow-shadowGray border bg-black text-white hover:opacity-95 drop-shadow-xl border-transparent capitalize"
                >{isLoading ? "Registration..." : `Register`}</button>
            </fieldset>
        </form>
    );
}

export default WarrantyRegFrom;
