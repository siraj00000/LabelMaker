import { ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, useRevalidator } from "react-router-dom";
import { DashboardActions, DashboardLoaders } from "../../../services/common/Actions";
import { APIDataResponse } from "../../../types/response.type";
import CommonLayout from "../../../components/templates/CRUD/common";
import ManufacturerService from "../../../services/ManufacturerServices";
import ManufacturerCreateForm from "../../../components/templates/CRUD/Manufacturers/ManufacturerCreateForm";
import ManufacturerEditForm from "../../../components/templates/CRUD/Manufacturers/ManufacturerEditForm";

const { create, getAll, updateOne, toggleStatus, deleteMultiple, deleteOne } = ManufacturerService

const Manufacturers = () => {
    let revalidator = useRevalidator();
    const { data, pagination } = useLoaderData() as APIDataResponse;

    const toggleCategoryStatus = (id: string) => {
        DashboardActions.updateAction(toggleStatus(id));
    }

    const deleteRecordHandler = (id: string) => {
        DashboardActions.deleteAction(deleteOne(id), revalidator.revalidate);
    }

    const deleteMultipleRecordHandler = (ids: string[]) => {
        DashboardActions.deleteAction(deleteMultiple(ids), revalidator.revalidate);
    }
    
    return (
        <CommonLayout
            columns={['name', 'email', 'company', 'status']}
            data={{ data, pagination }}
            title={'manufacturer'}
            addActionComponent={<ManufacturerCreateForm />}
            editActionComponent={<ManufacturerEditForm />}
            updateStatus={toggleCategoryStatus}
            deleteRecord={deleteRecordHandler}
            deleteMultipleRecordHandler={deleteMultipleRecordHandler}
        />
    )
};

export const manufacturerAction = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const formType = formData.get('formType');
    const formId = formData.get('_id') as string;

    if (formType === 'add') {
        return DashboardActions.createAction(create(formData));
    }
    else if (formType === 'edit') {
        return DashboardActions.createAction(updateOne(formId, formData));
    }
    return null
}

export const manufacturerLoader = ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const { name = '', page = '1', limit = '5', sortOrder = 'asc' }: {
        name?: string;
        page?: string;
        limit?: string;
        sortOrder?: 'asc' | 'desc';
    } = Object.fromEntries(url.searchParams);

    return DashboardLoaders.fetchLoaderData(getAll({ name, page, limit, sortOrder }));
};

export default Manufacturers;