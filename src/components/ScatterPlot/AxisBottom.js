import React from "react";

export const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 10 }) => {
  return xScale.ticks().map((tick, i) => {
    return (
      <g className="tick" key={i} transform={`translate(${xScale(tick)}, 0)`}>
        <line x1={0} x2={0} y1={innerHeight}  y2={0}  />
        <text
          x={0}
          y={innerHeight + tickOffset}
          dy="0.95em"
          textAnchor="middle"
        >
          {tickFormat(tick)}
        </text>
      </g>
    );
  });
};
