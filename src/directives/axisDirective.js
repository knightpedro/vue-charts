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
  const { scale, width, height } = binding.value;
  const axisGenerator = axisGenerators[position];
  let translation = '';
  if (position === AXIS_POSITIONS.bottom) {
    translation = `translate(0, ${height})`
  }
  else if (position === AXIS_POSITIONS.right) {
    translation = `translate(${width}, 0)`
  }
  d3.select(el).call(axisGenerator(scale)).attr('transform', translation)
}
