<template>
    <el-row type="flex" justify="space-between" class="toolbar" align="middle">
        <h3><slot></slot></h3>
        <el-link type="danger" icon="q-icon-logout" @click="onLogout"
            >注销</el-link
        >
    </el-row>
</template>

<script>
export default {
    name: "TheToolbar",
    methods: {
        onLogout() {
            this.$store.commit("setMe", null);
            this.$router.push("/");
            localStorage.removeItem("token");
        }
    }
};
</script>

<style lang="scss" scoped>
.toolbar {
    padding: 0 1em;
    box-shadow: $--box-shadow-base;
    height: $--toolbar-height;
    background: $--color-white;
    position: fixed;
    top: 0;
    left: $--sidebar-width;
    right: 0;
    z-index: 1;
    min-width: $--body-width;
}
</style>
