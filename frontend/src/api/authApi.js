import apiClient from "./apiClient";

export const login = (data) => {
    return apiClient.post("api/users/login", data);
};

export const signup = (data) => {
    return apiClient.post("api/users/signup", data);
}