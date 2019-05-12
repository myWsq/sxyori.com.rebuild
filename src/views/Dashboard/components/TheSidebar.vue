<template>
    <div class="the-sidebar">
        <ul class="pa-0 ma-0">
            <li>
                <router-link
                    v-for="(item, i) in config"
                    :key="i"
                    class="router-link text-center"
                    :to="`/dashboard/${item.path}`"
                    ><i :class="item.icon"></i
                ></router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { TheSidebarConfig } from "./TheSidebarConfig.js";
export default {
    computed: {
        config() {
            return TheSidebarConfig;
        }
    }
};
</script>

<style lang="scss" scoped>
.the-sidebar {
    background: $--color-white;
    min-height: 100%;
    border-right: $--border-base;
}
ul {
    list-style: none;
}
.router-link {
    font-weight: 500;
    font-size: 1.3em;
    box-sizing: border-box;
    width: 100%;
    line-height: $--sidebar-width;
    display: inline-block;
    text-decoration: none;
    color: $--color-text-regular;
    transition: $--all-transition;
    &:hover {
        background: $--background-color-base;
    }
    &.router-link-active {
        color: $--color-primary;
        background: $--background-color-base;
    }
}
</style>
