import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../Contexts/AuthProvider";
import { useContext, useEffect } from "react";

const axiosInstance = axios.create({
    baseURL: `http://localhost:3000`
});

const useAxios = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    useEffect(() => {
        // Request Interceptor to add authorization header
        const requestInterceptor = axiosInstance.interceptors.request.use(function (config) {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        // Response Interceptor to handle 401 and 403
        const responseInterceptor = axiosInstance.interceptors.response.use(function (response) {
            return response;
        }, async (error) => {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        });

        // Cleanup interceptors
        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate, logOut]);

    return axiosInstance;
};

export default useAxios;