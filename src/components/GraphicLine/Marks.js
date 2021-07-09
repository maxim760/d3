import React from "react";
import { xValue, yValue } from ".";

export const Marks =  ({ data, xScale, yScale, tooltipFormat, innerHeight, radius=10, opacity=0.7 }) => {
  return data.map((item, i) => {
    const y = yValue(item)
    const x = xValue(item)
    return (
      <circle
        className="mark"
        key={i}
        opacity={opacity}
        cx={xScale(x)}
        cy={innerHeight - yScale(y)}
        r={radius}
      >
        <title>{tooltipFormat({x,y})}</title>
      </circle>
    );
  });
};
