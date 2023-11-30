import { ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, useRevalidator } from "react-router-dom";
import { QueryParams } from "../../../types";
import { APIDataResponse } from "../../../types/response.type";
import { DashboardActions, DashboardLoaders } from "../../../services/common/Actions";
import CommonLayout from "../../../components/templates/CRUD/common";
import BrandCreateForm from "../../../components/templates/CRUD/Brands/BrandCreateForm";
import BrandEditForm from "../../../components/templates/CRUD/Brands/BrandEditForm";
import BrandServices from "../../../services/BrandServices";
import DetailBrand from "../../../components/templates/CRUD/Brands/DetailBrand";

const {
    createBrands,
    fetchAllBrands,
    updateBrands,
    deleteManyBrands,
    deleteOneBrand,
    updateStatus
} = BrandServices

const Brands = () => {
    const revalidator = useRevalidator();
    const { data, pagination } = useLoaderData() as APIDataResponse;

    const toggleCategoryStatus = (id: string) => {
        DashboardActions.updateAction(updateStatus(id));
    }

    const deleteRecordHandler = (id: string) => {
        DashboardActions.deleteAction(deleteOneBrand(id), revalidator.revalidate);
    }

    const deleteMultipleRecordHandler = (ids: string[]) => {
        DashboardActions.deleteAction(deleteManyBrands(ids), revalidator.revalidate);
    }

    return (
        <CommonLayout
            columns={['images', 'name', 'company', 'status']}
            data={{ data, pagination }}
            title={'brand'}
            addActionComponent={<BrandCreateForm />}
            editActionComponent={<BrandEditForm />}
            itemViewComponent={<DetailBrand />}
            updateStatus={toggleCategoryStatus}
            deleteRecord={deleteRecordHandler}
            deleteMultipleRecordHandler={deleteMultipleRecordHandler}
            screenWidth="80%"
        />
    )
}

export const brandsLoader = ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const { name = '', page = '1', limit = '5', sortOrder = 'asc' }: QueryParams = Object.fromEntries(url.searchParams);
    return DashboardLoaders.fetchLoaderData(fetchAllBrands({ name, page, limit, sortOrder }));
}

export const brandsAction = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const formType = formData.get('formType');
    const formId = formData.get('_id') as string;

    if (formType === 'add') {
        return DashboardActions.createAction(createBrands(formData));
    }
    else if (formType === 'edit') {
        return DashboardActions.updateAction(updateBrands(formId, formData));
    }
    return null
}

export default Brands