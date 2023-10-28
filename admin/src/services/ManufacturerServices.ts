import { QueryParams } from "../types"
import { handleDeleteAction, handleFetchAction, handleInsertAction, handleUpdateAction } from "./common/API"

const ManufacturerService = {
    create: async (body: any) => {
        return handleInsertAction({ url: "/manufacturer/create", data: body })
    },
    getAll: ({ name, limit, page, sortOrder }: QueryParams) => {
        return handleFetchAction({ url: `/manufacturer/getAll?name=${name}&limit=${limit}&page=${page}&sortOrder=${sortOrder}` })
    },
    getIdAndName: () => {
        return handleFetchAction({ url: `/manufacturer/getIdAndName` })
    },
    updateOne: (id: string, body: any) => {
        return handleUpdateAction({ url: `/manufacturer/updateOne/${id}`, data: body })
    },
    toggleStatus: (id: string) => {
        return handleUpdateAction({ url: `/manufacturer/toggleStatus/${id}` })
    },
    deleteOne: (id: string) => {
        return handleDeleteAction({ url: `/manufacturer/deleteOne/${id}` })
    },
    deleteMultiple: (ids: string[]) => {
        return handleDeleteAction({ url: `/manufacturer/deleteMultiple`, data: { companyIds: ids } })
    }
}

export default ManufacturerService