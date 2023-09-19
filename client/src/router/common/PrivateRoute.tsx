import { Navigate } from "react-router-dom";
import { PrivateRouteProps } from "../../types";
const PrivateRoute = ({ token, component, path }: PrivateRouteProps) => {
  return token ? component : <Navigate to={path} />;
};
export default PrivateRoute;
