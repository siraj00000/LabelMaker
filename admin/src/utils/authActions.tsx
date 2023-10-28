import Cookies from "js-cookie";
import { notifyError, notifySuccess } from "./toast";
import { ErrorResponse } from "../types/response.type";

// Function to check if an authentication token is present
export function hasAuthToken() {
  const authToken = Cookies.get("authToken");
  return authToken !== undefined && authToken !== null;
}

// Function that return authn token
export function getAuthToken() {
  const authToken = Cookies.get("authToken");
  return authToken;
}

// Return language code from the cookies 
export const currentLanguage: 'en' | 'fr' = Cookies.get('18next') as 'en' | 'fr' || 'en'

// Function to redirect to the home page after a delay
export function redirectToHomePageAfterDelay() {
  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
}
// Function to logout the user and redirect to the home page after a delay
export function logout() {
  // Clear the authentication token from cookies or wherever it's stored
  Cookies.remove("authToken");

  // Perform additional logout actions if needed, e.g., redirect to a signin page
  // After clearing the authentication token, redirect to the home page with a delay
  redirectToHomePageAfterDelay();
}
export const handleSuccessfulSignIn = (token: string) => {
  Cookies.set("authToken", token);
  notifySuccess("SignIn Successful!"); // ends in 3000

  setTimeout(() => {
    window.location.href = "/";
  }, 3000);
};

// Define a function to handle SignIn errors
export const handleError = ({ response }: ErrorResponse) => {
  if (response && response.data && response.data.error) {
    notifyError(response.data.error);
    return response.data.error;
  } else {
    return response;
  }
};
