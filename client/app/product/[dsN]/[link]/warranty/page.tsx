import React from 'react'
import WarrantyRegFrom from './_components/WarratyRegForm'

type ParamsType = {
    params: {
        dsN: string;
        link: string;
    }
}

const page = ({ params }: ParamsType) => {
    return (
        <div>
            <WarrantyRegFrom {...params} />
        </div>
    )
}

export default page
