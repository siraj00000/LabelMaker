import { ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, useRevalidator } from "react-router-dom";
import { DashboardActions, DashboardLoaders } from "../../../services/common/Actions";
import { APIDataResponse } from "../../../types/response.type";
import CommonLayout from "../../../components/templates/CRUD/common";
import StaffServices from "../../../services/StaffServices";
import StaffCreateForm from "../../../components/templates/CRUD/Staffs/StaffCreateForm";
import StaffEditForm from "../../../components/templates/CRUD/Staffs/StaffEditForm";

const { createStaff, getAllStaffList, unblockStaffMember, updateStaff, deleteOneCategory, deleteAllCategory } = StaffServices

const Staff = () => {
    let revalidator = useRevalidator();
    const { data, pagination } = useLoaderData() as APIDataResponse;

    const toggleCategoryStatus = (id: string) => {
        DashboardActions.updateAction(unblockStaffMember(id));
    }

    const deleteRecordHandler = (id: string) => {
        DashboardActions.deleteAction(deleteOneCategory(id), revalidator.revalidate);
    }

    const deleteMultipleRecordHandler = (ids: string[]) => {
        DashboardActions.deleteAction(deleteAllCategory(ids), revalidator.revalidate);
    }

    return (
        <CommonLayout
            columns={['image', 'name', 'email', 'role', 'status']}
            data={{ data, pagination }}
            title={'staff'}
            addActionComponent={<StaffCreateForm />}
            editActionComponent={<StaffEditForm />}
            updateStatus={toggleCategoryStatus}
            deleteRecord={deleteRecordHandler}
            deleteMultipleRecordHandler={deleteMultipleRecordHandler}
        />
    )
};

export const staffAction = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const formType = formData.get('formType');
    const formId = formData.get('_id') as string;

    if (formType === 'add') {
        return DashboardActions.createAction(createStaff(formData));
    }
    else if (formType === 'edit') {
        return DashboardActions.createAction(updateStaff(formId, formData));
    }
    return null
}

export const staffLoader = ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const { name = '', page = '1', limit = '5', sortOrder = 'asc' }: {
        name?: string;
        page?: string;
        limit?: string;
        sortOrder?: 'asc' | 'desc';
    } = Object.fromEntries(url.searchParams);

    return DashboardLoaders.fetchLoaderData(getAllStaffList({ name, page, limit, sortOrder }));
};

export default Staff;
