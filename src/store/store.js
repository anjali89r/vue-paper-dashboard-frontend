import Vue from "vue";
import Vuex from "vuex";
//import inventory from './modules/inventoryTable';
import logIn from "./modules/logIn";
import statsCards from "./modules/statsCards";
import usersChart from "./modules/usersChart";
import activityChart from "./modules/activityChart";
import emailChart from "./modules/emailChart";
//import * as actions from './actions';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    logIn,
    statsCards,
    usersChart,
    activityChart,
    emailChart
  }
});
