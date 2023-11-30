import { getProductDetails } from '@/app/lib/getProductDetail';
import React from 'react'
import MissingLabelError from './MissingLabelError';
import AcknowledgementBanner from './AckBanner.section';
import ProductDetail from './Detail.section';
import ReportError from './ReportError';
import ProductCarousel from './ProductCarousel';
import SocialConnect from './SocialConnect';

type Props = {
    params: {
        dsN: string;
        link: string;
    }
}

const Common = async ({ params }: Props) => {
    const { response, isError, error } = await getProductDetails(params);
console.log(response);

    if (isError && error?.response.data.error) {
        return <MissingLabelError errorMessage={error?.response.data.error} />
    }
    
    return (
        <>
            {response &&
                <>
                    <AcknowledgementBanner message={response.isOwnerMobileNumberFound} />

                    <ProductDetail {...response.productDetails} />

                    {response.ownerMobile && <ReportError {...response.labelDetails} />}

                    <ProductCarousel {...response.carouselDetails} />

                    <SocialConnect {...response.contactDetails} />

                </>
            }
        </>
    )
}

export default Common
