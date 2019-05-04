<template>
    <div>
        <aside>
            <the-sidebar-vue></the-sidebar-vue>
        </aside>
        <main>
            <div class="app-content">
                <router-view></router-view>
            </div>
            <footer>
                <div class="app-content">
                    footer
                </div>
            </footer>
        </main>
    </div>
</template>

<script>
import TheSidebarVue from "./components/TheSidebar.vue";
export default {
    components: {
        TheSidebarVue
    }
};
</script>

<style lang="scss">
#app {
    background: $--background-color-base;
}

aside {
    width: $--sidebar-width;
    height: 100vh;
    overflow-y: auto;
    position: fixed;
    top: 0;
    z-index: 2;
}
main {
    box-sizing: border-box;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-left: $--sidebar-width;
    .app-content {
        width: $--body-width;
        margin: 0 auto;
        flex: 1;
    }
}

footer {
    height: $--footer-height;
    display: flex;
    justify-content: center;
    align-items: center;
    .app-content {
        max-width: $--body-width;
    }
}
</style>
