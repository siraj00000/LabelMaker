import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type FeaturesFieldProps = {
    label: string;
    featureKeyList: string[];
    setFieldValue: (fieldName: string, value: any) => void;
    fieldName: string;
    defaultFeatures?: { [key: string]: string }
};

const FeaturesField: React.FC<FeaturesFieldProps> = ({ label, featureKeyList, setFieldValue, fieldName, defaultFeatures }) => {
    const { t } = useTranslation();
    const [featureValues, setFeatureValues] = useState<{ [key: string]: string } | null | undefined>(null);

    useEffect(() => {
        setFeatureValues(null);    
    }, [featureKeyList])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        setFeatureValues(prev => ({ ...prev!, [name]: value }));
        setFieldValue(fieldName, { ...featureValues!, [name]: value });
    };

    let isReadyToSubmit =
        featureValues &&
        Object.entries(featureValues).length === featureKeyList?.length &&
        !Object.values(featureValues).some(value => value.trim() === ''); // Check for empty values

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-5 w-full">
                <label
                    htmlFor={label}
                    className="w-1/4 text-primaryDarkGray font-jakartaPlus text-sm max-sm:text-xs font-medium capitalize"
                >
                    {t(label)}
                </label>

                <div className="w-3/4 ml-auto space-y-2 text-sm rounded-md py-[0px] px-[0px] outline-none">
                    {featureKeyList?.map((feature: string, featureIndex: number) => (
                        // console.log(feature,featureValues?.[feature]),
                        
                        <fieldset key={featureIndex} className='space-y-2'>
                            <label
                                htmlFor={feature}
                                className="w-full text-primaryDarkGray font-jakartaPlus text-xs max-sm:text-xs font-medium capitalize"
                            >
                                {t(feature)}
                            </label>
                            <input
                                key={featureIndex}
                                type="text"
                                name={feature}
                                defaultValue={defaultFeatures?.[feature]}
                                className="border w-full col-span-2 border-secondaryLightGray rounded-md py-[10px] px-[14px] outline-none"
                                onChange={handleInputChange}
                            />
                        </fieldset>
                    ))}


                    {isReadyToSubmit && <div className="flex items-center gap-2 flex-wrap">
                        {featureValues && Object.entries(featureValues).map(([key, value]: any) => (
                            <span key={key} className='text-sm bg-secondaryLightGray rounded-md text-primaryGreen p-2 capitalize'>{key} - {value}</span>
                        ))}
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default FeaturesField;
