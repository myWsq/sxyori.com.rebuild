import Vue from "vue";
import Vuex from "vuex";
import { AxiosDefault } from "./plugins/axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        me: null
    },
    mutations: {
        setMe(state, me) {
            state.me = me;
        }
    },
    actions: {
        async getMe({ commit }) {
            const data = await AxiosDefault.get("/api/auth");
            if (!data.code) {
                commit("setMe", data.body);
            }
        }
    }
});
