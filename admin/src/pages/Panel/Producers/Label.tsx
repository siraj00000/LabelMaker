import { ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, useRevalidator } from "react-router-dom";
import { DashboardActions, DashboardLoaders } from "../../../services/common/Actions";
import { APIDataResponse } from "../../../types/response.type";
import CommonLayout from "../../../components/templates/CRUD/common";
import LabelServices from "../../../services/LabelServices";
import LabelCreateForm from "../../../components/templates/CRUD/Label/LabelCreateForm";
import LabelEditForm from "../../../components/templates/CRUD/Label/LabelEditForm";
import LabelBulkForm from "../../../components/templates/CRUD/Label/LabelBulkForm";

const { createLabel, fetchAllData, updateLabel, updateManyLabel, toggleStatusLabel, deleteManyLabel, deleteOneLabel } = LabelServices

const Label = () => {
    let revalidator = useRevalidator();
    const { data, pagination } = useLoaderData() as APIDataResponse;

    const toggleCategoryStatus = (id: string) => {
        DashboardActions.updateAction(toggleStatusLabel(id));
    }

    const deleteRecordHandler = (id: string) => {
        DashboardActions.deleteAction(deleteOneLabel(id), revalidator.revalidate);
    }

    const deleteMultipleRecordHandler = (ids: string[]) => {
        DashboardActions.deleteAction(deleteManyLabel(ids), revalidator.revalidate);
    }

    return (
        <CommonLayout
            columns={['manufacture', 'brand', 'product', 'batch_number', 'variant', 'status']}
            data={{ data, pagination }}
            title={'label'}
            bulkActionComponent={<LabelBulkForm />}
            addActionComponent={<LabelCreateForm />}
            editActionComponent={<LabelEditForm />}
            updateStatus={toggleCategoryStatus}
            deleteRecord={deleteRecordHandler}
            deleteMultipleRecordHandler={deleteMultipleRecordHandler}
        />
    )
};

export const labelAction = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const formType = formData.get('formType');
    const formId = formData.get('_id') as string;

    if (formType === 'add') {
        return DashboardActions.createAction(createLabel(formData));
    }
    else if (formType === 'edit') {
        return DashboardActions.createAction(updateLabel(formId, formData));
    }
    else if (formType === 'bulk') {
        return DashboardActions.createAction(updateManyLabel(formId, formData));
    }
    return null
}

export const labelLoader = ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const { name = '', page = '1', limit = '5', sortOrder = 'asc' }: {
        name?: string;
        page?: string;
        limit?: string;
        sortOrder?: 'asc' | 'desc';
    } = Object.fromEntries(url.searchParams);

    return DashboardLoaders.fetchLoaderData(fetchAllData({ name, page, limit, sortOrder }));
};

export default Label;