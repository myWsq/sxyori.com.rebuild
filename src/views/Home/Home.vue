<template>
    <div class="home">
        <el-card>
            <h1>Yori Admin Platform</h1>
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                hide-required-asterisk
            >
                <el-form-item
                    label="用户名"
                    prop="username"
                    :error="error.username"
                >
                    <el-input
                        v-model="form.username"
                        placeholder="请输入用户名"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="密码"
                    prop="password"
                    :error="error.password"
                >
                    <el-input
                        v-model="form.password"
                        type="password"
                        placeholder="请输入密码"
                    ></el-input>
                </el-form-item>
                <el-button
                    type="primary"
                    class="submit-btn"
                    :loading="loading > 0"
                    @click="onSubmit('form')"
                    >登录</el-button
                >
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { HomeService } from "./Home.service.js";
export default {
    data() {
        return {
            loading: 0,
            form: {
                username: "",
                password: ""
            },
            error: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请填写用户名"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请填写密码"
                    }
                ]
            }
        };
    },
    methods: {
        async onSubmit(name) {
            this.error = {
                username: "",
                password: ""
            };
            await this.$refs[name].validate();
            this.loading++;
            const { code, message, body } = await HomeService.login(this.form);
            if (code === 1) {
                switch (Object.keys(message[0].constraints)[0]) {
                    case "IsPasswordCorrect":
                        this.error.password = "密码错误";
                        break;
                    case "IsUserExist":
                        this.error.username = "用户名不存在";
                        break;
                    default:
                        break;
                }
            } else {
                localStorage.setItem("token", body);
                this.$router.push({ name: "dashboard" });
            }
            this.loading--;
        }
    }
};
</script>

<style lang="scss" scoped>
.home {
    box-sizing: border-box;
    min-height: 100vh;
    max-width: 500px;
    padding-top: 5%;
    margin: 0 auto;
}
h1 {
    color: $--color-primary;
    font-weight: 300;
    margin-bottom: 10px;
}

.submit-btn {
    width: 100%;
}
</style>
