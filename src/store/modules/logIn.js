import Vue from "vue";
import axios from "axios";

const state = {
  status: "",
  token: localStorage.getItem("token") || "",
  logerror: false
};

const mutations = {
  auth_success: (state, token) => {
    state.status = "success";
    state.token = token;
    state.logerror = false;
  },
  auth_fail: (state, condition) => {
    state.logerror = condition;
  },
  logout: state => {
    state.status = "";
    state.token = "";
  }
};

const actions = {
  login: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      axios({
        url: Vue.prototype.$baseURL + "/login",
        data: user,
        method: "POST"
      })
        .then(resp => {
          if (resp.data) {
            const token = resp.data;
            localStorage.setItem("token", token);
            commit("auth_success", token);
            resolve(resp);
          } else {
            commit("auth_fail", true);
          }
        })
        .catch(err => {
          //commit("auth_error");
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit("logout");
      localStorage.removeItem("token");
      resolve().catch(err => {
        reject(err);
      });
    });
  }
};

const getters = {
  isLoggedIn: state => {
    return state.status === "success";
  },
  logError: state => state.logerror
};

export default {
  state,
  mutations,
  actions,
  getters
};
