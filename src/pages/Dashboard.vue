<template>
  <div>
    <!--Date picker -->
    <div class="datepicker">
      <el-date-picker
      v-model="date"
      format="yyyy/MM/dd"
      value-format="yyyy-MM-dd"
      type="daterange"
      size="small"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date"
      :picker-options="pickerOptions"
      >
    </el-date-picker>
  </div>
    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="stats in getStatsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>

    <!--Charts-->
    <div class="row">

      <div class="col-12">
        <chart-card title="Users behavior"
                    sub-title="24 Hours performance"
                    :chart-data="getUsersChart.data"
                    :chart-options="getUsersChart.options">
          <span slot="footer">
            <i class="ti-reload"></i> Updated 3 minutes ago
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Click
            <i class="fa fa-circle text-warning"></i> Click Second Time
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card title="Email Statistics"
                    sub-title="Last campaign performance"
                    :chart-data="getPreferenceChart.data"
                    chart-type="Pie">
          <span slot="footer">
            <i class="ti-timer"></i> Campaign set 2 days ago</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Bounce
            <i class="fa fa-circle text-warning"></i> Unsubscribe
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card title="2015 Sales"
                    sub-title="All products including Taxes"
                    :chart-data="getActivityChart.data"
                    :chart-options="getActivityChart.options">
          <span slot="footer">
            <i class="ti-check"></i> Data information certified
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Tesla Model S
            <i class="fa fa-circle text-warning"></i> BMW 5 Series
          </div>
        </chart-card>
      </div>

    </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { StatsCard, ChartCard } from "@/components/index";
import Chartist from 'chartist';
export default {
  components: {
    StatsCard,
    ChartCard
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */

  data() {
    return {
      date: null,
      pickerOptions: {
        onPick: (dateSel) => {
          if(dateSel.minDate !== null && dateSel.maxDate !== null){
            let fromDate = dateSel.minDate.toLocaleDateString();
            let toDate = dateSel.maxDate.toLocaleDateString();
            this.$store.dispatch('datedUserChart', {fromDate, toDate});
            this.$store.dispatch('datedStatsCards', {fromDate, toDate});
            this.$store.dispatch('datedActivityChart', {fromDate, toDate});
            this.$store.dispatch('datedPreferenceChart', {fromDate, toDate});

          }
        }
      }
    };
  },
computed: {
  ...mapGetters([
    'getUsersChart',
    'getStatsCards',
    'getActivityChart',
    'getPreferenceChart'
  ])
}
};
</script>
<style scoped>
.datepicker{
  text-align: right;
  margin-top: -29px;
  margin-bottom: 15px;
}

</style>
