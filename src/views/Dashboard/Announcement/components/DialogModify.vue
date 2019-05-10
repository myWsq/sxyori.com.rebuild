<template>
    <el-dialog :visible.sync="visible" :title="`${mode}文章信息`" width="800px">
        <el-form :model="form">
            <el-form-item label="标题" required>
                <el-input
                    v-model="form.title"
                    placeholder="请输入文章标题"
                ></el-input>
            </el-form-item>
            <el-form-item label="副标题">
                <el-input
                    v-model="form.subTitle"
                    placeholder="请输入文章副标题"
                ></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input
                    v-model="form.content"
                    type="textarea"
                    :autosize="{
                        minRows: 3,
                        maxRows: 6
                    }"
                    placeholder="请输入文章内容"
                ></el-input>
            </el-form-item>
            <el-form-item label="文章封面" prop="img">
                <q-uploader
                    v-model="form.img"
                    :fsize-limit="1024 * 1024 * 3"
                    :mime-limit="'image/png,image/jpeg'"
                    :helper="'推荐宽高500*200像素, 大小不超过3mb'"
                    :img-style="'-news'"
                ></q-uploader>
                <el-row class="mt-1">
                    <img :src="form.img" />
                </el-row>
            </el-form-item>
            <el-form-item label="是否置顶">
                <el-checkbox v-model="form.isTop"></el-checkbox>
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
                title: "",
                subTitle: "",
                content: "",
                isTop: false
            }
        };
    },
    computed: {
        mode() {
            return this.form && this.form.id ? "修改" : "新增";
        },
        teacherOptions() {
            return this.teachers.map(item => ({
                value: item.id,
                label: item.name
            }));
        }
    },
    methods: {
        async open(src) {
            if (src) {
                this.form = {
                    ...src
                };
            } else {
                this.form = {
                    id: "",
                    title: "",
                    subTitle: "",
                    content: "",
                    isTop: false
                };
            }
            this.visible = true;
        },
        async onSubmit() {
            this.loading++;
            if (this.mode === "新增") {
                const res = await DashboardService.createPost(this.form);
                if (!res.code) {
                    this.$message.success("新增文章成功");
                    this.$emit("submit", this.form);
                    this.visible = false;
                } else {
                    this.$message.error(JSON.stringify(res.message));
                }
            } else {
                const res = await DashboardService.updatePost(
                    this.form.id,
                    this.form
                );
                if (!res.code) {
                    this.$message.success("修改文章成功");
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
