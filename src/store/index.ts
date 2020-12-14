import { Book } from "@/interfaces/book";
import { User } from "@/interfaces/user";
import qs from "querystring";
import Axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null as User | null,
        books: [] as Book[],
        token: null,
        error: null,
        loading: false,
    },
    mutations: {
        SET_USER: (state, payload) => (state.user = payload),
        SET_TOKEN: (state, payload) => (state.token = payload),
        SET_LOADING: (state, payload) => (state.loading = payload),
        SET_BOOKS: (state, payload) => (state.books = payload),
        SET_ERROR: (state, payload) => (state.error = payload),
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
                    url: `${process.env.VUE_APP_BASE_URL}/books`,
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
                    `${process.env.VUE_APP_BASE_URL}/users/login`,
                    qs.stringify(values),
                    config
                );

                commit("SET_TOKEN", data.token);
                commit("SET_USER", data.user);
                commit("SET_LOADING", false);
            } catch (e) {
                console.log(e);

                commit("SET_ERROR", e.msg);
                commit("SET_LOADING", false);
            }
        },

        logout({ commit }) {
            commit("SET_TOKEN", null);
            commit("SET_USER", null);
        },

        async addBook({ commit }, payload) {
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
                    `${process.env.VUE_APP_BASE_URL}/books`,
                    formData,
                    headers
                );

                console.log(data);
            } catch (e) {
                console.error(e);
            }
            // commit("ADD_BOOKS");
        },
    },
    getters: {
        user: state => state.user,
        books: state => state.books,
        token: state => state.token,
        loading: state => state.loading,
        error: state => state.error,
    },
});
