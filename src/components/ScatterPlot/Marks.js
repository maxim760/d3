import React from "react";
import { getOpacity } from ".";

export const Marks = ({
  data,
  xScale,
  xValue,
  yScale,
  yValue,
  colorScale,
  colorValue,
  hoveredValue: hoveredColor,
  tooltipFormat,
  innerHeight,
  radius = 10,
  opacity = 1,
}) => {
  return data.map((item, i) => {
    const y = yValue(item);
    const x = xValue(item);
    const color = colorValue(item);
    const fill = colorScale(color)
    return (
      <circle
        key={i}
        opacity={opacity}
        cx={xScale(x)}
        cy={innerHeight - yScale(y)}
        r={radius}
        fill={fill}
        opacity={getOpacity({hoveredColor, opacity,color: fill})}
      >
        <title>{tooltipFormat({ x, y, color })}</title>
      </circle>
    );
  });
};
