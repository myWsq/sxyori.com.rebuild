<template>
    <div class="chat">
        <transition name="transform-in-left">
            <sidebar v-if="cur"></sidebar>
        </transition>
        <div class="main" :class="{ active: cur }">
            <the-toolbar class="toolbar" :class="{ active: cur }"
                >在线咨询管理
            </the-toolbar>
            <the-content>
                <chat-window v-if="cur" ref="chatWindow"></chat-window>
                <img
                    v-else
                    src="./assets/mailbox-empty.svg"
                    class="empty-img"
                />
            </the-content>
        </div>
    </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import ChatWindow from "./components/ChatWindow.vue";

import { ChatService } from "./Chat.service.js";
import { ChatStore } from "./Chat.store";
export default {
    components: {
        Sidebar,
        ChatWindow
    },
    computed: {
        cur() {
            return ChatStore.cur;
        }
    },
    async created() {
        const loading = this.$loading({
            fullscreen: true
        });
        ChatService.init((message, conversation) => {
            this.onMessage(message, conversation);
        });
        loading.close();
    },
    methods: {
        /** 收到新消息 */
        onMessage(message, conversation) {
            this.$notify.info({
                title: `来自${message.from}的新消息`,
                message: message.text
            });
            this.$set(ChatStore.conversations, conversation.id, conversation);
            if (!this.cur) {
                ChatStore.cur = conversation;
            }
            const chatWindow = this.$refs.chatWindow;
            if (conversation.id === (chatWindow.cur && chatWindow.cur.id)) {
                chatWindow.list.push(message);
                chatWindow.updatePs();
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import "./assets/var.scss";

.main,
.toolbar {
    transition: 0.3s;
    padding-left: 1em;
    &.active {
        padding-left: calc(#{$--chat-sidebar-width} + 1em);
    }
}

.translate-in-left-enter,
.translate-in-left-leave-to {
    opacity: 0;
}

.translate-in-left-enter-active,
.translate-in-left-leave-active {
    transition: 0.3s;
}
.empty-img {
    width: 300px;
    position: fixed;
    top: 30vh;
    left: 50vw;
    transform: translate(-50%);
}
</style>
