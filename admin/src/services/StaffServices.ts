import { QueryParams } from "../types"
import { handleDeleteAction, handleFetchAction, handleInsertAction, handleUpdateAction } from "./common/API"

const StaffServices = {
    createStaff: async (body: any) => {
        return handleInsertAction({ url: '/account/create-staff', data: body, type: "multipart/form-data" })
    },
    getAllStaffList: ({ name, limit, page, sortOrder }: QueryParams) =>
        handleFetchAction({ url: `/account/getAllAccounts?name=${name}&limit=${limit}&page=${page}&sortOrder=${sortOrder}` }),

    updateStaff: async (id: string, body: any) => {
        return handleUpdateAction({ url: `/account/update-user/${id}`, data: body, type: "multipart/form-data" })
    },
    unblockStaffMember: async (id: string) => {
        return handleUpdateAction({ url: `/account/update-user/${id}` })
    },
    deleteOneCategory: (id: string) =>
        handleDeleteAction({ url: `/account/deleteOne/${id}` }),

    deleteAllCategory: (ids: string[]) =>
        handleDeleteAction({ url: `/account/deleteMany`, data: { ids } }),
}

export default StaffServices