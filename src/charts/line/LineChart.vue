<template>
  <svg :viewBox="viewBox">
    <g :transform="transforms.chartArea">
      <path :d="line" :style="style" />
      <g
        v-if="options.xAxis"
        v-axis:[options.xAxis.position]="xScale"
        :transform="transforms.xAxis"
      />
      <g
        v-if="options.yAxis"
        v-axis:[options.yAxis.position]="yScale"
        :transform="transforms.yAxis"
      />
    </g>
  </svg>
</template>

<script>
  import * as d3 from "d3";
  import { AXIS_POSITIONS } from "../chartOptions";
  import defaults from "./lineChartDefaults";
  import merge from "lodash/merge";

  export default {
    name: "LineChart",
    props: {
      data: Array,
      title: String,
      width: Number,
      height: Number,
      margin: Object,
      curve: String,
      lineStyle: Object,
      xAxis: Object,
      yAxis: Object,
    },
    computed: {
      options() {
        return merge({}, defaults, this.$props);
      },
      chartHeight() {
        return (
          this.options.height -
          this.options.margin.top -
          this.options.margin.bottom
        );
      },
      chartWidth() {
        return (
          this.options.width -
          this.options.margin.left -
          this.options.margin.right
        );
      },
      line() {
        return d3
          .line()
          .curve(d3[this.options.curve])
          .x((d) => this.xScale(d.x))
          .y((d) => this.yScale(d.y))(this.options.data);
      },
      style() {
        return {
          stroke: this.options.lineStyle.color,
          strokeWidth: this.options.lineStyle.width + "px",
        };
      },
      transforms() {
        return {
          chartArea: `translate(${this.options.margin.left}, ${this.options.margin.top})`,
          xAxis:
            this.options.xAxis.position === AXIS_POSITIONS.bottom
              ? `translate(0, ${this.chartHeight})`
              : "",
          yAxis:
            this.options.yAxis.position === AXIS_POSITIONS.right
              ? `translate(${this.chartWidth}, 0)`
              : "",
        };
      },
      viewBox() {
        return `0 0 ${this.options.width} ${this.options.height}`;
      },
      xScale() {
        return d3
          .scaleLinear()
          .domain(d3.extent(this.options.data, (d) => d.x))
          .range([0, this.chartWidth]);
      },
      yScale() {
        return d3
          .scaleLinear()
          .domain(d3.extent(this.options.data, (d) => d.y))
          .range([this.chartHeight, 0]);
      },
    },
  };
</script>

<style scoped>
  path {
    fill: none;
  }
</style>
