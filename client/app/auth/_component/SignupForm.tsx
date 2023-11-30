'use client'

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField } from '@/app/components/form/TextField';
import { AUTH_FORM_LIST } from '@/app/data/FormFieldData';
import { useRouter } from 'next/navigation';
import usePhoneAuth from '@/app/hooks/usePhoneAuth';

type Props = {
    dsN: string;
    link: string;
}

interface FormValues {
    DS1: string;
    phonenumber: string;
}

// Define a type for your form field names
type FormFieldNames = keyof FormValues;

const validationSchema = yup.object({
    phonenumber: yup.string()
        .matches(/^\+[0-9]{12}$/, {
            message: 'Phone number is not in valid format (E.164)',
            excludeEmptyString: true,
        }) // Matches E.164 format (+<country code><number>)
        .test('is-indian-number', 'Phone number is not an Indian number', (value) => {
            const phoneNumber = value?.replace(/\D/g, ''); // Remove non-digit characters
            return !!phoneNumber && phoneNumber.startsWith('92'); // Check if the number starts with the Indian country code (91)
        })
        .required('Phone number is required')
});


const SignUpForm = ({ dsN, link }: Props) => {
    const { handleSendCode } = usePhoneAuth();
    const router = useRouter();

    let initialValues: FormValues = {
        DS1: dsN + '/' + link,
        phonenumber: ''
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            // handleSendCode(values.phonenumber)
        },
    });

    return (
        <form method='POST' onSubmit={formik.handleSubmit} className='max-w-xl w-full  border rounded-xl md:p-10 px-5 py-10 space-y-10 mx-auto my-10'>
            <h1 className='md:text-5xl text-2xl text-center font-medium text-black capitalize'>Verify Yourself</h1>
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
                >Verify</button>
            </fieldset>
        </form>
    );
}

export default SignUpForm;