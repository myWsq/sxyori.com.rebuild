<template>
    <el-scrollbar>
        <div class="chat-sidebar">
            hello
        </div>
    </el-scrollbar>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/var.scss";
.chat-sidebar {
    position: fixed;
    width: $--chat-sidebar-width;
    z-index: 2;
    top: 0;
    left: $--sidebar-width;
    height: 100vh;
    background: $--background-color-base;
    border-right: $--border-base;
}
</style>
