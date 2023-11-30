import React from 'react'
import HowItWorksCard from '../Card/HowItWorksCard'

type CARD_LIST_TYPE = {
    cardImage: any;
    title: string;
    description: string;
    isOpen?: boolean;
}

// Array of Card Object
const CARD_LIST: CARD_LIST_TYPE[] = [
    {
        title: "Step 1",
        description: "Scan QR code on the packaging box. \n you get to know the tentatives fakes",
        cardImage: require("@/app/assets/jgp/qrcode.jpg")
    },
    {
        title: "Step 2",
        description: "Purchase the product and open the packaging",
        cardImage: require("@/app/assets/jgp/purchase.jpg")
    },
    {
        title: "Step 3",
        description: "Scan the QR code inside the packaging box \n and find out real fake status",
        cardImage: require("@/app/assets/jgp/scan-qrcode.jpg")
    },
]

const HowItWork = () => {
    return (
        <aside className="w-full md:py-10">
            <h1 className='text-5xl text-black font-bold text-center'>How it works?</h1>

            <section className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 md:p-10 p-5'>
                {CARD_LIST.map((cardItem, cardIndex) => (
                    <HowItWorksCard
                        key={cardIndex}
                        title={cardItem.title}
                        description={cardItem.description}
                        cardImage={cardItem.cardImage}
                    />
                ))}
            </section>
        </aside>
    )
}

export default HowItWork
