import React, { Suspense } from 'react'
import TitleSection from './_components/Title.section'
import SkeletonLoader from './_components/SkeletonLoader'
import Common from './_components/Common'

type ProductDetailPageParamsType = {
    params: {
        dsN: string;
        link: string;
    }
}

const ProductDetailPage = async ({ params }: ProductDetailPageParamsType) => {
    return (
        <main className='min-h-screen'>
            <TitleSection />

            <Suspense fallback={<SkeletonLoader />}>
                <Common params={params} />
            </Suspense>
        </main>
    )
}

export default ProductDetailPage