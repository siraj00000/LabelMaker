import { handleFetchAction } from "./common/API"

const CombineServices = {
    fetchCompanyBrands: async () => {
        return handleFetchAction({ url: '/combine/fetch-company-brands' })
    },
    fetchCompanySubcategories: async () => {
        return handleFetchAction({ url: '/combine/fetch-company-subcategories' })
    },
    fetchManufacturerBrands: async () => {
        return handleFetchAction({ url: '/combine/fetch-manufacturers-company-brands' })
    },
    fetchManufacturerBrandProducts: async (brand_id: string) => {
        return handleFetchAction({ url: `/combine/fetch-brand-products/${brand_id}` })
    },

}
export default CombineServices