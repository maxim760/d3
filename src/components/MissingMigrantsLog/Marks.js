import React from "react";

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  innerHeight,
  radius,
  opacity = 0.7,
}) => {
  return (
    <g className="marks">
      {data.map((item, i) => {
        const x = xValue(item);
        const y = yValue(item);
        return (
          <circle
            className="mark"
            key={i}
            opacity={opacity}
            r={radius}
            cx={xScale(x)}
            cy={yScale(y)}
          >
            <title>{tooltipFormat({ x, y })}</title>
          </circle>
        );
      })}
    </g>
  );
};
