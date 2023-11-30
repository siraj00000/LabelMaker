import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type MissingLabelErrorType = {
    errorMessage: string
}

const MissingLabelError: React.FC<MissingLabelErrorType> = ({ errorMessage }) => {
    return (
        <aside className='w-full grid md:grid-cols-2 grid-cols-1 space-y-3'>
            <article className='md:p-20 sm:p-10 p-5 h-full flex flex-col justify-between items-start md:order-1 order-2'>
                <p className='md:text-8xl sm:text-5xl text-3xl text-black drop-shadow-md'>{errorMessage}</p>
                <Link
                    href="/"
                    className="mt-10 p-2 px-5 rounded-xl font-nunito700 text-secondary shadow-shadowGray border bg-black text-white hover:scale-110 drop-shadow-xl border-transparent"
                >Back Home</Link>
            </article>
            <figure className='w-4/5 mx-auto md:order-2 order-1'>
                <Image
                    src={require("@/app/assets/jgp/3371471.jpg")}
                    style={{ width: '100%', height: 'auto' }}
                    alt='Missing Label'
                    priority
                />
            </figure>
        </aside>
    )
}

export default MissingLabelError
