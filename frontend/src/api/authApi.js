import apiClient from "./apiClient";

export const login = (data) => {
    return apiClient.post("api/users/login", data);
};

export const signup = (data) => {
    return apiClient.post("api/users/signup", data);
};
export const sendOtp = (email) => {
    return apiClient.post("api/users/verify-otp", {email});
};