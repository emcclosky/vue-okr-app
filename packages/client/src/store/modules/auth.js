"use strict";
import router from "../../router";
import { axiosHandler } from "../../services/axiosService";

export default {
  state: {
    userData: {},
    authorized: false,
  },
  mutations: {
    SET_USER_DATA(state, data) {
      for (let key in data) {
        localStorage.setItem(key, data[key]);
        state.userData[key] = data[key];
      }
    },
    SET_AUTHORIZED(state, data) {
      state.authorized = data;
    },
  },
  actions: {
    async updateUserData({ commit }, data) {
      commit("SET_USER_DATA", data[0]);
      return Promise.resolve("success");
    },
    async setUserData({ commit }, data) {
      commit("SET_USER_DATA", data);
      return Promise.resolve("success");
    },
    setAuthorized({ commit }, data) {
      commit("SET_AUTHORIZED", data);
    },
    async registerNewUser(_, payload) {
      try {
        const axiosParams = {
          url: "http://127.0.0.1:8000/register",
          method: "post",
          payload,
        };

        const success = await axiosHandler(axiosParams);
        // log for successes: no modal system yet
        console.log(success);
        router.push("/login");
      } catch (err) {
        throw new Error(err);
      }
    },
    async login({ commit, dispatch }, payload) {
      try {
        const axiosParams = {
          url: "http://127.0.0.1:8000/login",
          method: "post",
          payload,
        };
        const response = await axiosHandler(axiosParams);
        const userData = response.data;
        this.dispatch("setUserData", userData);
        this.dispatch("setAuthorized", true);
        router.push("/okrs");
      } catch (err) {
        if (err.response && err.response.status === 401)
          this.dispatch("setAuthorized", false);
        throw new Error(err);
      }
    },
    async logout({ commit }) {
      try {
        const axiosParams = {
          url: "http://127.0.0.1:8000/logout",
          method: "post",
        };

        await axiosHandler(axiosParams);
        localStorage.clear();
        this.dispatch("setUserData", {});
        this.dispatch("setAuthorized", false);
        router.push("/");
      } catch (err) {
        if (err.response && err.response.status === 401)
          commit("SET_AUTHORIZED", false);
        console.error("err from store logout", err);
      }
    },
    async sendPasswordReset(_, payload) {
      try {
        const axiosParams = {
          url: "http://127.0.0.1:8000/reset",
          method: "post",
          payload,
        };

        const response = await axiosHandler(axiosParams);
        return response;
      } catch (err) {
        console.error("err from store login", err);
        return err;
      }
    },
    async validateRequestToken(_, payload) {
      const { token, user } = payload;
      try {
        const axiosParams = {
          url: `http://127.0.0.1:8000/reset/${token}?user=${user}`,
          method: "get",
        };

        return await axiosHandler(axiosParams);
      } catch (err) {
        console.error("err from store login", err);
        return err;
      }
    },
    async createNewPassword(_, payload) {
      try {
        const axiosParams = {
          url: `http://127.0.0.1:8000/new-password`,
          method: "post",
          payload,
        };

        return await axiosHandler(axiosParams);
      } catch (err) {
        console.error("err from store login", err);
        return err;
      }
    },
    // Validates the current user and removes data from session storage if
    //expired
    validate({ commit }) {
      const authorized = localStorage.getItem("authorized");
      const expiration = localStorage.getItem("expiration");
      const currentDate = new Date().toISOString();
      if (authorized === "true" && expiration >= currentDate) {
        commit("SET_AUTHORIZED", true);
        return true;
      } else {
        localStorage.clear();
        commit("SET_AUTHORIZED", false);
        return false;
      }
    },
  },
};
