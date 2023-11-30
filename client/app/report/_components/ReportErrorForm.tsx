'use client'

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField } from '@/app/components/form/TextField';
import { REPORT_ERROR_FIELD_LIST } from '@/app/data/FormFieldData';
import { notifyError, notifySuccess } from '@/app/components/toast';
import { useRouter } from 'next/navigation';
import { LabelDetails } from '@/app/types/response.types';
import ReportService from '@/app/services/ReportService';

interface FormValues {
    brand_id: string;
    product_id: string;
    store_and_location: string;
    purchase_date: string;
    store_pin_code: string;
}

// Define a type for your form field names
type FormFieldNames = keyof FormValues;

const validationSchema = yup.object({
    store_and_location: yup.string().required('Store location is required'),
    purchase_date: yup.string().required('Purchase date is required'),
    store_pin_code: yup.string().required('Store Pincode is required'),
});

const ReportErrorForm = ({ brand_id, product_id }: LabelDetails) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter();

    let initialValues: FormValues = {
        brand_id,
        product_id,
        store_and_location: '',
        purchase_date: '',
        store_pin_code: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true)

            try {
                const response = await ReportService.registerReport(values) as any;

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
            <h1 className='md:text-5xl text-2xl text-center font-medium text-black capitalize'>Report Error</h1>
            <fieldset className='max-full grid md:grid-cols-2 grid-cols-1 gap-5 mx-auto'>

                {REPORT_ERROR_FIELD_LIST.map((field, fieldIdx) => (
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

                <button
                    type="submit"
                    className="md:col-span-2 w-full p-2 px-5 rounded-xl font-nunito700 text-secondary shadow-shadowGray border bg-black text-white hover:opacity-95 drop-shadow-xl border-transparent capitalize"
                >{isLoading ? "Reporting..." : `Report`}</button>
            </fieldset>
        </form>
    );
}

export default ReportErrorForm;