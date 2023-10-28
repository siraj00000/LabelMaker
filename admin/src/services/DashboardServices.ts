import { handleInsertAction } from "./common/API"

const DashboardServices = {
    manufacturerStats: async (body: any) => {
        return await handleInsertAction({ url: `/combine/manufacturer-label-stats`, data: body })
    }
}
export default DashboardServices