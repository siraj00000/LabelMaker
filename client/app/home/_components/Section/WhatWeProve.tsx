import Image from 'next/image'
import React from 'react'

const WhatWeProve = () => {
    return (
        <section className='grid md:grid-cols-2 grid-cols-1'>
            <figure>
                <Image src={require("@/app/assets/jgp/what-we-prove.jpg")} alt='what-we-prove'  />
            </figure>
            <article>
                <h3>What Label Maker Prove?</h3>
                
            </article>
        </section>
    )
}

export default WhatWeProve
