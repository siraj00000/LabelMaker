import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { notifyError } from '../../utils/toast';
import { } from 'formik'
import { useTranslation } from 'react-i18next';

interface ImageUploadProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    uploadImage: any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ uploadImage }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { t } = useTranslation();
    const allowedFormats = ['image/jpeg', 'image/png']; // Add any other allowed formats here

    const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            if (allowedFormats.includes(file.type)) {
                setSelectedImage(file);
                uploadImage('image', file)
            } else {
                // Handle invalid file format here
                notifyError("Invalid file format");
            }
        }
    }

    const removeImage = () => {
        setSelectedImage(null);
    };


    return (
        <div className=' flex items-center justify-between w-full h-32'>
            <label htmlFor="image" className="relative w-full">
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept={allowedFormats.join(',')}
                    onChange={handleImageSelection}
                    className='absolute w-full inset-0 opacity-0'
                />

                {!selectedImage ? <div className="w-full h-24 flex items-center justify-center gap-4 border-dashed border-2 border-gray-400 cursor-pointer">
                    <AiOutlineCloudUpload
                        size={50}
                        className="text-primaryGreen"
                    />
                    <aside>
                        <p className='text-md text-primaryDarkGray font-medium'>{t("upload-image")}</p>
                        <p className='text-xs text-gray-400 '>{allowedFormats.join(', ')}</p>
                    </aside>
                </div> :
                    <img
                        title='Click to remove'
                        src={URL.createObjectURL(selectedImage)}
                        alt="uploaded"
                        className="w-32 h-32 mx-auto cursor-pointer hover:opacity-60"
                        onClick={removeImage}
                    />
                }
            </label>
        </div>
    );
};

export default ImageUpload;
