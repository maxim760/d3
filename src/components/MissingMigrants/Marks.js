import React from "react";

export const Marks = ({
  binnedData,
  xScale,
  yScale,
  tooltipFormat,
  innerHeight,
  opacity = 0.7,
}) => {
  return (
    <g className="marks">
      
      {binnedData.map(({ y, x0, x1 }, i) => {
        return (
          <rect
            className="mark"
            key={i}
            opacity={opacity}
            width={xScale(x1) - xScale(x0) }
            height={innerHeight - yScale(y)}
            x={xScale(x0)}
            y={yScale(y)}
          >
            <title>{tooltipFormat({ x: x0, y })}</title>
          </rect>
        );
      })}
    </g>
  );
};
