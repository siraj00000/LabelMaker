type Props = {
    videoURL: string
}

const BrandVideo = ({ videoURL }: Props) => {
    return (
        <iframe
            src={videoURL}
            title="Brand Video"
            width="100%"
            height="400" // You can adjust the height as needed
            className='py-5 w-full'
        ></iframe>
    )
}

export default BrandVideo