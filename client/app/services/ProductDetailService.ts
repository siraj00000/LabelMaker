import { handleFetchAction } from "./common/API"

const ProductDetailService = {
    fetchProductDetails: async (dsN: string, link: string) => {
        return await handleFetchAction({ url: `/product_detail/${dsN}/${link}` })
    }
}

export default ProductDetailService