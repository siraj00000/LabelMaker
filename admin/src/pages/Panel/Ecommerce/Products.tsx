import Cookies from "js-cookie";
import { ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, useRevalidator } from "react-router-dom";
import { QueryParams } from "../../../types";
import { APIDataResponse } from "../../../types/response.type";
import { DashboardActions, DashboardLoaders } from "../../../services/common/Actions";
import ProductServices from "../../../services/ProductServices";
import CommonLayout from "../../../components/templates/CRUD/common";
import ProductCreateForm from "../../../components/templates/CRUD/Products/CreateProductForm";
import ProductEditForm from "../../../components/templates/CRUD/Products/EditProductForm";

const {
  fetchAllData,
  createProduct,
  deleteManyProduct,
  deleteOneProduct,
  toggleStatusProduct,
  // updateManyProducts,
  updateProduct
} = ProductServices

const Products = () => {
  const revalidator = useRevalidator();
  const { data, pagination } = useLoaderData() as APIDataResponse;

  const toggleCategoryStatus = (id: string) => {
    DashboardActions.updateAction(toggleStatusProduct(id));
  }

  const deleteRecordHandler = (id: string) => {
    DashboardActions.deleteAction(deleteOneProduct(id), revalidator.revalidate);
  }

  const deleteMultipleRecordHandler = (ids: string[]) => {
    DashboardActions.deleteAction(deleteManyProduct(ids), revalidator.revalidate);
  }

  return (
    <CommonLayout
      columns={['images','name', 'brand', 'status']}
      data={{ data, pagination }}
      title={'product'}
      addActionComponent={<ProductCreateForm />}
      editActionComponent={<ProductEditForm />}
      updateStatus={toggleCategoryStatus}
      deleteRecord={deleteRecordHandler}
      deleteMultipleRecordHandler={deleteMultipleRecordHandler}
      screenWidth="80%"
    />
  )
}

export const productsLoader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  let lang: "en" | "fr" = Cookies.get('i8next') as "en" | "fr" || 'en'
  const { name = '', page = '1', limit = '5', sortOrder = 'asc' }: QueryParams = Object.fromEntries(url.searchParams);
  return DashboardLoaders.fetchLoaderData(fetchAllData({ lang, name, page, limit, sortOrder }));
}

export const productsAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formType = formData.get('formType');
  const formId = formData.get('_id') as string;

  if (formType === 'add') {
    return DashboardActions.createAction(createProduct(formData));
  }
  else if (formType === 'edit') {
    return DashboardActions.updateAction(updateProduct(formId, formData));
  }
  return null
}

export default Products