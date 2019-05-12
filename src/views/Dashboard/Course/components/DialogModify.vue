<template>
    <el-dialog
        :visible.sync="visible"
        :title="`${mode}课程信息`"
        width="600px"
        top="30px"
    >
        <el-form :model="form">
            <el-form-item label="课程名">
                <el-input
                    v-model="form.name"
                    placeholder="请输入课程名"
                ></el-input>
            </el-form-item>
            <el-form-item label="介绍">
                <el-input
                    v-model="form.introduction"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="请输入课程介绍"
                ></el-input>
            </el-form-item>
            <el-form-item label="课程封面" prop="img">
                <q-uploader
                    v-model="form.img"
                    :fsize-limit="1024 * 1024 * 3"
                    :mime-limit="'image/png,image/jpeg'"
                    :helper="'推荐宽高300*400像素, 大小不超过3mb'"
                    :img-style="'-course'"
                ></q-uploader>
                <el-row class="mt-1">
                    <img :src="form.img" />
                </el-row>
            </el-form-item>
            <el-form-item label="授课教师" prop="teachers">
                <el-select
                    v-model="form.teachers"
                    multiple
                    placeholder="请选择授课教师"
                >
                    <el-option
                        v-for="item in teacherOptions"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    ></el-option>
                </el-select>
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
            },
            teachers: []
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
                    ...src,
                    teachers: src.teachers.map(item => item.id)
                };
            } else {
                this.form = {
                    id: "",
                    name: "",
                    img: "",
                    introduction: "",
                    teachers: [],
                    isShow: false
                };
            }
            this.visible = true;
            const res = await DashboardService.getTeachers();
            if (!res.code) {
                this.teachers = res.body;
            }
        },
        async onSubmit() {
            this.loading++;
            if (this.mode === "新增") {
                const res = await DashboardService.createCourse(this.form);
                if (!res.code) {
                    this.$message.success("新增课程成功");
                    this.$emit("submit", this.form);
                    this.visible = false;
                } else {
                    this.$message.error(JSON.stringify(res.message));
                }
            } else {
                const res = await DashboardService.updateCourse(
                    this.form.id,
                    this.form
                );
                if (!res.code) {
                    this.$message.success("修改课程成功");
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
