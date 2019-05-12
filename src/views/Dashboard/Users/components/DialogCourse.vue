<template>
    <el-dialog :visible.sync="visible" :title="`用户课程管理`" width="800px">
        <el-tabs>
            <el-tab-pane v-loading="tableLoading > 0" label="已选课程">
                <el-table :data="selectedCourse" border>
                    <el-table-column
                        sortable
                        label="课程名"
                        prop="course.name"
                    ></el-table-column>
                    <el-table-column
                        label="课程介绍"
                        prop="course.introduction"
                    ></el-table-column>
                    <el-table-column label="成绩">
                        <template #default="{row}">
                            <el-input
                                v-model.number="row.grade"
                                type="number"
                                size="mini"
                                placeholder="请输入成绩"
                                @blur="onSetGrade(row)"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="{row}">
                            <el-link type="danger" @click="onCancelCourse(row)"
                                >取消课程</el-link
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="未选课程">
                <el-table :data="unSelectedCourse" border>
                    <el-table-column
                        sortable
                        label="课程名"
                        prop="name"
                    ></el-table-column>
                    <el-table-column
                        label="课程介绍"
                        prop="introduction"
                    ></el-table-column>
                    <el-table-column label="授课教师">
                        <template #default="{row}">
                            <el-link
                                v-for="item in row.teachers"
                                :key="item.id"
                                type="primary"
                                class="mr-1"
                                @click="
                                    visible = false;
                                    $router.push(
                                        '/dashboard/teachers?open=' + item.id
                                    );
                                "
                            >
                                {{ item.name }}
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="{row}">
                            <el-link type="primary" @click="onSelectCourse(row)"
                                >选课</el-link
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script>
import { DashboardService } from "../../Dashboard.service";
export default {
    data() {
        return {
            visible: false,
            tableLoading: 0,
            selectedCourse: [],
            unSelectedCourse: [],
            user: null
        };
    },
    methods: {
        async open(src) {
            this.user = src;
            this.visible = true;
            this.tableLoading++;
            this.selectedCourse = await DashboardService.getUserCourse(src.id);
            this.unSelectedCourse = (await DashboardService.getCourse()).filter(
                item =>
                    !this.selectedCourse.some(
                        selected => selected.course.id === item.id
                    )
            );
            this.tableLoading--;
        },
        async onSetGrade(item) {
            await DashboardService.setUserCourse(
                this.user.id,
                item.course.id,
                item.grade
            );
        },
        async onSelectCourse(item) {
            const data = await DashboardService.setUserCourse(
                this.user.id,
                item.id
            );
            if (!data.code) {
                this.selectedCourse.push({
                    ...data.body,
                    course: item
                });
                this.unSelectedCourse = this.unSelectedCourse.filter(
                    unSelected => unSelected !== item
                );
            }
        },
        async onCancelCourse(item) {
            const data = await DashboardService.removeUserCourse(
                this.user.id,
                item.course.id
            );
            if (!data.code) {
                this.unSelectedCourse.push(item.course);
                this.selectedCourse = this.selectedCourse.filter(
                    unSelected => unSelected !== item
                );
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
