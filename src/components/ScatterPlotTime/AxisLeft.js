import React from "react";

export const AxisLeft = ({yScale, tickFormat, innerWidth, innerHeight, tickOffset=10}) => {
  return yScale.ticks().map((tick, i) => {
    return (
      <g
        key={i}
        className="tick"
        transform={`translate(0, ${yScale(tick)})`}
      >
        <line x1={0} x2={innerWidth} y1={0} y2={0}  />
        <text
          x={-tickOffset}
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
