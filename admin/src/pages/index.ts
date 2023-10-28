export { default as SignIn, SignInAction } from "./Authentication/SignIn";
export { default as ForgotPassword, ForgotPasswordAction } from "./Authentication/ForgotPassword";
export { default as ResetPassword, ResetPasswordAction } from "./Authentication/ResetPassword";
export { default as VerifyAccount} from "./Authentication/VerifyAccount";

export { default as Products, productsLoader, productsAction } from "./Panel/Ecommerce/Products";
export { default as Categories, categoryLoader, categoryAction } from "./Panel/Ecommerce/Categories";
export { default as Brands, brandsLoader, brandsAction } from "./Panel/Ecommerce/Brands";
export { default as SubCategory, subCategoryLoader, subCategoryAction } from "./Panel/Ecommerce/SubCategory";

export { default as Staff, staffLoader, staffAction } from "./Panel/Associates/Staff";

export { default as Companies, companyLoader, companyAction } from "./Panel/Producers/Companies";
export { default as Manufacturers, manufacturerLoader, manufacturerAction } from "./Panel/Producers/Manufacturers";
export { default as Label, labelLoader, labelAction } from "./Panel/Producers/Label";

export { default as Accessibility, accessibilityLoader, accessibilityAction } from "./Panel/Accessibility";

export { default as ManufacturerPanel } from "./Panel/Dashboard/ManufacturerPanel";
export { default as CompanyPanel } from "./Panel/Dashboard/ManufacturerPanel";
export { default as SuperAdminPanel } from "./Panel/Dashboard/ManufacturerPanel";