import React from "react";

export const AxisBottom = ({ xScale, innerHeight, tickFormat }) => {
  return xScale.ticks().map((tick, i) => {
    return (
      <g className="tick" key={i} transform={`translate(${xScale(tick)}, 0)`}>
        <line x1={0} x2={0} y1={0} y2={innerHeight}  />
        <text
          x={0}
          y={innerHeight}
          fontSize="0.9em"
          dy="0.95em"
          textAnchor="middle"
        >
          {tickFormat(tick)}
        </text>
      </g>
    );
  });
};
