'use client'

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField } from '@/app/components/form/TextField';
import { WARRANTY_EDITFORM_FIELD_LIST } from '@/app/data/FormFieldData';
import WarrantyService from '@/app/services/WarranyService';
import { notifyError, notifySuccess } from '@/app/components/toast';
import { useRouter } from 'next/navigation';

type Props = {
    id: string
}

interface FormValues {
    pincode: string;
    address1: string;
    address2: string;
}

// Define a type for your form field names
type FormFieldNames = keyof FormValues;

const validationSchema = yup.object({
    pincode: yup.string(),
    address1: yup.string(),
    address2: yup.string(),
});

const WarrantyEditForm = ({ id }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter();

    let initialValues: FormValues = {
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
                const response = await WarrantyService.editRegisteredProduct(id, formData) as any;

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
            <h1 className='md:text-5xl text-2xl text-center font-medium text-black capitalize'>Update Registered Product</h1>
            <fieldset className='max-full grid md:grid-cols-2 grid-cols-1 gap-5 mx-auto'>

                {WARRANTY_EDITFORM_FIELD_LIST.map((field, fieldIdx) => (
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

export default WarrantyEditForm;