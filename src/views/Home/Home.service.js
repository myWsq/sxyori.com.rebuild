import { AxiosDefault } from "../../plugins/axios";

export const HomeService = {
    /**
     *
     * @param {{username: string, password: string}} payload
     * @returns {Promise<{code: number, body: string, message: any}>}
     */
    login(payload) {
        return AxiosDefault.post("/api/auth", payload);
    }
};
