import { ListData } from ".";

export type SignInResponse = {
  data: {
    accountInfo: {
      role: "Super Admin" | "Admin";
    };
    success: boolean;
    token: string;
  };
  response: {
    data: {
      error: string;
    };
  };
};

export type ForgetOrResetPasswordResponse = {
  data: {
    success: boolean;
    message: string;
  };
};

export type PostAPIResponse = {
  data: {
    success: boolean;
    message: string;
  };
};

export type ErrorResponse = {
  response: {
    data: {
      error: string;
    };
  };
};

export interface MultilingualText {
  en: string;
  fr: string;
  getText: () => string;
}

export interface PaginationTypes {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface APIDataResponse {
  success: boolean;
  data: any[];
  pagination: PaginationTypes;
}

export interface ApiGetResponse {
  data: APIDataResponse
}

export interface CategoryNameApiGetResponse {
  data: {
    success: boolean;
    data: ListData[];
    pagination: PaginationTypes;
  };
}

