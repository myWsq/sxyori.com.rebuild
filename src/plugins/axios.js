import axios from "axios";

import { Message } from "element-ui";
const _axios = axios.create();

_axios.interceptors.request.use(config => {
    const token = localStorage.getItem("admin-token");
    if (token) {
        config.headers["Authorization"] = token;
    }
    return config;
});

_axios.interceptors.response.use(
    res => {
        const { code, message } = res.data;
        if (code) {
            switch (code) {
                case 1:
                    break;
                default:
                    Message.error(message);
                    break;
            }
            return res.data;
        }
        return res.data;
    },
    err => {
        const { statusCode } = err.response.data;
        switch (statusCode) {
            case 401:
                localStorage.removeItem("admin-token");
                break;
            case 403:
                Message.error("权限不足");
                break;
            default:
                break;
        }

        return Promise.reject(err);
    }
);

export const AxiosDefault = _axios;
