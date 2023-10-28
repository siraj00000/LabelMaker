import React from "react";
import { Form, useNavigation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GrClose } from "react-icons/gr";

type HeaderProps = {
    title: string;
    closeDrawer: any
};

const Header: React.FC<HeaderProps> = ({ title, closeDrawer }) => {
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-end gap-2 w-full bg-secondaryLightBlue py-5 px-5">
            <div className="mr-auto">
                <h1 className="text-xl font-medium text-primaryDarkGray capitalize">{t(title)}</h1>
                <p className="text-xs text-primaryDarkGray mt-2">
                    {t(`${title} and necessary information from here`)}
                </p>
            </div>

            {/* Close Icon */}
            <button type="button" onClick={closeDrawer}>
                <GrClose size={30} className="cursor-pointer" />
            </button>
        </div>
    );
};

const Footer = ({ closeDrawer }: any) => {
    const { state } = useNavigation();
    const { t } = useTranslation();
    let isSubmitting = state === 'submitting';
    return (
        <div className="flex items-center gap-2 text-center absolute bottom-0 w-full bg-secondaryLightBlue py-5 px-5 z-30">
            <button type="button" onClick={closeDrawer} className="flex-1 border-2 border-gray-400 bg-white rounded-lg text-md text-gray-500 capitalize font-medium py-3 px-4">
                {t('cancel')}
            </button>
            <button type="submit" className="flex-1 border-2 border-primaryGreen bg-primaryGreen rounded-lg text-md text-white capitalize font-medium py-3 px-4">
                {t(isSubmitting ? 'saving...' : 'save')}
            </button>
        </div>
    );
};


// Specify the type parameter T for CreateCategoryFormProps
type CreateCategoryFormProps = {
    title: string;
    children: React.ReactNode;
    handleSubmit?: (e?: React.FormEvent<HTMLFormElement> | undefined) => void // Pass FormikType with the type parameter T
    closeDrawer: any
};

// Make DynamicForm fully generic with type parameter T
const DynamicForm: React.FC<CreateCategoryFormProps> = ({ title, children, handleSubmit, closeDrawer }) => {
    return (
        <Form onSubmit={handleSubmit} className="relative flex flex-col gap-2 w-full h-full">
            <Header title={title} closeDrawer={closeDrawer} />
            {children}
            <Footer closeDrawer={closeDrawer} />
        </Form>
    );
};

export default DynamicForm;
