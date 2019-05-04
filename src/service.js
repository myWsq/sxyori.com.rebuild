import { AxiosDefault } from "./plugins/axios";
import * as qiniu from "qiniu-js";
import shortid from "shortid";

export const AppService = {
    async upload(file, fsizeLimit) {
        const key = shortid.generate();
        const token = await this.genUploadToken(fsizeLimit);
        return qiniu.upload(file, key, token);
    },
    genUploadToken(fsizeLimit) {
        return AxiosDefault.post("/api/upload", { fsizeLimit }).then(
            res => res.body
        );
    },
    getFileUrl(key) {
        return `http://strapi.sxyori.com/${key}`;
    }
};
