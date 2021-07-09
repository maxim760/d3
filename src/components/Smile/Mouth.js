import React from "react";
import { getMouthArc } from "../../utils/d3Helpers/arc";

export const Mouth = ({ radius, offsetY }) => {
  const mouthArc = getMouthArc({
    innerRadius: radius * (9 / 16),
    outerRadius: radius * (10 / 16),
  });
  return (
    <g transform={`translate(0, ${offsetY})`}>
      <path d={mouthArc()} />
    </g>
  );
};
