import { Route } from "react-router-dom";
import { Categories, Products, categoryAction, categoryLoader, productsLoader, productsAction, SubCategory, subCategoryLoader, subCategoryAction, Staff, staffLoader, staffAction, companyLoader, companyAction, manufacturerLoader, manufacturerAction, Companies, Manufacturers, brandsLoader, brandsAction, Brands, Label, labelLoader, labelAction, Accessibility, accessibilityLoader, accessibilityAction, ManufacturerPanel } from "../../pages";

const DashboardRoutes = (
  <>
    <Route index element={<ManufacturerPanel />} />

    {/* Ecommerce */}
    <Route path="products" element={<Products />} loader={productsLoader} action={productsAction} />
    <Route path="brands" element={<Brands />} loader={brandsLoader} action={brandsAction} />
    <Route path="categories" element={<Categories />} loader={categoryLoader} action={categoryAction} />
    <Route path="sub-categories" element={<SubCategory />} loader={subCategoryLoader} action={subCategoryAction} />

    {/* Associates */}
    <Route path="staff" element={<Staff />} loader={staffLoader} action={staffAction} />

    {/* Producers */}
    <Route path="companies" element={<Companies />} loader={companyLoader} action={companyAction} />
    <Route path="manufacturers" element={<Manufacturers />} loader={manufacturerLoader} action={manufacturerAction} />
    <Route path="label" element={<Label />} loader={labelLoader} action={labelAction} />

    {/* Accessibility */}
    <Route path="accessibility" element={<Accessibility />} loader={accessibilityLoader} action={accessibilityAction} />

  </>
);

export default DashboardRoutes;
