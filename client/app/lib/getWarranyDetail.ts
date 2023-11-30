import WarrantyService from "../services/WarranyService";
import { WarrantyFetchResponseType } from "../types/response.types";

type Props = {
    id: string;
}

type ResponseType = {
    data: WarrantyFetchResponseType
}

export const getWarrantyDetail = async ({ id }: Props) => {
    try {
        const { data } = await WarrantyService.getWarrantyById(id) as ResponseType
        return { response: data.data, isError: false }
    } catch (err) {
        let error = err as { response: { data: { error: string } } }
        return { error, isError: true }
    }
}