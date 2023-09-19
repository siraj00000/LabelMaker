import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import { ShowRoleBasedRouters } from "./common/RoleBasedRoutes";
import PrivateRoute from "./common/PrivateRoute";
import { LoginPage, LoginPageAction } from "../pages";
import { hasAuthToken } from "../utils/authUtils";
import { ToastContainer } from "../utils/toast";
import { Fragment } from "react";
const authToken = hasAuthToken();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={PrivateRoute({
          token: authToken,
          component: <Outlet />,
          path: "/login",
        })}
      >
        {ShowRoleBasedRouters}
      </Route>
      <Route
        path="login"
        element={PrivateRoute({
          token: !authToken,
          component: <LoginPage />,
          path: "/",
        })}
        action={LoginPageAction}
      />
      <Route path="*" element={<h1>404</h1>} />
    </Route>
  )
);

const RootRouter = () => (
  <Fragment>
    <ToastContainer />
    <RouterProvider router={router} />
  </Fragment>
);

export default RootRouter;
