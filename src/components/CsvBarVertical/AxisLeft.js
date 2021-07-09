import React from "react";

export const AxisLeft = ({yScale, tickFormat, innerWidth, innerHeight}) => {
  return yScale.ticks().map((tick, i) => {
    return (
      <g
        key={i}
        className="tick"
        transform={`translate(0, ${innerHeight - yScale(tick)})`}
      >
        <line x1={0} x2={innerWidth} y1={0} y2={0}  />
        <text
          x={-15}
          y={0}
          textAnchor="end"
          dominantBaseline="middle"
        >
          {tickFormat(tick)}
        </text>
      </g>
    );
  });
};
