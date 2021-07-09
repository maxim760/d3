import React from "react";

import { curveCardinal, line } from "d3";
import { xValue, yValue } from ".";

export const Marks = ({
  data,
  xScale,
  yScale,
  tooltipFormat,
  innerHeight,
  radius = 10,
  opacity = 0.7,
  withCircle = false,
}) => {
  return (
    <g className="marks">
      <path
        d={line()
          .curve(curveCardinal)
          .x((d) => xScale(xValue(d)))
          .y((d) => yScale(yValue(d)))(data)}
      />
      {withCircle &&
        data.map((item, i) => {
          const y = yValue(item);
          const x = xValue(item);
          return (
            <circle
              key={i}
              opacity={opacity}
              cx={xScale(x)}
              cy={yScale(y)}
              r={radius}
            >
              <title>{tooltipFormat({ x, y })}</title>
            </circle>
          );
        })}
    </g>
  );
};
