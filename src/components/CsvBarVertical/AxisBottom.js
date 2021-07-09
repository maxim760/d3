import React from "react";

export const AxisBottom = ({ xScale, innerHeight }) => {
  return xScale.domain().map((country, i) => {
    return (
      <g className="tick" key={i} transform={`translate(${xScale(country) + xScale.bandwidth() / 2}, 0)`}>
        <line x1={0} x2={0} y1={innerHeight}  y2={innerHeight+10} strokeWidth={5}  />
        <foreignObject
          x={-xScale.step()/2}
          y={innerHeight}
          fontSize="0.9em"
          width={xScale.step()}
          height="120"
          dy="3.50em"
          dominantBaseline="middle"
          
        >
          <p>{country}</p>
        </foreignObject>
      </g>
    );
  });
};
