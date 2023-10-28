import React, { useCallback } from 'react';
import { AiOutlineCloudUpload, AiOutlineClose } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { notifyError } from '../../utils/toast';
import { InputProps } from '../../types';

interface MultiImageUploadProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedImages: File[]; // Change prop name and type to accept an array of File objects
    setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>; // Change prop name
    inputProps?: InputProps;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void; // Add Formik's setFieldValue
    label: string
}

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
    selectedImages, // Update prop name
    setSelectedImages, // Update prop name
    setFieldValue,
    label
}) => {
    const { t } = useTranslation();
    const allowedFormats = ['image/jpeg', 'image/png']; // Add any other allowed formats here

    const handleImageSelection = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files;
            const newSelectedImages: File[] = [...selectedImages];

            if (files) {
                // Calculate the maximum number of images allowed (5 - current selected images)
                const maxImagesAllowed = 5 - selectedImages.length;

                for (let i = 0; i < files.length && i < maxImagesAllowed; i++) {
                    const file = files[i];
                    if (allowedFormats.includes(file.type)) {
                        newSelectedImages.push(file);
                    } else {
                        // Handle invalid file formats here
                        notifyError(`Invalid file format for ${file.name}`);
                    }
                }

                setSelectedImages(newSelectedImages);
                setFieldValue('files', newSelectedImages);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedImages, setSelectedImages, setFieldValue]
    );

    const removeImage = (index: number, imageURL: any) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
        setFieldValue('files', updatedImages);
        console.log(imageURL);

    };

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];

        if (file) {
            // Calculate the maximum number of images allowed (5 - current selected images)
            const maxImagesAllowed = 5 - selectedImages.length;

            if (maxImagesAllowed > 0) {
                if (allowedFormats.includes(file.type)) {
                    setSelectedImages([...selectedImages, file]);
                    setFieldValue('files', [...selectedImages, file]);
                } else {
                    // Handle invalid file format here
                    notifyError('Invalid file format');
                }
            } else {
                // Handle the case where the user tries to upload more than 5 images
                notifyError('You can upload up to 5 images.');
            }
        }
    };

    return (
        <div
            className="flex items-start justify-between w-full gap-5"
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            <label className="w-1/4 text-primaryDarkGray font-jakartaPlus text-sm max-sm:text-xs font-semibold capitalize">
                {label}
            </label>

            <div className="relative w-3/4 ml-auto">
                <label htmlFor="image" className="relative w-wfull ml-auto">
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept={allowedFormats.join(',')}
                        onChange={handleImageSelection}
                        className="absolute w-full inset-0 opacity-0"
                        multiple  // Allow multiple file selection
                    />
                    <div className="w-full h-24 flex items-center justify-center gap-4 border-dashed border-2 border-gray-400 cursor-pointer">
                        <AiOutlineCloudUpload size={50} className="text-primaryGreen" />
                        <aside>
                            <p className="text-md text-primaryDarkGray font-medium">
                                {t('upload-image')}
                            </p>
                            <p className="text-xs text-gray-400 ">{allowedFormats.join(', ')}</p>
                        </aside>
                    </div>
                </label>
                {selectedImages.length ?
                    <div className="flex flex-wrap gap-2 my-2">
                        {selectedImages.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    title="Click to remove"
                                    src={image instanceof File ? URL.createObjectURL(image) : image}
                                    alt={`uploaded-${index}`}
                                    className="w-20 h-20 mx-auto border border-secondaryLightGray cursor-pointer hover:opacity-60"
                                    onClick={() => removeImage(index, image)}
                                />
                                <button
                                    type='button'
                                    onClick={() => removeImage(index, image)}
                                    className="absolute top-0 right-0 -mt-1 -mr-1 p-1 bg-white rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition duration-300 ease-in-out"
                                >
                                    <AiOutlineClose size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                    : null}
            </div>
        </div>
    );
};

export default MultiImageUpload;
