import API from "./http-common";
import { AxiosRequestConfig } from "axios";
const token = sessionStorage.getItem("authToken");

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
      };
      const response = await API(config);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const handleUpdateAction = ({ url, data }: HandleInsertActionProps) => {
  return new Promise(async (resolve, reject) => {
    try {
      const config: AxiosRequestConfig = {
        method: "PUT",
        url,
        data,
        headers: {
          "Content-Type": "application/json",
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
