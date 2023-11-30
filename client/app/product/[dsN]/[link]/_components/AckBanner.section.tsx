// import Image from 'next/image'
import React from 'react';
import { AiOutlineSafety } from 'react-icons/ai'

type AcknowledgementBannerProps = {
    message: string;
}

const AcknowledgementBanner = ({ message }: AcknowledgementBannerProps) => {
    return (
        <section className='w-full flex items-center'>
            <div className="text-center py-4 lg:px-4 mx-auto">
                <div className="p-2 bg-yellow-50 items-center text-gray-800 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                    <span className="flex rounded-full bg-yellow-300 uppercase px-2 py-1 text-xs font-bold mr-3">Label Status</span>
                    <span className="font-medium mr-2 text-left flex-auto">{message}</span>
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                </div>
            </div>

        </section>
    )
}

export default AcknowledgementBanner
