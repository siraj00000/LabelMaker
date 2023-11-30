import { handleInsertAction } from "./common/API"

const ReportService = {
    registerReport: async (body: any) => {
        return await handleInsertAction({ url: '/report/report-error', data: body })
    }
}

export default ReportService