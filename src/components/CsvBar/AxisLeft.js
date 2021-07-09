import React from "react";

export const AxisLeft = ({yScale}) => {
  return yScale.domain().map((country, i) => {
    return (
      <g
        key={i}
        className="tick"
        transform={`translate(0, ${yScale(country) + yScale.bandwidth() / 2})`}
      >
        <line x1={0} x2={-10} y1={0} y2={0} strokeWidth={5} />
        <text
          x={-15}
          y={0}
          textAnchor="end"
          dominantBaseline="middle"
        >
          {country}
        </text>
      </g>
    );
  });
};
