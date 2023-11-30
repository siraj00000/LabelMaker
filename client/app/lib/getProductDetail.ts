import ProductDetailService from "../services/ProductDetailService";
import { ProductDetailsResponseTypes } from "../types/response.types";

type Props = {
    dsN: string;
    link: string;
}

type ResponseType = {
    data: ProductDetailsResponseTypes
}

export const getProductDetails = async ({ dsN, link }: Props) => {
    try {        
        const response = await ProductDetailService.fetchProductDetails(dsN, link) as ResponseType
        return { response: response.data.data, isError: false }
    } catch (err) {
        let error = err as { response: { data: { error: string } } }
        return { error, isError: true }
    }
}