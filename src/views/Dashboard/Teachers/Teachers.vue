<template>
    <div>
        <the-toolbar>
            <el-row type="flex" align="middle">
                <span>教师信息管理</span>
                <el-button
                    type="success"
                    size="mini"
                    class="ml-1"
                    @click="$refs.dialogModify.open()"
                    >新增</el-button
                >
            </el-row>
        </the-toolbar>
        <the-content>
            <el-card class="mt-1">
                <el-table :data="source" border>
                    <el-table-column
                        label="姓名"
                        width="200"
                        prop="name"
                    ></el-table-column>
                    <el-table-column
                        label="介绍"
                        prop="introduction"
                    ></el-table-column>
                    <el-table-column width="100" label="在首页显示">
                        <template #default="{row}">
                            {{ row.isShow ? "是" : "否" }}
                        </template>
                    </el-table-column>
                    <el-table-column width="200" label="操作">
                        <template #default="{row}">
                            <el-link @click="$refs.dialogModify.open(row)"
                                >查看/修改</el-link
                            >
                            <el-link
                                type="danger"
                                class="ml-1"
                                @click="onDelete(row)"
                                >删除</el-link
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </the-content>
        <dialog-modify ref="dialogModify" @submit="fetch"></dialog-modify>
    </div>
</template>

<script>
import { DashboardService } from "../Dashboard.service.js";
import DialogModify from "./components/DialogModify.vue";
export default {
    components: {
        DialogModify
    },
    data() {
        return {
            source: []
        };
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.openByUrlQuery();
        });
    },
    created() {
        this.fetch();
    },

    methods: {
        async fetch() {
            const res = await DashboardService.getTeachers();
            if (!res.code) {
                this.source = res.body;
            }
        },
        async onDelete(item) {
            const res = await DashboardService.deleteTeacher(item.id);
            if (!res.code) {
                this.$message.success("删除成功");
                this.fetch();
            }
        },
        openByUrlQuery() {
            const curOpen = this.$route.query.open;
            if (curOpen) {
                this.source.some(item => {
                    if (item.id == curOpen) {
                        this.$refs.dialogModify.open(item);
                        return true;
                    }
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
