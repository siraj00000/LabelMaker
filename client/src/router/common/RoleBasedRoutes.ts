import Cookies from "js-cookie";
import CompanyAdminRouters from "../routes/CompanyAdminRouters";
import ManufacturerAdminRouters from "../routes/ManufacturerAdminRouters";
import SuperAdminRouters from "../routes/SuperAdminRouters";
import UnkownRoute from "../routes/UnkownRoute";

const role = Cookies.get("lsmaker");

const roleMappings: Record<string, any> = {
  "1": SuperAdminRouters,
  "2": CompanyAdminRouters,
  "3": ManufacturerAdminRouters,
};

const ShowRoleBasedRouters = role
  ? roleMappings[role] || UnkownRoute
  : UnkownRoute;

export { ShowRoleBasedRouters, role };
