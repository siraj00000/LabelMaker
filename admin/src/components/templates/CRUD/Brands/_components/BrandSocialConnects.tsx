import React, { memo } from 'react'
import { AiOutlineInstagram } from 'react-icons/ai';
import { BiLogoFacebook, BiLogoWhatsapp, BiPhone } from 'react-icons/bi';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

type ValidationListTypes = {
    isEnable: 'call_support' | 'email_support' | 'facebook' | 'instagram' | 'whatsapp_support';
    via: 'call_no' | 'email_id' | 'fb_link' | 'insta_link' | 'whatsapp_number';
    Icon: React.ElementType;
    ref: string;
}

const validationList = [
    {
        isEnable: 'call_support',
        via: 'call_no',
        Icon: BiPhone,
        ref: 'tel:'
    },
    {
        isEnable: 'email_support',
        via: 'email_id',
        Icon: MdOutlineAlternateEmail,
        ref: 'mailto:'
    },
    {
        isEnable: 'facebook',
        via: 'fb_link',
        Icon: BiLogoFacebook,
        ref: ''
    },
    {
        isEnable: 'instagram',
        via: 'insta_link',
        Icon: AiOutlineInstagram,
        ref: ''
    },
    {
        isEnable: 'whatsapp_support',
        via: 'whatsapp_number',
        Icon: BiLogoWhatsapp,
        ref: 'https://wa.me/'
    },
] as ValidationListTypes[]

type ListTypes = {
    via: string;
    Icon: React.ElementType;
    ref?: string;
}

type Props = {
    call_no: string | null;
    call_support: boolean;
    email_id: string | null;
    email_support: boolean;
    fb_link: string | null;
    facebook: boolean;
    insta_link: string | null;
    instagram: boolean;
    whatsapp_number: string | null;
    whatsapp_support: boolean;
}

const BrandSocialConnects = (props: Props) => {    
    const getConnectionList = () => {
        const list = [] as ListTypes[];

        validationList.forEach(ele => {            
            if (props[ele.isEnable]) {
                list.push({
                    Icon: ele.Icon,
                    via: ele.ref + props[ele.via]!,
                })
            }
        });
        
        return list
    }
    const connectsList = getConnectionList();
    return (
        <>
            <h1 className='md:text-6xl text-4xl text-black font-bold'>Contacts</h1>
            <p className='text-neutral-500 mt-2'>Contacts for any inquiries or assistance</p>

            <div className='flex items-center flex-wrap justify-center max-md:gap-3 md:p-10 py-10'>
                {connectsList.map(({ Icon, via }, index) => (
                    <article key={index} className="md:w-1/5">
                        <NavLink to={via} target='_blank' className='flex flex-col items-center'>
                            <Icon size={50} className="bg-gray-100 hover:bg-black hover:text-white rounded-full md:w-1/3 w-2/3 md:h-1/3 h-2/3 p-2" />
                        </NavLink>
                    </article>
                ))}
            </div>
        </>
    )
}

export default memo(BrandSocialConnects)