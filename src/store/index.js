import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import app from "./app/index";

//Blog posts
import posts from "./Posts/posts";

//Cities
import cities from "./Cities/cities";

//Users
import users from "./Users/users";

const initialState = {
  posts: { ...posts.state },
  cities: { ...cities.state },
  users: { ...users.state },
};

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  modules: {
    app,
    posts,
    cities,
    users,
  },
  state: {},
  mutations: {
    RESET_STATE(state) {
      sessionStorage.clear();
      Object.keys(state).forEach((key) => {
        Object.assign(state[key], initialState[key]);
      });
    },
  },
  strict: process.env.DEV,
  actions: {},
  getters: {},
});
