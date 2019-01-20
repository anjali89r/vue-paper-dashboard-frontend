import Vue from "vue";
import axios from "axios";
const state = {
  preferencesChart: {
    data: {
      labels: [],
      series: []
    },
    options: {}
  }
};

const mutations = {
  set_preference_chart: (state, chartData) => {
    const seriesVal = chartData.map(item => {
      return item.percentageValue;
    });
    const percentVal = seriesVal.map(item => {
      return item + "%";
    });
    state.preferencesChart.data.labels = [...percentVal];
    state.preferencesChart.data.series = [...seriesVal];
  }
};

const actions = {
  initPreferenceChart: ({ commit }) => {
    axios({
      url: Vue.prototype.$baseURL + "/emaildata",
      data: { fromDate: "01/15/2019", toDate: "02/18/2019" },
      method: "POST"
    })
      .then(resp => {
        commit("set_preference_chart", resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  datedPreferenceChart: ({ commit }, dateRange) => {
    axios({
      url: Vue.prototype.$baseURL + "/emaildata",
      data: dateRange,
      method: "POST"
    })
      .then(resp => {
        commit("set_preference_chart", resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  getPreferenceChart: state => {
    return state.preferencesChart;
  }
};
export default {
  state,
  mutations,
  actions,
  getters
};
