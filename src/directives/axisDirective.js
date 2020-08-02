import * as d3 from "d3";
import { AXIS_POSITIONS } from "../charts/chartOptions";

const axisGenerators = {
  [AXIS_POSITIONS.top]: d3.axisTop,
  [AXIS_POSITIONS.bottom]: d3.axisBottom,
  [AXIS_POSITIONS.left]: d3.axisLeft,
  [AXIS_POSITIONS.right]: d3.axisRight,
};

export default function (el, binding) {
  const position = binding.arg;
  const scale = binding.value;
  const axisGenerator = axisGenerators[position];
  d3.select(el).call(axisGenerator(scale));
}
