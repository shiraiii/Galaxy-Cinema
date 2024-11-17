import axios from "axios";
import { response } from "express";

export const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originRequest = error.config;
    if (error.response.status === 401 && !originRequest._retry) {
      originRequest._retry = true;
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/auth/refresh",
          {},
          { withCredentials: true }
        );
        const { accessToken } = response.data;
        localStorage.setItem("token", accessToken);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        return axiosInstance(originRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
export const axiosPrivate = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: { "Content-Type": "application/json" },
});
