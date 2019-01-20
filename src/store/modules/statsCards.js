import Vue from "vue";
import axios from "axios";

const state = {
  statsCards: []
};

const mutations = {
  set_stats_cards: (state, cards) => {
    state.statsCards = [...cards];
  }
};

const actions = {
  initCards: ({ commit }) => {
    axios({
      url: Vue.prototype.$baseURL + "/statscards",
      data: { fromDate: "01/15/2019", toDate: "02/18/2019" },
      method: "POST"
    })
      .then(resp => {
        commit("set_stats_cards", resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  datedStatsCards: ({ commit }, dateRange) => {
    axios({
      url: Vue.prototype.$baseURL + "/statscards",
      data: dateRange,
      method: "POST"
    })
      .then(resp => {
        commit("set_stats_cards", resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  getStatsCards: state => {
    return state.statsCards;
  }
};
export default {
  state,
  mutations,
  actions,
  getters
};
