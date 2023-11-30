type Props = {
    brandName: string;
    company: string;
    description: string;
}

const BrandBasicInfo = (props: Props) => {
    const { brandName, company, description } = props
    return (
        <article className='col-span-1'>
            <h1 className='text-5xl font-bold pb-2'>{brandName}</h1>
            <span className='flex w-fit rounded-full bg-gray-300 uppercase px-2 py-1 text-xs font-bold mr-3'>{company}</span>
            <p className='text-sm my-3'>{description}</p>

            <div className="h-8" />
        </article>
    )
}

export default BrandBasicInfo