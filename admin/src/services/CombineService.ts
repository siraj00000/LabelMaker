import { handleFetchAction, handleInsertAction } from "./common/API"

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
    fetchManufacturerBrandsProducts: async (body: any) => {
        return handleInsertAction({ url: `/combine/fetch-brands-products`, data: body })
    },
    fetchVariantAndBatchNumber: async (body: any) => {
        return handleInsertAction({ url: `/combine/label-batchs-and-variants`, data: body })
    },
    fetchBatchNumber: (brand_id: string, product_id: string, variant: string,) => {
        return handleInsertAction({ url: `/combine/label-batch-numbers`, data: { brand_id, product_id, variant } })
    }
}
export default CombineServices