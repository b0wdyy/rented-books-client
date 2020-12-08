import { Book } from "@/interfaces/book";
import { User } from "@/interfaces/user";
import Axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null as User | null,
        books: [] as Book[],
        loading: false,
        formVisible: false,
        signupVisible: false,
    },
    mutations: {
        SET_LOADING: (state, payload) => (state.loading = payload),
        SET_BOOKS: (state, payload) => (state.books = payload),
        SET_LOGIN_FORM: (state, payload) => (state.formVisible = payload),
        SET_SIGNUP_FORM: (state, payload) => (state.signupVisible = payload),
    },
    actions: {
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

        setFormVisible({ commit }, payload) {
            switch (payload) {
                case "login":
                    commit("SET_LOGIN_FORM", true);
                    commit("SET_SIGNUP_FORM", false);
                    break;
                case "signup":
                    commit("SET_SIGNUP_FORM", true);
                    commit("SET_LOGIN_FORM", false);
                    break;
                default:
                    commit("SET_LOGIN_FORM", true);
            }
        },
    },
    getters: {
        user: state => state.user,
        books: state => state.books,
        loading: state => state.loading,
        formVisible: state => state.formVisible,
        signupVisible: state => state.signupVisible,
    },
});
