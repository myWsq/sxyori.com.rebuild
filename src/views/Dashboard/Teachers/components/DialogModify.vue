<template>
    <el-dialog :visible.sync="visible" :title="`${mode}教师信息`" width="600px">
        <el-form :model="form">
            <el-form-item label="姓名" prop="name">
                <el-input
                    v-model="form.name"
                    placeholder="请输入教师姓名"
                ></el-input>
            </el-form-item>
            <el-form-item label="介绍" prop="introduction">
                <el-input
                    v-model="form.introduction"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="请输入教师介绍"
                ></el-input>
            </el-form-item>
            <el-form-item label="教师照片" prop="img">
                <q-uploader
                    v-model="form.img"
                    :fsize-limit="1024 * 1024 * 3"
                    :mime-limit="'image/png,image/jpeg'"
                    :helper="'推荐宽高400*300像素, 大小不超过3mb'"
                    :img-style="'-teacher'"
                ></q-uploader>
                <el-row v-if="form.img" class="mt-1">
                    <img :src="form.img" />
                </el-row>
            </el-form-item>
            <el-form-item label="是否在首页显示">
                <el-checkbox v-model="form.isShow"></el-checkbox>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" :loading="loading > 0" @click="onSubmit"
                >确定</el-button
            >
        </template>
    </el-dialog>
</template>

<script>
import { DashboardService } from "../../Dashboard.service";
export default {
    data() {
        return {
            visible: false,
            loading: 0,
            form: {
                id: "",
                name: "",
                img: "",
                introduction: "",
                isShow: false
            }
        };
    },
    computed: {
        mode() {
            return this.form && this.form.id ? "修改" : "新增";
        }
    },
    methods: {
        open(src) {
            if (src) {
                this.form = { ...src };
            } else {
                this.form = {
                    id: "",
                    name: "",
                    img: "",
                    introduction: "",
                    isShow: false
                };
            }
            this.visible = true;
        },
        async onSubmit() {
            this.loading++;
            if (this.mode === "新增") {
                const res = await DashboardService.createTeacher(this.form);
                if (!res.code) {
                    this.$message.success("新增成功");
                    this.$emit("submit", this.form);
                    this.visible = false;
                } else {
                    this.$message.error(JSON.stringify(res.message));
                }
            } else {
                const res = await DashboardService.updateTeacher(
                    this.form.id,
                    this.form
                );
                if (!res.code) {
                    this.$message.success("修改成功");
                    this.$emit("submit", this.form);
                    this.visible = false;
                } else {
                    this.$message.error(JSON.stringify(res.message));
                }
            }
            this.loading--;
        }
    }
};
</script>

<style lang="scss" scoped></style>
