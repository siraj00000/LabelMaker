import { Fragment } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "../utils/toast";
import { hasAuthToken } from "../utils/authActions";
import PrivateRoute from "./PrivateRoute";
import AuthRoutes from "./routes/AuthRoutes";
import Dashboard from "../layout/Dashboard";
// import DashboardRoutes from "./routes/DashboardRoutes";
import ShowRoleBasedRouters from "./RoleBasedRoutes";

const authToken = hasAuthToken();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={PrivateRoute({
          token: authToken,
          component: <Dashboard />,
          path: "/signin",
        })}
        errorElement={<h1>Issues there working..</h1>}
      >
        {ShowRoleBasedRouters}
      </Route>
      <Route
        element={PrivateRoute({
          token: !authToken,
          component: <Outlet />,
          path: "/",
        })}
      >
        {AuthRoutes}
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Route>
  )
);

const RootRouter = () => {
  return (
    <Fragment>
      <ToastContainer />
      <RouterProvider router={router} />
    </Fragment>
  );
};

export default RootRouter;
