import React from "react";
import { getOpacity } from ".";

export const ColorLegend = ({
  colorScale,
  tickSpacing = 25,
  circleRadius = 10,
  tickTextOffset = 20,
  offsetTop = 0,
  onHover,
  hoveredValue: hoveredColor,
}) => {
  const onHoverColorLegend = (color) => () => {
    onHover(color);
  };
  return colorScale.domain().map((value, i) => {
    const color = colorScale(value);
    return (
      <g
        key={value}
        transform={`translate(0, ${i * tickSpacing + offsetTop})`}
        className="tick pointer"
        onMouseEnter={onHoverColorLegend(color)}
        onMouseLeave={onHoverColorLegend(null)}
      >
        <circle
          r={circleRadius}
          cx={0}
          cy={0}
          fill={color}
          fillOpacity={getOpacity({ hoveredColor, color, opacity: 1 })}
        />
        <rect
          x={tickTextOffset / 2}
          y={-circleRadius}
          width={tickTextOffset}
          height={circleRadius * 2}
          fill="transparent"
        />
        <text
          dx={tickTextOffset}
          dominantBaseline="middle"
          fontSize={Math.min(circleRadius * 1.1, 22)}
        >
          {value}
        </text>
      </g>
    );
  });
};
