<template>
    <el-scrollbar>
        <div class="chat-sidebar">
            <div
                v-for="(item, k) in list"
                :key="k"
                :class="{ active: item.id === cur.id }"
                to="/"
                class="item"
                @click="onSelect(item)"
            >
                <el-row type="flex" justify="space-between">
                    <h1>{{ item.origin }}</h1>
                    <label>{{ $day(item.lastMessageAt).fromNow() }}</label>
                </el-row>
                <p>{{ item.lastMessage && item.lastMessage.text }}</p>
            </div>
        </div>
    </el-scrollbar>
</template>

<script>
import { ChatStore } from "../Chat.store.js";
export default {
    computed: {
        list() {
            return ChatStore.conversations;
        },
        cur() {
            return ChatStore.cur;
        }
    },
    methods: {
        onSelect(item) {
            ChatStore.cur = item;
        }
    }
};
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
    background: #efefef;
    border-right: $--border-base;
}
.item {
    box-sizing: border-box;
    padding: 1em;
    width: 100%;
    text-decoration: none;
    background: #fbfbfb;
    border-bottom: $--border-base;
    cursor: pointer;
    h1 {
        font-size: 1rem;
        font-weight: 400;
        color: $--color-text-primary;
    }
    label {
        font-size: 0.8rem;
        color: $--color-text-placeholder;
    }
    p {
        margin-bottom: 0;
        color: $--color-text-secondary;
    }
}
</style>
