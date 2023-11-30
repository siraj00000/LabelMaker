'use client'

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField } from '@/app/components/form/TextField';
import { AUTH_FORM_LIST } from '@/app/data/FormFieldData';
import { notifyError, notifySuccess } from '@/app/components/toast';
import { useRouter } from 'next/navigation';
import RequestHelpService from '@/app/services/RequestHelpService';

type Props = {
    dsN: string;
    link: string;
}

interface FormValues {
    DS1: string;
    request_date: string;
    help_ref_num: string;
    address: string;
    pincode: string;
}

// Define a type for your form field names
type FormFieldNames = keyof FormValues;

const validationSchema = yup.object({
    request_date: yup.string().required('Date is required'),
    help_ref_num: yup.string().required('Reference number is required'),
    address: yup.string().required('Address is required'),
    pincode: yup.string().required('Pincode is required'),
});


const LoginForm = ({ dsN, link }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter();

    let initialValues: FormValues = {
        DS1: dsN + '/' + link,
        request_date: '',
        help_ref_num: '',
        address: '',
        pincode: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true)

            try {
                const response = await RequestHelpService.registerHelpRequest(values) as any;

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
        <form method='POST' onSubmit={formik.handleSubmit} className='max-w-xl w-full  border rounded-xl md:p-10 px-5 py-10 space-y-10 mx-auto my-10'>
            <h1 className='md:text-5xl text-2xl text-center font-medium text-black capitalize'>Login</h1>
            <fieldset className='max-full grid grid-cols-1 gap-5 mx-auto'>

                {AUTH_FORM_LIST.map((field, fieldIdx) => (
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
                >{isLoading ? "Updating..." : `Update`}</button>
            </fieldset>
        </form>
    );
}

export default LoginForm;