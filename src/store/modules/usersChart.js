import Vue from "vue";
import axios from "axios";
import Chartist from "chartist";
const state = {
  usersChart: {
    data: {
      labels: [],
      series: []
    },
    options: {
      low: 0,
      high: 1000,
      showArea: true,
      height: "245px",
      axisX: {
        showGrid: false
      },
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 3
      }),
      showLine: true,
      showPoint: false
    }
  }
};

const mutations = {
  set_user_chart: (state, chartData) => {
    const timeLabels = chartData.map(item => {
      return item.time;
    });
    const uniqueTimeLabels = timeLabels.filter((item, pos, arr) => {
      return arr.indexOf(item) == pos;
    });
    state.usersChart.data.labels = [...uniqueTimeLabels];
    const openSeries = chartData
      .filter(item => item.actiontype === "open")
      .map(item => item.value);
    const secondClickSeries = chartData
      .filter(item => item.actiontype === "secondclick")
      .map(item => item.value);
    const clickSeries = chartData
      .filter(item => item.actiontype === "click")
      .map(item => item.value);
    state.usersChart.data.series = [
      [...openSeries],
      [...secondClickSeries],
      [...clickSeries]
    ];
  }
};

const actions = {
  initUserChart: ({ commit }) => {
    axios({
      url: Vue.prototype.$baseURL + "/userchart",
      data: { fromDate: "01/15/2019", toDate: "02/18/2019" },
      method: "POST"
    })
      .then(resp => {
        commit("set_user_chart", resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  datedUserChart: ({ commit }, dateRange) => {
    axios({
      url: Vue.prototype.$baseURL + "/userchart",
      data: dateRange,
      method: "POST"
    })
      .then(resp => {
        commit("set_user_chart", resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  getUsersChart: state => {
    return state.usersChart;
  }
};
export default {
  state,
  mutations,
  actions,
  getters
};
