import React from 'react'
import WarrantyEditForm from '../_components/WarranyEditForm'
import { getWarrantyDetail } from '@/app/lib/getWarranyDetail'

type ParamsType = {
    params: {
        id: string
    }
}

const page = async ({ params }: ParamsType) => {
    const { response, isError, error } = await getWarrantyDetail({ id: params.id });
    if (isError && error?.response.data.error) {
        return <h1>Error</h1>
    }    
    return (
        <div>
            <WarrantyEditForm {...params} />
        </div>
    )
}

export default page
