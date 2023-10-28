import { ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, useRevalidator } from "react-router-dom";
import { DashboardActions, DashboardLoaders } from "../../../services/common/Actions";
import { APIDataResponse } from "../../../types/response.type";
import CommonLayout from "../../../components/templates/CRUD/common";
import CompanyService from "../../../services/CompanyServices";
import CreateCompanyForm from "../../../components/templates/CRUD/Companies/CompanyCreateForm";
import EditCompanyForm from "../../../components/templates/CRUD/Companies/CompanyEditFrom";

const { create, getAllCompanies, updateOne, toggleStatus, deleteMultiple, deleteOne } = CompanyService

const Companies = () => {
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
            columns={['name', 'email', 'status']}
            data={{ data, pagination }}
            title={'company'}
            addActionComponent={<CreateCompanyForm />}
            editActionComponent={<EditCompanyForm />}
            updateStatus={toggleCategoryStatus}
            deleteRecord={deleteRecordHandler}
            deleteMultipleRecordHandler={deleteMultipleRecordHandler}
        />
    )
};

export const companyAction = async ({ request }: ActionFunctionArgs) => {
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

export const companyLoader = ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const { name = '', page = '1', limit = '5', sortOrder = 'asc' }: {
        name?: string;
        page?: string;
        limit?: string;
        sortOrder?: 'asc' | 'desc';
    } = Object.fromEntries(url.searchParams);

    return DashboardLoaders.fetchLoaderData(getAllCompanies({ name, page, limit, sortOrder }));
};

export default Companies;