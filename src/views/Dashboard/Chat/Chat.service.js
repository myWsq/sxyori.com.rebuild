import { Realtime, Event, TextMessage } from "leancloud-realtime";
import { ChatStore } from "./Chat.store";
const realtime = new Realtime({
    appId: "1CvE26OkPOnyKgl9ERfW0YWK-gzGzoHsz",
    appKey: "8DbXF8lP1zRqNTcVHKEAN9Uw"
});

export const ChatService = {
    async init(onMessage) {
        const ins = await realtime.createIMClient("admin");
        ins.on(Event.MESSAGE, (message, conversation) => {
            this.pipe(conversation);
            onMessage(message, conversation);
        });
        const conversations = await ins
            .getQuery()
            .limit(20)
            .find();
        conversations.forEach(item => {
            this.pipe(item);
            ChatStore.conversations[item.id] = item;
        });
        ChatStore.conversations = { ...ChatStore.conversations };
        ChatStore.cur = conversations[0];
    },
    async send(conversation, text) {
        return conversation.send(new TextMessage(text));
    },
    async getHistory(conversation) {
        return conversation.queryMessages();
    },
    async pipe(conversation) {
        conversation.members.some(item => {
            if (item !== "admin") {
                conversation.origin = item;
                return true;
            }
        });
    }
};
