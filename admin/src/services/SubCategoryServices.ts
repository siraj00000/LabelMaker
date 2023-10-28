import { QueryParams } from "../types";
import { handleInsertAction, handleFetchAction, handleUpdateAction, handleDeleteAction } from "./common/API";

const SubcategoryService = {
  create: (body: any) =>
    handleInsertAction({ url: `/subcategory/create`, data: body }),

  update: (id: string, body: any) =>
    handleUpdateAction({ url: `/subcategory/updateOne/${id}`, data: body }),

  updateMany: (ids: string[], body: any) =>
    handleUpdateAction({ url: `/subcategory/updateAll`, data: {subcategoryIdsToUpdate: ids, updateData: body} }),

  getSubcategoryList: ({ name, limit, page, sortOrder }: QueryParams) =>
    handleFetchAction({ url: `/subcategory/getAll?title=${name}&limit=${limit}&page=${page}&sortOrder=${sortOrder}` }),

  getSubcategoryListOfName: () =>
    handleFetchAction({ url: `/subcategory/getNameAndId` }),

  updateStatus: (id: string) =>
    handleUpdateAction({ url: `/subcategory/toggleStatus/${id}` }),

  updateMultipleStatus: (ids: string[], status: string) =>
    handleUpdateAction({ url: `/subcategory/multiToggleStatus?status=${status}`, data: ids }),

  deleteOneCategory: (id: string) =>
    handleDeleteAction({ url: `/subcategory/deleteOne/${id}` }),

  deleteAllCategory: (ids: string[]) =>
    handleDeleteAction({ url: `/subcategory/deleteMultiple`, data: { subcategoryIds: ids } }),
};

export default SubcategoryService;