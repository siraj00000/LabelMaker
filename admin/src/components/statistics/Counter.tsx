import React from 'react'

type CounterType = {
    title: string;
    count: number;
    Icon: React.ElementType;
    bgColor: string;
    color: string;
}

const Counter: React.FC<CounterType> = ({ title, Icon, count, bgColor, color }) => {
    return (
        <article style={{ background: bgColor }} className='flex justify-between bg-[#bbf7d0] rounded-xl pl-5 pr-10 py-5'>
            <span>
                <h3 style={{ color }} className='text-2xl font-medium'>{count}</h3>
                <h6 style={{ color }} className='text-[#2dd4bf] text-lg font-semibold'>{title}</h6>
            </span>
            <span>
                <Icon size={50} color={bgColor} className="rounded-full p-2" style={{ background: color }} />
            </span>
        </article>
    )
}

export default Counter
