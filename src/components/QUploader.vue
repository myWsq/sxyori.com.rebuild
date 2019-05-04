<template>
    <el-row type="flex" align="middle">
        <el-button
            size="medium"
            :type="!value ? 'primary' : 'warning'"
            icon="el-icon-upload2"
            :loading="loading > 0"
            @click="onClick"
            >{{ text }}</el-button
        >
        <input
            v-show="false"
            id="q-uploader-btn"
            type="file"
            :accept="mimeLimit"
            @change="onSelectFile"
        />
        <template v-if="fileUrl">
            <!-- <el-link class="ml-1" @click="onExplor">预览</el-link> -->
            <el-link type="danger" class="ml-1" @click="onDelete">删除</el-link>
        </template>
        <span class="ml-1 helper">{{ helper }}</span>
    </el-row>
</template>

<script>
import { AppService } from "../service.js";
export default {
    props: {
        value: {
            type: String,
            required: true
        },
        fsizeLimit: {
            type: Number,
            default: 30000
        },
        mimeLimit: {
            type: String,
            required: true
        },
        helper: {
            type: String,
            default: ""
        },
        imgStyle: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            loading: 0,
            percent: 0
        };
    },
    computed: {
        fileUrl: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit("input", newValue);
            }
        },
        file: {
            get() {
                return document.getElementById("q-uploader-btn").files[0];
            },
            set(newValue) {
                document.getElementById("q-uploader-btn").value = newValue;
            }
        },
        text() {
            if (this.loading) {
                return `${Math.floor(this.percent)}%`;
            } else {
                return !this.value ? "点击上传" : "点击重新上传";
            }
        }
    },
    methods: {
        onExplor() {
            window.open(this.value, "__blank");
        },
        onClick() {
            document.getElementById("q-uploader-btn").click();
        },
        async onSelectFile(e) {
            const file = e.target.files[0];
            if (file.size >= this.fsizeLimit) {
                this.$message.error("文件大小超过限制");
                this.onDelete();
                return;
            }
            this.loading++;
            const observe = await AppService.upload(
                e.target.files[0],
                this.fsizeLimit
            );
            this.percent = 0;
            observe.subscribe(
                next => {
                    this.percent = next.total.percent;
                },
                err => {
                    this.onDelete();
                    this.$message.error(JSON.stringify(err));
                    this.loading--;
                },
                complete => {
                    this.fileUrl =
                        AppService.getFileUrl(complete.key) + this.imgStyle;
                    this.loading--;
                }
            );
        },
        onDelete() {
            this.file = "";
            this.fileUrl = "";
        },
        onUpload() {}
    }
};
</script>

<style lang="scss" scoped>
.helper {
    color: $--color-text-placeholder;
}
</style>
