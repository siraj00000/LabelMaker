import BoxHeader from "../../../Others/BoxHeader";
import ExternalLinkButton from "../../../Others/ExternalLinkButton";
import PropertyDisplay from "../../../Others/PropertyDisplay";
import BrandBasicInfo from "./_components/BrandBasicInfo";
import BrandPictures from "./_components/BrandPictures";
import BrandSocialConnects from "./_components/BrandSocialConnects";
import BrandVideo from "./_components/BrandVideo";


const Details = ({
    name,
    company,
    product_description,
    videoSource,
    videoURL,
    images,
    authentication_feature,
    warranty,
    request_help,
    promo_code,
    referrals,
    re_order_link,
    survey_feature,
    survey_link,
    call_no,
    call_support,
    email_id,
    email_support,
    fb_link,
    facebook,
    insta_link,
    instagram,
    whatsapp_number,
    whatsapp_support
}: any) => {
    let videoURLObj = videoSource && Object.keys(videoSource).length !== 0 
    let _videoURL = videoURLObj ? videoSource.url : videoURL    
   
    return (
        <aside className="p-10 space-y-3">
            <section className="grid md:grid-cols-2 grid-cols-1">
                <BrandPictures images={images} />
                <BrandBasicInfo brandName={name} company={company} description={product_description} />
            </section>

            <section>
                {(videoURLObj || videoURL) &&
                    <BrandVideo videoURL={_videoURL} />
                }
            </section>

            <section className="flex items-center gap-5">
                <PropertyDisplay label="Auth Feature" value={authentication_feature || '--'} />
                <PropertyDisplay label="Warranty" value={warranty ? 'Active' : 'Inactive'} />
                <PropertyDisplay label="Request Help" value={request_help ? 'Active' : 'Inactive'} />
                <PropertyDisplay label="Referrals" value={referrals ? 'Active' : 'Inactive'} />
                <PropertyDisplay label="Promo code" value={promo_code ? 'Active' : 'Inactive'} />
            </section>

            <section className='md:p-28 px-3 py-8 text-center'>
                <BrandSocialConnects
                    call_no={call_no}
                    call_support={call_support}
                    email_id={email_id}
                    email_support={email_support}
                    fb_link={fb_link}
                    facebook={facebook}
                    insta_link={insta_link}
                    instagram={instagram}
                    whatsapp_number={whatsapp_number}
                    whatsapp_support={whatsapp_support}
                />

            </section>

            <section>
                {re_order_link !== '' && <ExternalLinkButton label="Reorder" navTo={re_order_link} />}
                {survey_feature && <ExternalLinkButton label="Survey" navTo={survey_link} />}
            </section>
        </aside>
    )
}

const BrandDetails = ({ item }: any) => {
    return (
        <div className="rounded-xl">
            <BoxHeader title="Brand details" />

            <Details {...item} />
        </div>
    )
}

export default BrandDetails