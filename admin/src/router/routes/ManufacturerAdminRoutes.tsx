import { Route } from "react-router-dom";
import { Label, labelLoader, labelAction, ManufacturerPanel } from "../../pages";

const ManufacturerAdminRoutes = (
    <>
        <Route index element={<ManufacturerPanel />} />

        <Route path="label" element={<Label />} loader={labelLoader} action={labelAction} />
    </>
)
export default ManufacturerAdminRoutes