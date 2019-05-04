module.exports = {
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === "production" ? "/admin/" : "/",
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3002",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "" // rewrite path
                }
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                data: `
                  @import "@/assets/el-var.scss";
                  @import "@/assets/var.scss";
                `
            }
        }
    }
};
