import { QueryParams } from "../types"
import { handleDeleteAction, handleFetchAction, handleInsertAction, handleUpdateAction } from "./common/API"

const CompanyService = {
    create: async (body: any) => {
        return handleInsertAction({ url: "/company/create", data: body })
    },
    getAllCompanies: ({ name, limit, page, sortOrder }: QueryParams) => {
        return handleFetchAction({ url: `/company/getAll?name=${name}&limit=${limit}&page=${page}&sortOrder=${sortOrder}` })
    },
    getIdAndName: () => {
        return handleFetchAction({ url: `/company/getNameAndId` })
    },
    updateOne: (id: string, body: any) => {
        return handleUpdateAction({ url: `/company/updateOne/${id}`, data: body })
    },
    toggleStatus: (id: string) => {
        return handleUpdateAction({ url: `/company/toggleStatus/${id}` })
    },
    deleteOne: (id: string) => {
        return handleDeleteAction({ url: `/company/deleteOne/${id}` })
    },
    deleteMultiple: (ids: string[]) => {
        return handleDeleteAction({ url: `/company/deleteMultiple`, data: { companyIds: ids } })
    }
}

export default CompanyService