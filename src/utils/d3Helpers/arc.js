import { arc } from "d3";

const getArc = ({
  innerRadius,
  outerRadius,
  startAngle = 0,
  endAngle = Math.PI * 2,
  padAngle = 0,
  padRadius = outerRadius
}) =>
  arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(startAngle)
    .endAngle(endAngle)
    .padAngle(padAngle)
    .padRadius(padRadius)

export const getMouthArc = ({ innerRadius, outerRadius }) =>
  getArc({
    innerRadius,
    outerRadius,
    startAngle: Math.PI / 2,
    endAngle: (Math.PI * 3) / 2,
  });

export const getPieArc = ({ radius, startAngle, endAngle, padAngle = 0 }) =>
  getArc({
    innerRadius: 0,
    outerRadius: radius,
    startAngle,
    endAngle,
    padAngle,
  });
