import React from 'react';

interface ChildrenProps {
    children: React.ReactNode;
}

export const FormLayout: React.FC<ChildrenProps> = ({ children }) => {
    return (
        <div className="w-full max-w-md mx-auto p-4">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                {children}
            </div>
        </div>
    );
};

export const FormHeader: React.FC<ChildrenProps> = ({ children }) => {
    return <div className="mb-4">{children}</div>;
};

export const FormBody: React.FC<ChildrenProps> = ({ children }) => {
    return <div className="mb-6">{children}</div>;
};

export const FormFooter: React.FC<ChildrenProps> = ({ children }) => {
    return <div>{children}</div>;
};
