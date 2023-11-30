import { Route } from "react-router-dom"
import { CompanyPanel, Products, productsAction, productsLoader } from "../../pages"

const CompanyAdminRoutes = (
    <>
        <Route index element={<CompanyPanel />} />

        <Route path="products" element={<Products />} loader={productsLoader} action={productsAction} />
    </>
)
export default CompanyAdminRoutes