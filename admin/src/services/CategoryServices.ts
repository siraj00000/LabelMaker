import { CategoryQueryParams } from "../types";
import { handleInsertAction, handleFetchAction, handleUpdateAction, handleDeleteAction } from "./common/API";

const CategoryService = {
  create: (body: any) =>
    handleInsertAction({ url: `/category/create`, data: body }),

  update: (id: string, body: any) =>
    handleUpdateAction({ url: `/category/updateById/${id}`, data: body }),

  updateMany: (ids: string[], body: any) =>
    handleUpdateAction({ url: `/category/updateAll`, data: {categoryIdsToUpdate: ids, updateData: body} }),

  getCategoryList: ({ name, limit, page, sortOrder }: CategoryQueryParams) =>
    handleFetchAction({ url: `/category/getAllCategories?title=${name}&limit=${limit}&page=${page}&sortOrder=${sortOrder}` }),

  getCategoryListOfName: () =>
    handleFetchAction({ url: `/category/getNameAndId` }),

  updateStatus: (id: string) =>
    handleUpdateAction({ url: `/category/toggleStatus/${id}` }),

  updateMultipleStatus: (ids: string[], status: string) =>
    handleUpdateAction({ url: `/category/multiToggleStatus?status=${status}`, data: ids }),

  deleteOneCategory: (id: string) =>
    handleDeleteAction({ url: `/category/deleteOne/${id}` }),

  deleteAllCategory: (ids: string[]) =>
    handleDeleteAction({ url: `/category/deleteMultiple`, data: { categoryIds: ids } }),
};

export default CategoryService;
