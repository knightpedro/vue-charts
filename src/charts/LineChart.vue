<template>
  <div class="container">
    <svg :viewBox="viewBox">
      <g :transform="transforms.chartArea">
        <path :d="line" :style="style" />
        <g
          v-if="xAxis"
          v-axis:[xAxis.position]="xScale"
          :transform="transforms.xAxis"
        >
          <text>{{ xAxis.label }}</text>
        </g>
        <g
          v-if="yAxis"
          v-axis:[yAxis.position]="yScale"
          :transform="transforms.yAxis"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import { AXIS_POSITIONS, HEIGHT, WIDTH, MARGINS } from "./config";

export default {
  name: "LineChart",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    lineWidth: {
      type: Number,
      default: 1,
    },
    margin: {
      type: Object,
      default: () => MARGINS,
    },
    xAxis: {
      type: Object,
      default: () => ({
        position: AXIS_POSITIONS.bottom,
        label: "X Axis",
      }),
    },
    yAxis: {
      type: Object,
      default: () => ({
        position: AXIS_POSITIONS.left,
        label: "Y Axis",
      }),
    },
  },
  data() {
    return {
      line: "",
    };
  },
  computed: {
    chartHeight() {
      return this.height - this.margin.top - this.margin.bottom;
    },
    chartWidth() {
      return this.width - this.margin.left - this.margin.right;
    },
    style() {
      return {
        strokeWidth: this.lineWidth + "px",
      };
    },
    transforms() {
      return {
        chartArea: `translate(${this.margin.left}, ${this.margin.top})`,
        xAxis:
          this.xAxis.position === AXIS_POSITIONS.bottom
            ? `translate(0, ${this.chartHeight})`
            : "",
        yAxis:
          this.yAxis.position === AXIS_POSITIONS.right
            ? `translate(${this.chartWidth}, 0)`
            : "",
      };
    },
    viewBox() {
      return `0 0 ${this.width} ${this.height}`;
    },
    xScale() {
      return d3
        .scaleLinear()
        .domain(d3.extent(this.data, (d) => d.x))
        .range([0, this.chartWidth]);
    },
    yScale() {
      return d3
        .scaleLinear()
        .domain(d3.extent(this.data, (d) => d.y))
        .range([this.chartHeight, 0]);
    },
  },
  created() {
    this.width = WIDTH;
    this.height = HEIGHT;
  },
  mounted() {
    this.calculatePath();
  },
  methods: {
    calculatePath() {
      const path = d3
        .line()
        .x((d) => this.xScale(d.x))
        .y((d) => this.yScale(d.y));
      this.line = path(this.data);
    },
  },
};
</script>

<style scoped>
svg {
  margin: 25px;
}
path {
  fill: none;
  stroke: #76bf8a;
}
</style>
