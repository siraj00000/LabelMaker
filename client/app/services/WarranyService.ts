import { handleFetchAction, handleInsertAction, handleUpdateAction } from "./common/API"

const WarrantyService = {
    registerProduct: async (body: any) => {
        return await handleInsertAction({ url: '/warranty/register-warranty', data: body, type: "multipart/form-data" })
    },
    editRegisteredProduct: async (id: string, body: any) => {
        return await handleUpdateAction({ url: `/warranty/update-warranty/${id}`, data: body, type: "multipart/form-data" })
    },
    getWarrantyById: async (id: string) => {
        return handleFetchAction({ url: `/warranty/${id}` })
    }
}

export default WarrantyService