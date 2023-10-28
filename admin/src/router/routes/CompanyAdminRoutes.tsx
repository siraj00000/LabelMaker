import { Route } from "react-router-dom"
import { ManufacturerPanel, Products, productsAction, productsLoader } from "../../pages"

const CompanyAdminRoutes = (
    <>
        <Route index element={<ManufacturerPanel />} />

        <Route path="products" element={<Products />} loader={productsLoader} action={productsAction} />
    </>
)
export default CompanyAdminRoutes