import jwtDecode from "jwt-decode";
import CompanyAdminRoutes from "./routes/CompanyAdminRoutes";
import ManufacturerAdminRoutes from "./routes/ManufacturerAdminRoutes";
import SuperAdminRoutes from "./routes/SuperAdminRouter";
import UnkownRoute from "./routes/UnknownRoutes";
import { getAuthToken } from "../utils/authActions";
import { roleTypes } from "../types";

const token = getAuthToken();

const decodeData: { role: roleTypes } | undefined = token ? jwtDecode(token!) : undefined

const roleMappings: Record<string, any> = {
    "Super Admin": SuperAdminRoutes,
    "Company Admin": CompanyAdminRoutes,
    "Manufacturer Admin": ManufacturerAdminRoutes,
};

const ShowRoleBasedRouters = decodeData?.role
    ? roleMappings[decodeData.role] || UnkownRoute
    : UnkownRoute;

export default ShowRoleBasedRouters;