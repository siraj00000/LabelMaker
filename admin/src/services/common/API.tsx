import { getAuthToken } from "../../utils/authActions";
import API from "./HttpCommon";
import axios, { AxiosRequestConfig } from "axios";
const token = getAuthToken();

interface HandleInsertActionProps {
  url: string;
  data?: object;
  type?: string;
}

export const handleInsertAction = ({
  url,
  data,
  type = "application/json",
}: HandleInsertActionProps) => {
  return new Promise(async (resolve, reject) => {
    try {
      const config: AxiosRequestConfig = {
        method: "POST",
        url,
        data,
        headers: {
          "Content-Type": type,
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await API(config);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

interface HandleFetchActionProps {
  url: string;
  token?: string;
  data?: any;
}

export const handleFetchAction = ({ url, data }: HandleFetchActionProps) => {
  // Create a CancelToken source
  const cancelTokenSource = axios.CancelToken.source();

  return new Promise(async (resolve, reject) => {
    try {
      const config: AxiosRequestConfig = {
        method: "GET",
        url,
        data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cancelToken: cancelTokenSource.token, // Assign the cancel token to the request
      };

      const response = await API(config);
      resolve(response);
    } catch (error) {
      // Check if the error is due to a request cancellation
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        reject(error);
      }
    }
  });
};

export const handleUpdateAction = ({ url, data, type = "application/json" }: HandleInsertActionProps) => {
  return new Promise(async (resolve, reject) => {
    try {
      const config: AxiosRequestConfig = {
        method: "PUT",
        url,
        data,
        headers: {
          "Content-Type": type,
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await API(config);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const handleDeleteAction = ({ url, data, type = "application/json" }: HandleInsertActionProps) => {
  return new Promise(async (resolve, reject) => {
    try {
      const config: AxiosRequestConfig = {
        method: "DELETE",
        url,
        data,
        headers: {
          "Content-Type": type,
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await API(config);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
