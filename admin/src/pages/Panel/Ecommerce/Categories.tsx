import { ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, useRevalidator } from "react-router-dom";
import { DashboardActions, DashboardLoaders } from "../../../services/common/Actions";
import { APIDataResponse } from "../../../types/response.type";
import CommonLayout from "../../../components/templates/CRUD/common";
import CreateCategoryForm from "../../../components/templates/CRUD/Categories/CreateCategoryForm";
import UpdateCategoryForm from "../../../components/templates/CRUD/Categories/EditCategoryForm";
import CategoryService from "../../../services/CategoryServices";


const Category = () => {
  let revalidator = useRevalidator();
  const { data, pagination } = useLoaderData() as APIDataResponse;

  const toggleCategoryStatus = (id: string) => {
    DashboardActions.updateCategoryStatusAction(id);
  }

  const deleteRecordHandler = (id: string) => {
    DashboardActions.deleteOneCategoryStatusAction(id, revalidator.revalidate);
  }

  const deleteMultipleRecordHandler = (ids: string[]) => {
    DashboardActions.deleteAllCategoryStatusAction(ids, revalidator.revalidate);
  }

  return (
    <CommonLayout
      columns={['title', 'description', 'status']}
      data={{ data, pagination }}
      title={'category'}
      addActionComponent={<CreateCategoryForm />}
      editActionComponent={<UpdateCategoryForm />}
      updateStatus={toggleCategoryStatus}
      deleteRecord={deleteRecordHandler}
      deleteMultipleRecordHandler={deleteMultipleRecordHandler}
    />
  )
};

export const categoryAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formType = formData.get('formType');
  const formId = formData.get('_id') as string;

  if (formType === 'add') {
    return DashboardActions.createAction(CategoryService.create(formData));
  }
  else if (formType === 'edit') {
    return DashboardActions.createAction(CategoryService.update(formId, formData));
  }
  return null
}

export const categoryLoader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const { name = '', page = '1', limit = '5', sortOrder = 'asc' }: {
    name?: string;
    page?: string;
    limit?: string;
    sortOrder?: 'asc' | 'desc';
  } = Object.fromEntries(url.searchParams);

  return DashboardLoaders.fetchLoaderData(CategoryService.getCategoryList({ name, page, limit, sortOrder }));
};

export default Category;
