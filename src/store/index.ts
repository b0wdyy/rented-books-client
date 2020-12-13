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
        error: null,
        loading: false,
    },
    mutations: {
        SET_USER: (state, payload) => (state.user = payload),
        SET_LOADING: (state, payload) => (state.loading = payload),
        SET_BOOKS: (state, payload) => (state.books = payload),
        SET_ERROR: (state, payload) => (state.error = payload),
    },
    actions: {
        setError({commit}, payload) {
            commit("SET_ERROR", payload);
        },

        async fetchBooks({ commit }) {
            commit("SET_LOADING", true);

            try {
                const { data } = await Axios.get(
                    `${process.env.VUE_APP_BASE_URL}/books`,
                    {
                        method: "GET",
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                        },
                    }
                );

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
                commit("SET_USER", data);
                commit("SET_LOADING", false);
            } catch (e) {
                console.log(e);
                commit("SET_ERROR", e.msg);
                commit("SET_LOADING", false);
            }
        },

        logout({ commit }) {
            commit("SET_USER", null);
        },
    },
    getters: {
        user: state => state.user,
        books: state => state.books,
        loading: state => state.loading,
        error: state => state.error,
    },
});
