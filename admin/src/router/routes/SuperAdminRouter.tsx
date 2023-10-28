import { Route } from "react-router-dom"
import { Categories, categoryAction, categoryLoader, SubCategory, subCategoryLoader, subCategoryAction, Staff, staffLoader, staffAction, companyLoader, companyAction, manufacturerLoader, manufacturerAction, Companies, Manufacturers, brandsLoader, brandsAction, Brands, Accessibility, accessibilityLoader, accessibilityAction, ManufacturerPanel } from "../../pages";

const SuperAdminRoutes = (
    <>
        <Route index element={<ManufacturerPanel />} />

        {/* Ecommerce */}
        <Route path="brands" element={<Brands />} loader={brandsLoader} action={brandsAction} />
        <Route path="categories" element={<Categories />} loader={categoryLoader} action={categoryAction} />
        <Route path="sub-categories" element={<SubCategory />} loader={subCategoryLoader} action={subCategoryAction} />

        {/* Associates */}
        <Route path="staff" element={<Staff />} loader={staffLoader} action={staffAction} />

        {/* Producers */}
        <Route path="companies" element={<Companies />} loader={companyLoader} action={companyAction} />
        <Route path="manufacturers" element={<Manufacturers />} loader={manufacturerLoader} action={manufacturerAction} />

        {/* Accessibility */}
        <Route path="accessibility" element={<Accessibility />} loader={accessibilityLoader} action={accessibilityAction} />
    </>
)

export default SuperAdminRoutes