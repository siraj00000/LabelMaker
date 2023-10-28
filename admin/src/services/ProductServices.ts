import { QueryParams } from "../types"
import { handleDeleteAction, handleFetchAction, handleInsertAction, handleUpdateAction } from "./common/API"

const ProductServices = {
    fetchAllData: async (props: QueryParams) => {
        const { lang, name, limit, page, sortOrder } = props;
        return handleFetchAction({ url: `/product/getAll?${lang}=${name}&limit=${limit}&page=${page}&sortOrder=${sortOrder}` });
    },
    fetchOneProduct: (id: string) =>
        handleFetchAction({ url: `/product/getById/${id}` }),

    createProduct: (body: any) =>
        handleInsertAction({ url: `/product/create`, data: body, type: "multipart/form-data" }),

    updateProduct: (id: string, body: any) =>
        handleUpdateAction({ url: `/product/updateOne/${id}`, data: body, type: "multipart/form-data" }),

    updateManyProducts: (id: string, body: any) =>
        handleUpdateAction({ url: `/product/updateManyByIds`, data: body }),

    toggleStatusProduct: (id: string) =>
        handleUpdateAction({ url: `/product/toggleStatus/${id}` }),

    deleteOneProduct: (id: string) =>
        handleDeleteAction({ url: `/product/deleteOne/${id}` }),

    deleteManyProduct: (ids: string[]) =>
        handleDeleteAction({ url: `/product/deleteMany`, data: { productIds: ids } }),

}

export default ProductServices