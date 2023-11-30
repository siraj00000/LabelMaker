import { NavLink } from "react-router-dom";
import BoxHeader from "../../../Others/BoxHeader";

type KeyValProps = {
    label: string;
    value: string
}

const KeyValComponent: React.FC<KeyValProps> = ({ label, value }) => (
    <div className="">
        <h1 className="text-md font-medium text-primaryDarkGray">{value}</h1>
        <h1 className="text-xs font-medium text-gray-400">{label}</h1>
    </div>
)

type NavigateButtonProps = {
    label: string,
    navTo: string,
}

const NavigateButton: React.FC<NavigateButtonProps> = ({ label, navTo }) => (
    <div className="space-y-2">
        <NavLink to={navTo} target="_blank" className="bg-primaryDarkGray py-1 px-4 text-xs text-white rounded-md">
            Visit
        </NavLink>
        <h1 className="text-xs font-medium text-gray-400">{label}</h1>
    </div>
)

const Details = ({
    name,
    brand,
    sub_category,
    company,
    product_description,
    feature,
    variant_type,
    variants,
    video_url,
    images,
    free_brand_maintenance_duration,
    general_warranty_duration,
    special_warranty_duration,
    special_warranty_type,
    one_click_reorder_feature,
    reorder_link,
    survey_feature,
    survey_link
}: any) => {
    const productImage = images[0] || require("../../../../assets/png/placeholder-image.png")
    return (
        <aside className="p-10 space-y-3">
            <section className="grid md:grid-cols-2 grid-cols-1">
                <figure className="col-span-1">
                    <img src={productImage} className="w-2/3 h-2/3 object-fill mx-auto" alt="product" />
                    <figure className="flex items-center gap-2">
                        {images.map((image: string, imageIndex: number) => (
                            <img src={image} key={imageIndex} className="max-w-[80px] max-h-[80px] hover:bg-gray-50 hover:scale-110" alt="" />
                        ))}
                    </figure>
                </figure>
                <article className='col-span-1'>
                    <h1 className='text-5xl font-bold pb-2'>{name}</h1>
                    <span className='flex w-fit rounded-full bg-gray-300 uppercase px-2 py-1 text-xs font-bold mr-3'>{brand}</span>
                    <p className='text-sm my-3'>{product_description}</p>

                    <h6 className="text-sm font-medium text-black w-fit pt-5 pb-2">{variant_type}</h6>
                    <ul className='text-xs flex items-center gap-2 flex-wrap'>
                        {variants?.length !== 0 && variants.map((vrtItem: string, vrtIndex: number) => <li
                            key={vrtItem + vrtIndex}
                            className='bg-gray-300 hover:bg-black hover:text-white p-1 px-3 rounded-full w-fit cursor-pointer'
                        >{vrtItem}</li>)}
                    </ul>

                    <h6 className="text-sm font-medium text-black w-fit pt-5 pb-2">Features.</h6>
                    <ul className='text-xs flex items-center gap-2 flex-wrap'>
                        {Object.values(feature).map((featureItem: any, featureIndex) => <li
                            key={featureItem + featureIndex}
                            className='bg-gray-300 hover:bg-black hover:text-white p-1 px-3 rounded-full w-fit cursor-pointer'
                        >{featureItem}</li>)}
                    </ul>

                    <div className="h-8" />
                </article>
            </section>
            <section>
                {video_url && Object.keys(video_url).length !== 0 &&
                    <iframe
                        src={video_url.url}
                        title="Brand Video"
                        width="100%"
                        height="400" // You can adjust the height as needed
                        className='py-5 w-full'
                    ></iframe>
                }
            </section>
            <section className="flex items-center gap-5">
                <KeyValComponent label="Sub Category" value={sub_category} />
                <KeyValComponent label="Company" value={company} />
                <KeyValComponent label="Free Maintenance" value={free_brand_maintenance_duration || '--'} />
                <KeyValComponent label="General Warranty" value={general_warranty_duration || '--'} />
                {special_warranty_type && <KeyValComponent label="Special Warranty" value={special_warranty_duration || '--'} />}
            </section>
            <section>
                {one_click_reorder_feature && <NavigateButton label="Reorder" navTo={reorder_link} />}
                {survey_feature && <NavigateButton label="Survey" navTo={survey_link} />}
            </section>
        </aside>
    )
}

const ProductDetail = ({ item }: any) => {
    console.log(item);

    return (
        <div className="rounded-xl">
            <BoxHeader title="Product detail" />

            <Details {...item} />
        </div>
    )
}

export default ProductDetail
