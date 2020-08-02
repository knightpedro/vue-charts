<template>
  <div class="container">
    <LineChart :data="line" :lineStyle="lineStyle" />
    <b-field label="Line width">
      <b-slider size="is-small" rounded :min="1" :max="20" v-model="lineWidth"></b-slider>
    </b-field>
  </div>
</template>

<script>
  import LineChart from "../charts/line/LineChart.vue";
  import { parabola } from "../data";

  export default {
    name: "LineChartPresenter",
    components: {
      LineChart,
    },
    data() {
      return {
        line: parabola,
        lineWidth: 1,
      };
    },
    computed: {
      lineStyle() {
        return {
          width: this.lineWidth,
        };
      },
    },
  };
</script>

<style scoped>
</style>