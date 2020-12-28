import { Book } from "@/interfaces/book";
import { User } from "@/interfaces/user";
import qs from "querystring";
import Axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import { FlashMessage } from "@/interfaces/flashMessage";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null as User | null,
        books: [] as Book[],
        token: null,
        error: null,
        loading: false,
        flashMessage: null as FlashMessage | null,
    },
    mutations: {
        SET_USER: (state, payload) => (state.user = payload),
        SET_TOKEN: (state, payload) => (state.token = payload),
        SET_LOADING: (state, payload) => (state.loading = payload),
        SET_BOOKS: (state, payload) => (state.books = payload),
        SET_ERROR: (state, payload) => (state.error = payload),
        SET_FLASH: (state, payload) => (state.flashMessage = payload),
    },
    actions: {
        setError({ commit }, payload) {
            commit("SET_ERROR", payload);
        },

        async fetchBooks({ commit }, { token, _id }) {
            commit("SET_LOADING", true);

            try {
                const { data } = await Axios.request({
                    method: "GET",
                    url: `api.bowdy.dev/api/v1/books`,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        user_id: _id,
                    },
                });

                commit("SET_BOOKS", data.data);
            } catch (error) {
                console.log(error.message);
            }
            commit("SET_LOADING", false);
        },

        async loginUser({ commit }, payload) {
            commit("SET_LOADING", true);

            const values = {
                username: payload.username,
                password: payload.password,
            };
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };

            try {
                const { data } = await Axios.post(
                    `api.bowdy.dev/api/v1/users/login`,
                    qs.stringify(values),
                    config
                );
                commit("SET_FLASH", { type: "success", message: data.msg });

                setTimeout(() => {
                    commit("SET_FLASH", null);
                }, 3000);

                commit("SET_TOKEN", data.token);
                commit("SET_USER", data.user);
                commit("SET_LOADING", false);
            } catch (e) {
                console.log(e.msg);
                commit("SET_FLASH", { type: "error", message: e.msg });

                setTimeout(() => {
                    commit("SET_FLASH", null);
                }, 3000);

                commit("SET_ERROR", e.msg);
                commit("SET_LOADING", false);
            }
        },

        logout({ commit }) {
            commit("SET_TOKEN", null);
            commit("SET_USER", null);
            commit("SET_FLASH", {
                type: "success",
                message: "User successfully logged out.",
            });

            setTimeout(() => {
                commit("SET_FLASH", null);
            }, 3000);
        },

        async addBook({ commit }, payload) {
            commit("SET_LOADING", true);
            const formData = new FormData();
            formData.append("title", payload.title);
            formData.append("description", payload.description);
            formData.append("image", payload.fileInput);
            formData.append("user_id", payload.userId);

            const headers = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${payload.token}`,
                },
            };
            try {
                const { data } = await Axios.post(
                    `api.bowdy.dev/api/v1/books`,
                    formData,
                    headers
                );
                commit("SET_FLASH", { type: "success", message: data.msg });

                setTimeout(() => {
                    commit("SET_FLASH", null);
                }, 3000);

                commit("SET_LOADING", false);
            } catch (e) {
                console.error(e);
                commit("SET_FLASH", { type: "error", message: e.msg });
                setTimeout(() => {
                    commit("SET_FLASH", null);
                }, 3000);
                commit("SET_LOADING", false);
            }
        },
    },
    getters: {
        user: state => state.user,
        books: state => state.books,
        token: state => state.token,
        loading: state => state.loading,
        error: state => state.error,
        flashMessage: state => state.flashMessage,
    },
});
