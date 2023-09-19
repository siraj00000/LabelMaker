import Cookies from "js-cookie";
import { notifyError, notifySuccess } from "./toast";
import { LoginResponse } from "../types/response.types";

// Function to check if an authentication token is present
export function hasAuthToken() {
  const authToken = Cookies.get("authToken");
  return authToken !== undefined && authToken !== null;
}

// Function to logout the user
export function logout() {
  // Clear the authentication token from cookies or wherever it's stored
  Cookies.remove("authToken");

  // Perform additional logout actions if needed, e.g., redirect to a logout page
  window.location.href = "/login"; // Redirect to a login page
}

export const handleSuccessfulLogin = (token: string) => {
  Cookies.set("authToken", token);
  notifySuccess("Login Successful!"); // ends in 3000

  setTimeout(() => {
    window.location.href = "/";
  }, 3000);
};

// Define a function to handle login errors
export const handleLoginError = ({ response }: LoginResponse) => {
  if (response && response.data && response.data.error) {
    notifyError(response.data.error);
    return response.data.error;
  } else {
    return response;
  }
};
