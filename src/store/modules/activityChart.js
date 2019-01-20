import Vue from "vue";
import axios from "axios";

const state = {
  activityChart: {
    data: {
      labels: [],
      series: []
    },
    options: {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false
      },
      height: "245px"
    }
  }
};

const mutations = {
  set_activity_chart: (state, chartData) => {
    const monthLabels = chartData.map(item => {
      return item.month;
    });
    const uniqueMonthLabels = monthLabels.filter((item, pos, arr) => {
      return arr.indexOf(item) == pos;
    });
    state.activityChart.data.labels = [...uniqueMonthLabels];
    const teslaSeries = chartData
      .filter(item => item.model === "Tesla Model S")
      .map(item => item.salesAmount);
    const bmwSeries = chartData
      .filter(item => item.model === "BMW 5 Series")
      .map(item => item.salesAmount);
    state.activityChart.data.series = [[...teslaSeries], [...bmwSeries]];
  }
};

const actions = {
  initActivityChart: ({ commit }) => {
    axios({
      url: Vue.prototype.$baseURL + "/salesdata",
      data: { fromDate: "01/15/2019", toDate: "02/18/2019" },
      method: "POST"
    })
      .then(resp => {
        commit("set_activity_chart", resp.data);
      })
      .catch(err => {
        console.log(err); //error handling to be implemented
      });
  },
  datedActivityChart: ({ commit }, dateRange) => {
    axios({
      url: Vue.prototype.$baseURL + "/salesdata",
      data: dateRange,
      method: "POST"
    })
      .then(resp => {
        commit("set_activity_chart", resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  getActivityChart: state => {
    return state.activityChart;
  }
};
export default {
  state,
  mutations,
  actions,
  getters
};
