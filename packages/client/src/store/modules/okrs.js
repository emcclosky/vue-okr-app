import router from "../../router";
import { axiosHandler } from "../../services/axiosService";

export default {
  state: {
    allOkrData: [],
    currentOkrData: {},
  },
  mutations: {
    SET_ALL_OKR_DATA(state, data) {
      state.allOkrData = data;
    },
    SET_OKR_DATA(state, data) {
      state.currentOkrData = data;
    },
    ADD_KEY_RESULT(state, data) {
      state.allOkrData.forEach((okr) => {
        console.log("key results", okr.key_results);
        if (okr.id === data.objectiveId) {
          okr.key_results.push(data);
        }
      });
    },
  },
  actions: {
    setAllOkrData({ commit }, data) {
      commit("SET_ALL_OKR_DATA", data);
    },
    setOkrData({ commit }, data) {
      commit("SET_OKR_DATA", data);
    },
    async getOkrs({ commit }) {
      try {
        const axiosParams = {
          url: "http://127.0.0.1:8000/okrs",
          method: "get",
        };

        const response = await axiosHandler(axiosParams);
        const okrData = response.data;
        commit("SET_ALL_OKR_DATA", okrData);
      } catch (err) {
        console.log("error from getOkrs action", err);
      }
    },
    async getOkr({ commit }, payload) {
      const okrId = payload;
      try {
        const axiosParams = {
          url: `http://127.0.0.1:8000/okrs/okr/${okrId}`,
          method: "get",
        };

        const okrData = await axiosHandler(axiosParams);
        commit("SET_OKR_DATA", okrData.data[0]);
      } catch (err) {
        console.log("error from getOkr action", err);
      }
    },
    async createOkr({ dispatch }, payload) {
      try {
        const axiosParams = {
          url: `http://127.0.0.1:8000/okrs/okr`,
          method: "post",
          payload,
        };
        await axiosHandler(axiosParams);
        dispatch("getOkrs");

        router.push("/okrs");
      } catch (err) {
        console.log("error from createOkr action", err);
      }
    },
    async deleteOkr({ commit }, payload) {
      const okrId = payload;
      try {
        const axiosParams = {
          url: `http://127.0.0.1:8000/okrs/okr/${okrId}`,
          method: "delete",
        };

        const okrs = await axiosHandler(axiosParams);
        commit("SET_ALL_OKR_DATA", okrs.data);
      } catch (err) {
        console.log("error from deleteOkr action", err);
      }
    },
    async editOkr(_, payload) {
      const okrId = payload.id;
      try {
        const axiosParams = {
          url: `http://127.0.0.1:8000/okrs/okr/${okrId}`,
          method: "put",
          payload,
        };

        await axiosHandler(axiosParams);
      } catch (err) {
        console.log("error from editOkr action", err);
      }
    },
    async createKeyResult({ commit }, payload) {
      try {
        const axiosParams = {
          url: `http://127.0.0.1:8000/key-results/key-result`,
          method: "post",
          payload,
        };
        await axiosHandler(axiosParams);
        commit("ADD_KEY_RESULT", payload);
        return Promise.resolve("success");
      } catch (err) {
        console.log("error from createOkr action", err);
      }
    },
  },
};
