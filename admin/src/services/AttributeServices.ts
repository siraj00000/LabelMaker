import { QueryParams } from "../types"
import { handleDeleteAction, handleFetchAction, handleInsertAction, handleUpdateAction } from "./common/API"

const AttributeServices = {
    fetchAllData: async (props: QueryParams) => {
        const { lang, name, limit, page, sortOrder } = props;
        return handleFetchAction({ url: `/attribute/getAll?${lang}=${name}&limit=${limit}&page=${page}&sortOrder=${sortOrder}` });
    },
    createAttribute: (body: any) =>
        handleInsertAction({ url: `/attribute/create`, data: body }),

    updateAttribute: (id: string, body: any) =>
        handleUpdateAction({ url: `/attribute/updateOne/${id}`, data: body }),

    toggleStatusAttribute: (id: string) =>
        handleUpdateAction({ url: `/attribute/toggleStatus/${id}` }),

    deleteOneAttribute: (id: string) =>
        handleDeleteAction({ url: `/attribute/deleteOne/${id}` }),

    deleteManyAttribute: (ids: string[]) =>
        handleDeleteAction({ url: `/attribute/deleteMany`, data: { attributeIds: ids } }),

}

export default AttributeServices