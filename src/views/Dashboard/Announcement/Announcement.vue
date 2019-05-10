<template>
    <div>
        <the-toolbar>
            <el-row type="flex" align="middle">
                <span>公告/文章管理</span>
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
                        sortable
                        label="标题"
                        prop="title"
                    ></el-table-column>
                    <el-table-column
                        label="副标题"
                        prop="subTitle"
                    ></el-table-column>
                    <el-table-column label="创建时间">
                        <template #default="{row}">
                            {{ $day(row.createdAt).format("lll") }}
                        </template>
                    </el-table-column>
                    <el-table-column width="100" label="是否置顶">
                        <template #default="{row}">
                            {{ row.isTop ? "是" : "否" }}
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
import DialogModify from "./components/DialogModify.vue";
import { DashboardService } from "../Dashboard.service";
export default {
    components: {
        DialogModify
    },
    data() {
        return {
            source: []
        };
    },
    created() {
        this.fetch();
    },
    methods: {
        async fetch() {
            const loading = this.$loading({ fullscreen: true });
            this.source = await DashboardService.getPosts();
            loading.close();
        },
        async onDelete(item) {
            const res = await DashboardService.deletePost(item.id);
            if (!res.code) {
                this.$message.success("删除成功");
                this.fetch();
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
