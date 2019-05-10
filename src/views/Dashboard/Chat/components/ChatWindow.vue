<template>
    <div class="chat-window pt-1">
        <el-card v-if="cur" class="body">
            <template #header>
                {{ cur.origin }}
            </template>
            <template>
                <div id="chat-main-container">
                    <div
                        v-for="item in list"
                        :key="item.id"
                        class="item"
                        :class="{ me: item.from === 'admin' }"
                    >
                        <span>
                            {{ item.text || " " }}
                        </span>
                    </div>
                </div>
                <el-input
                    v-model="input"
                    class="input-container"
                    type="textarea"
                    :autosize="{
                        minRows: 3,
                        maxRows: 3
                    }"
                    placeholder="请输入回复内容(按下Enter键发送)"
                    @keyup.enter.native="onSend"
                ></el-input>
            </template>
        </el-card>
    </div>
</template>

<script>
import { ChatStore } from "../Chat.store";
import { ChatService } from "../Chat.service";
import shortid from "shortid";

export default {
    data() {
        return {
            input: "",
            list: [],
            ps: null
        };
    },
    computed: {
        cur() {
            return ChatStore.cur;
        }
    },
    watch: {
        cur: "fetch"
    },
    async created() {
        await this.fetch();
        this.updatePs();
    },
    methods: {
        async onSend() {
            await ChatService.send(this.cur, this.input);
            this.list.push({
                id: shortid.generate(),
                from: "admin",
                text: this.input
            });
            this.input = "";
            this.updatePs();
        },
        async fetch() {
            this.list = await ChatService.getHistory(this.cur);
        },
        updatePs() {
            this.$nextTick(() => {
                const el = document.getElementById("chat-main-container");
                el.scrollTop = el.scrollHeight + el.clientHeight;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.chat-window {
    height: calc(100vh - #{$--toolbar-height+$--footer-height});
    min-height: 500px;
    box-sizing: border-box;
    * {
        box-sizing: border-box;
    }
}
.body {
    display: flex;
    flex-direction: column;
    height: 100%;
    & /deep/ .el-card__body {
        flex-basis: 100%;
        display: flex;
        flex-direction: column;
        padding: 0;
    }
}
#chat-main-container {
    height: 80%;
    overflow: auto;
    border-bottom: $--border-base;
}
.input-container {
    padding: 1em;
    & /deep/ .el-textarea__inner {
        resize: none;
        border: none;
    }
}
.item {
    padding: 1em;

    span {
        border-radius: $--border-radius-base;
        background: $--background-color-base;
        padding: 0.5em 1em;
        display: inline-block;
    }
}

.item.me {
    text-align: right;
    span {
        background: $--color-primary;
        color: #fff;
    }
}
</style>
