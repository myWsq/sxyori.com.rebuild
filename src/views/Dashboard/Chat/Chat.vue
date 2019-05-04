<template>
    <div class="chat">
        <sidebar></sidebar>
        <div class="main">
            <the-toolbar class="toolbar">在线咨询管理</the-toolbar>
            <the-content>
                hello
            </the-content>
        </div>
    </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
export default {
    components: {
        Sidebar
    }
};
</script>
<style lang="scss" scoped>
@import "./assets/var.scss";

.main,
.toolbar {
    padding-left: calc(#{$--chat-sidebar-width} + 1em);
}
</style>
