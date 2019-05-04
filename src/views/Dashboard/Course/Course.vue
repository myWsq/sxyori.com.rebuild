<template>
    <div>
        <the-toolbar>
            <el-row type="flex" align="middle">
                <span>课程管理</span>
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
                        label="课程名"
                        prop="name"
                    ></el-table-column>
                    <el-table-column
                        label="课程介绍"
                        prop="introduction"
                    ></el-table-column>
                    <!-- <el-table-column label="授课教师"></el-table-column> -->
                    <el-table-column width="100" label="在首页显示">
                        <template #default="{row}">
                            {{ row.isShow ? "是" : "否" }}
                        </template>
                    </el-table-column>
                    <el-table-column width="200" label="操作">
                        <el-link>查看/修改</el-link>
                        <el-link type="danger">删除</el-link>
                    </el-table-column>
                </el-table>
            </el-card>
        </the-content>
        <dialog-modify ref="dialogModify"></dialog-modify>
    </div>
</template>

<script>
import DialogModify from "./components/DialogModify.vue";
export default {
    components: {
        DialogModify
    },
    data() {
        return {
            source: []
        };
    }
};
</script>

<style lang="scss" scoped></style>
