import { ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, useRevalidator } from "react-router-dom";
import { DashboardActions, DashboardLoaders } from "../../../services/common/Actions";
import { APIDataResponse } from "../../../types/response.type";
import CommonLayout from "../../../components/templates/CRUD/common";
import EditSubCategoryForm from "../../../components/templates/CRUD/SubCategory/SubCategoryEditForm";
import SubcategoryService from "../../../services/SubCategoryServices";
import CreateSubCategoryForm from "../../../components/templates/CRUD/SubCategory/SubCategoryCreateForm";

const { create, getSubcategoryList, update, updateStatus, deleteAllCategory, deleteOneCategory } = SubcategoryService

const SubCategory = () => {
  let revalidator = useRevalidator();
  const { data, pagination } = useLoaderData() as APIDataResponse;

  const toggleCategoryStatus = (id: string) => {
    DashboardActions.updateAction(updateStatus(id));
  }

  const deleteRecordHandler = (id: string) => {
    DashboardActions.deleteAction(deleteOneCategory(id), revalidator.revalidate);
  }

  const deleteMultipleRecordHandler = (ids: string[]) => {
    DashboardActions.deleteAction(deleteAllCategory(ids), revalidator.revalidate);
  }
  
  return (
    <CommonLayout
      columns={['title', 'status']}
      data={{ data, pagination }}
      title={'subcategory'}
      addActionComponent={<CreateSubCategoryForm />}
      editActionComponent={<EditSubCategoryForm />}
      updateStatus={toggleCategoryStatus}
      deleteRecord={deleteRecordHandler}
      deleteMultipleRecordHandler={deleteMultipleRecordHandler}
    />
  )
};

export const subCategoryAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formType = formData.get('formType');
  const formId = formData.get('_id') as string;

  if (formType === 'add') {
    return DashboardActions.createAction(create(formData));
  }
  else if (formType === 'edit') {
    return DashboardActions.createAction(update(formId, formData));
  }
  return null
}

export const subCategoryLoader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const { name = '', page = '1', limit = '5', sortOrder = 'asc' }: {
    name?: string;
    page?: string;
    limit?: string;
    sortOrder?: 'asc' | 'desc';
  } = Object.fromEntries(url.searchParams);

  return DashboardLoaders.fetchLoaderData(getSubcategoryList({ name, page, limit, sortOrder }));
};

export default SubCategory;
