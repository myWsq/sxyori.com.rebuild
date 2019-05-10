<template>
    <div>
        <the-toolbar>
            <el-row type="flex" align="middle">
                <span>用户信息管理</span>
            </el-row>
        </the-toolbar>
        <the-content>
            <el-tabs type="border-card" class="mt-1" @tab-click="onTabClick">
                <template v-if="isSuperAdmin">
                    <el-tab-pane label="普通用户"></el-tab-pane>
                    <el-tab-pane label="管理员"></el-tab-pane>
                </template>
                <el-table :data="source" border>
                    <el-table-column
                        sortable
                        label="用户名"
                        prop="username"
                    ></el-table-column>
                    <el-table-column
                        label="姓名"
                        prop="nickName"
                    ></el-table-column>
                    <el-table-column
                        label="手机号"
                        prop="mobile"
                    ></el-table-column>
                    <el-table-column
                        label="微信"
                        prop="wechat"
                    ></el-table-column>
                    <el-table-column label="QQ" prop="qq"></el-table-column>
                    <el-table-column label="创建时间">
                        <template #default="{row}">
                            {{ $day(row.createdAt).format("lll") }}
                        </template>
                    </el-table-column>
                    <el-table-column width="200" label="操作">
                        <template #default="{row}">
                            <el-link @click="$refs.dialogModify.open(row)"
                                >查看课程</el-link
                            >
                            <template v-if="isSuperAdmin">
                                <el-link
                                    v-if="row.role === 'NORMAL'"
                                    type="primary"
                                    class="ml-1"
                                    @click="onDelete(row)"
                                    >设为管理员</el-link
                                >
                                <el-link
                                    v-else
                                    type="danger"
                                    class="ml-1"
                                    @click="onDelete(row)"
                                    >移除管理员</el-link
                                >
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tabs>
        </the-content>
        <dialog-course ref="dialogModify" @submit="fetch"></dialog-course>
    </div>
</template>

<script>
import DialogCourse from "./components/DialogCourse.vue";
import { DashboardService } from "../Dashboard.service";
export default {
    components: {
        DialogCourse
    },
    data() {
        return {
            source: [],
            roles: ["PUBLIC"]
        };
    },
    computed: {
        isSuperAdmin() {
            return this.$store.state.me.role === "SUPER_ADMIN";
        }
    },
    created() {
        this.fetch();
    },
    methods: {
        async fetch() {
            const loading = this.$loading({ fullscreen: true });
            this.source = await DashboardService.getUsers(this.roles);
            loading.close();
        },
        async onDelete(item) {
            const res = await DashboardService.deletePost(item.id);
            if (!res.code) {
                this.$message.success("删除成功");
                this.fetch();
            }
        },
        onTabClick(e) {
            if (e.index === "0") {
                this.roles = ["PUBLIC"];
            } else {
                this.roles = ["PUBLIC", "ADMIN"];
            }
            this.fetch();
        }
    }
};
</script>

<style lang="scss" scoped></style>
