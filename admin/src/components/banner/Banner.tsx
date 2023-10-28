import React from 'react';
import { useTranslation } from 'react-i18next';
import { BsCircleFill } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

type BannerProps = {
    title: string;
    searchName?: string;
};

const Banner: React.FC<BannerProps> = ({ title }) => {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    let splitedPathname = pathname.split('/').filter(path => path !== '');

    return (
        <aside className='relative z-10 overflow-hidden flex flex-col gap-4 rounded-2xl bg-greenish p-8'>
            <h6 className='text-2xl font-semibold capitalize text-[#384355]'>{t(title)}</h6>
            <div className="flex items-center gap-3 relative left-1">
                <BsCircleFill size={8} className='text-blue-900' />
                <h6 className='text-sm text-[#384355] capitalize'>{splitedPathname}</h6>
            </div>
            <img src={require('../../assets/png/Eye-Opening.png')} alt="Eye-Opening"
                className='object-contain w-48 h-48 absolute -top-2 right-8' />
        </aside>
    );
};

export default Banner;
