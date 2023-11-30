import { QueryParams } from "../types"
import { handleDeleteAction, handleFetchAction, handleInsertAction, handleUpdateAction } from "./common/API"

const LabelServices = {
    fetchAllData: async (props: QueryParams) => {
        const { name, limit, page, sortOrder } = props;
        return handleFetchAction({ url: `/label/getAll?name=${name}&limit=${limit}&page=${page}&sortOrder=${sortOrder}` });
    },
    fetchOneLabel: (id: string) =>
        handleFetchAction({ url: `/label/getById/${id}` }),

    downloadLabel: (brand_id: string, product_id: string, variant: string, batch_number: string, createAt: string) =>
        handleFetchAction({ url: `/label/download-csv?brand_id=${brand_id}&product_id=${product_id}&variant=${variant}&batch_number=${batch_number}&createdAt=${createAt}` }),

    createLabel: (body: any) =>
        handleInsertAction({ url: `/label/create`, data: body }),

    updateLabel: (id: string, body: any) =>
        handleUpdateAction({ url: `/label/updateById/${id}`, data: body }),

    updateManyLabel: (id: string, body: any) =>
        handleUpdateAction({ url: `/label/updateMany`, data: body }),

    toggleStatusLabel: (id: string) =>
        handleUpdateAction({ url: `/label/toggleStatus/${id}` }),

    deleteOneLabel: (id: string) =>
        handleDeleteAction({ url: `/label/deleteOne/${id}` }),

    deleteManyLabel: (ids: string[]) =>
        handleDeleteAction({ url: `/label/deleteMany`, data: { labelIds: ids } }),
}

export default LabelServices