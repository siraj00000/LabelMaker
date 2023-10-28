import { QueryParams } from "../types";
import { handleDeleteAction, handleFetchAction, handleInsertAction, handleUpdateAction } from "./common/API"

const BrandServices = {
    createBrands: async (body: any) => {
        return handleInsertAction({ url: '/brand/create', data: body, type: "multipart/form-data" })
    },
    fetchAllBrands: async (props: QueryParams) => {
        const { name, limit, page, sortOrder } = props;
        return handleFetchAction({ url: `/brand/getAll?name=${name}&limit=${limit}&page=${page}&sortOrder=${sortOrder}` });
    },
    updateBrands: async (id: string, body: any) => {
        return handleUpdateAction({ url: `/brand/updateOne/${id}`, data: body, type: "multipart/form-data" })
    },
    updateStatus: (id: string) => {
        return handleUpdateAction({ url: `/brand/toggleStatus/${id}` })
    },
    destroyImages: async (id: string, publicIds: string[]) => {
        return handleDeleteAction({ url: `/brand/destroyImages/${id}`, data: { publicIds } })
    },
    deleteOneBrand: (id: string) => {
        return handleDeleteAction({ url: `/brand/deleteOne/${id}` });
    },
    deleteManyBrands: (ids: string[]) => {
        return handleDeleteAction({ url: `/brand/deleteMany`, data: { ids: ids } })
    }
}

export default BrandServices