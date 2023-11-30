import Image from 'next/image';
import React from 'react'

type Props = {
    cardImage: any;
    title: string;
    description: string
}

const HowItWorksCard = (props: Props) => {
    return (
        <article className='h-96 text-center col-span-1 shadow-xl rounded-lg'>
            <Image
                src={props.cardImage}
                alt="Labelled owned"
                className="dark:invert w-full h-60 object-cover mx-auto rounded-t-lg"
                width={600}
                height={240}
                priority
            />
            <h1 className='text-xl font-bold py-3'>{props.title}</h1>
            <p className='px-2'>{props.description}</p>
        </article>
    )
}

export default HowItWorksCard