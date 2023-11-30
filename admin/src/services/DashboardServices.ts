import { handleFetchAction, handleInsertAction } from "./common/API"

const DashboardServices = {
    superAdminStats: async (date: string) => {
        return await handleFetchAction({ url: `/combine/super-admin-label-stats?date=${date}` })
    },
    companyStats: async (date: string) => {
        return await handleFetchAction({ url: `/combine/company-label-stats?date=${date}` })
    },
    manufacturerStats: async (body: any) => {
        return await handleInsertAction({ url: `/combine/manufacturer-label-stats`, data: body })
    }
}
export default DashboardServices