import { ProductDetailTypes } from "@/app/types/response.types"
import Image from "next/image"
import Link from "next/link";
import { useMemo } from "react"

type generateButtonTextArgs = {
    helpRequest: boolean;
    isAlreadyReg: string | null;
    warranty: boolean;
}
const generateButtonText = ({ helpRequest, isAlreadyReg, warranty }: generateButtonTextArgs): { buttonText: string, navigateTo: string } => {
    let buttonText = "", navigateTo = "";
    let isTrue = helpRequest && warranty
    console.log('toppppp',isAlreadyReg);
    
    if (!isTrue) return { buttonText: "", navigateTo: "" };

    if (!isAlreadyReg) {
        buttonText = "Register my product";
        navigateTo = "warranty"
    } else if (helpRequest && typeof isAlreadyReg === 'string') {
        buttonText = "Request help on label"
        navigateTo = `request`
    } else if (!helpRequest && typeof isAlreadyReg === 'string') {
        navigateTo = `warranty/${isAlreadyReg}`
        buttonText = "View warranty details"
    }

    return { buttonText, navigateTo }
}

const ProductDetail: React.FC<ProductDetailTypes> = ({ dsN, link, name, brandName, image, description, feature, helpRequest, isAlreadyReg, warranty, company_id }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const { buttonText, navigateTo } = useMemo(() => generateButtonText({ helpRequest, isAlreadyReg, warranty }), [])
        console.log('help', isAlreadyReg, Boolean(isAlreadyReg));
        
    return (
        <section className='grid md:grid-cols-2 grid-cols-1 gap-10 w-4/5 mx-auto md:px-10 pt-20 mb-20'>
            <figure className='col-span-1'>
                <Image
                    src={image}
                    alt="Product"
                    className="dark:invert w-auto h-auto mx-auto shadow-black object-contain hover:scale-110"
                    style={{ width: "100%", height: "100%", maxHeight: '300px' }}
                    width={100}
                    height={100}
                    priority
                />
            </figure>
            <article className='col-span-1'>
                <h1 className='text-5xl font-bold pb-2'>{name}</h1>
                <span className='flex w-fit rounded-full bg-gray-300 uppercase px-2 py-1 text-xs font-bold mr-3'>{brandName}</span>
                <p className='text-sm my-3'>{description}</p>

                <h6 className="text-sm font-medium text-black w-fit pt-5 pb-2">Features.</h6>
                <ul className='text-xs flex items-center gap-2 flex-wrap'>
                    {Object.values(feature).map((featureItem, featureIndex) => <li
                        key={featureItem + featureIndex}
                        className='bg-gray-300 hover:bg-black hover:text-white p-1 px-3 rounded-full w-fit cursor-pointer'
                    >{featureItem}</li>)}
                </ul>

                <div className="h-8" />

                {buttonText !== "" &&
                    <Link
                        className="p-2 px-5 rounded-xl font-nunito700 text-secondary shadow-shadowGray border bg-black text-white hover:scale-110 drop-shadow-xl border-transparent capitalize"
                        href={`/product/${dsN}/${link}/${navigateTo}`}
                    > {buttonText}</Link>
                }
            </article>
        </section >
    )
}

export default ProductDetail