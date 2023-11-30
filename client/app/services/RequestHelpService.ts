import { handleInsertAction } from "./common/API"

const RequestHelpService = {
    registerHelpRequest: async (body: any) => {
        return await handleInsertAction({ url: '/request_help/createRequest', data: body })
    }
}

export default RequestHelpService