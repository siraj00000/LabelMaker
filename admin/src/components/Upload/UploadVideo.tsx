import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillCloseCircle, AiOutlineCloudUpload } from 'react-icons/ai';

interface VideoUploadProps {
    onVideoUpload?: any;
    name: string
}

const VideoUpload: React.FC<VideoUploadProps> = ({ name, onVideoUpload }) => {
    const { t } = useTranslation();
    const allowedFormats = ['video/mp4']; // Add any other allowed formats here
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setVideoFile(files[0]);
            onVideoUpload && onVideoUpload(name, files[0]);
        }
    };

    const handleRemoveVideo = () => {
        setVideoFile(null);
        onVideoUpload && onVideoUpload(name, null);
    };

    return (
        <div className="w-full flex items-start gap-5">
            <label className="w-1/4 text-primaryDarkGray font-jakartaPlus text-sm max-sm:text-xs font-semibold capitalize">
                Video
            </label>

            <div className="relative w-3/4 ml-auto">
                <label htmlFor="video-upload" className="relative w-full ml-auto">
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="video-upload"
                    />
                    <div className="w-full h-24 flex items-center justify-center gap-4 border-dashed border-2 border-gray-400 cursor-pointer">
                        <AiOutlineCloudUpload size={50} className="text-primaryGreen" />
                        <aside>
                            <p className="text-md text-primaryDarkGray font-medium">
                                {t('Upload Video')}
                            </p>
                            <p className="text-xs text-gray-400 ">{allowedFormats.join(', ')}</p>
                        </aside>
                    </div>
                </label>

                {videoFile && <div className="">

                    <div className="w-72 h-48">
                        <video
                            src={URL.createObjectURL(videoFile)}
                            controls
                            className="w-full h-full"
                        />
                    </div>
                    <button
                        onClick={handleRemoveVideo}
                        className="text-red-500 cursor-pointer"
                    >
                        <AiFillCloseCircle size={20} />
                    </button>
                </div>}
            </div>
        </div>
    );
};

export default VideoUpload;