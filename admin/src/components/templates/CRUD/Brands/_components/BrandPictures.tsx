import React, { useState } from 'react'

type Props = {
    images: Array<string>
}

const BrandPictures: React.FC<Props> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const changeImage = (index: number) => {
        if (currentIndex === index) return
        setCurrentIndex(index);
    }
    const productImage = images[currentIndex] || require("../../../../../assets/png/placeholder-image.png");
    return (
        <figure className="col-span-1">
            <img src={productImage} className="w-2/3 h-2/3 object-fill mx-auto" alt="product" />
            <figure className="flex items-center gap-2">
                {images.map((image: string, imageIndex: number) => (
                    <img
                        key={imageIndex}
                        src={image}
                        className="max-w-[80px] max-h-[80px] hover:bg-gray-50 hover:scale-110 cursor-pointer"
                        onClick={() => changeImage(imageIndex)}
                        alt=""
                    />
                ))}
            </figure>
        </figure>
    )
}

export default BrandPictures
