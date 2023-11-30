import React from 'react'
import { ContactDetails } from '@/app/types/response.types'
import Link from 'next/link'
import { AiOutlineInstagram } from 'react-icons/ai';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { BiLogoFacebook, BiLogoWhatsapp, BiPhone } from 'react-icons/bi';

type SocialConnectsType = {
    connectionName: 'email' | 'facebook' | 'instagram' | 'phone' | 'whatsapp';
    Icon: React.ElementType;
    via: string
}

const SOCIAL_CONNECTS = [
    {
        connectionName: "whatsapp",
        Icon: BiLogoWhatsapp,
        via: ""
    },
    {
        connectionName: "phone",
        Icon: BiPhone,
        via: ""
    },
    {
        connectionName: "email",
        Icon: MdOutlineAlternateEmail,
        via: ""
    },
    {
        connectionName: "instagram",
        Icon: AiOutlineInstagram,
        via: ""
    },
    {
        connectionName: "facebook",
        Icon: BiLogoFacebook,
        via: ""
    },
] as SocialConnectsType[]

const SocialConnect: React.FC<ContactDetails> = (contactDetails) => {

    const getConnectionInfo = () => {
        let result: SocialConnectsType[] = [];

        SOCIAL_CONNECTS.map(connect => {
            let connectionName = connect.connectionName;
            let detail = contactDetails[connectionName];
            
            if (detail?.isSupport) {
                if(detail.via){
                    connect.via = detail.via;
                    return result.push(connect)
                }
            }

        })

        return result
    }

    const connectsList = getConnectionInfo();
    return (
        <section className='md:p-28 px-3 py-8 text-center'>
            <h1 className='md:text-6xl text-4xl text-black font-bold'>Contact Us</h1>
            <p className='text-neutral-500 mt-2'>Contact us for any inquiries or assistance</p>


            <div className='flex items-center flex-wrap justify-center max-md:gap-3 md:p-10 py-10'>
                {connectsList.map(({ Icon, ...rest }, index) => (
                    <article key={index} className="md:w-1/5">
                        <Link href={rest.via} target='_blank' className='flex flex-col items-center'>
                            <Icon size={50} className="bg-gray-100 hover:bg-black hover:text-white rounded-full md:w-1/3 w-2/3 md:h-1/3 h-2/3 p-2" />
                            <span className='uppercase text-xs font-medium mt-3'>{rest.connectionName}</span>
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default SocialConnect
