import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaDeleteLeft } from 'react-icons/fa6';

type Props = {
    label: string;
    setFieldValue: any;
    setValueName: string;
    oldData?: string[] | []
};

const MultiEntryInput = ({ setFieldValue, setValueName, label, oldData }: Props) => {
    const [multiValueList, setMultiValueList] = useState<[] | string[]>(oldData || []);
    const { t } = useTranslation();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const removeVariant = (indexToRemove: number) => {
        const updatedMultiValue = multiValueList.filter(
            (_, index) => index !== indexToRemove
        );
        setMultiValueList(updatedMultiValue);
        setFieldValue(setValueName, updatedMultiValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addVariantFromInput();
        }
    };

    const addVariantFromInput = () => {
        if (inputRef.current && inputRef.current.value) {
            const inputValue = inputRef.current.value;
            setMultiValueList((prev) => [
                ...prev,
                inputValue,
            ]);
            setFieldValue(setValueName, [...multiValueList, inputValue]);
            inputRef.current.value = '';
        }
    };

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
                    <input
                        ref={inputRef}
                        onKeyDown={handleKeyDown}
                        placeholder={t('type-here')}
                        className="border w-full border-secondaryLightGray rounded-md py-[10px] px-[14px] outline-none"
                    />
                    {multiValueList.length !== 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            {multiValueList.map((item, index) => (
                                <button
                                    type="button"
                                    key={index}
                                    onClick={() => removeVariant(index)}
                                    className="flex justify-between cursor-pointer"
                                >
                                    <span className="text-xs text-white bg-primaryGreen rounded-md p-2 flex items-center gap-2">
                                        {item}
                                        <FaDeleteLeft size={15} />
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MultiEntryInput;
