<template>
  <div id="app">
    <LineChart :data="line" :lineWidth="lineWidth" />
    <b-field label="Line width">
      <b-slider
        size="is-small"
        rounded
        :min="1"
        :max="20"
        v-model="lineWidth"
      ></b-slider>
    </b-field>
  </div>
</template>

<script>
import LineChart from "./charts/LineChart.vue";

export default {
  name: "App",
  components: {
    LineChart,
  },
  data() {
    return {
      line: [
        {x: -4, y: 16},
        {x: -3, y: 9}, 
        {x: -2, y: 4}, 
        {x: -1, y: 1}, 
        {x: 0, y: 0},
        {x: 1, y: 1},
        {x: 2, y: 4},
        {x: 3, y: 9},
        {x: 4, y: 16}
      ],
      lineWidth: 1,
    }
  }
};
</script>

<style></style>
