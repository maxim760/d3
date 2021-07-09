import React, { useContext } from "react";
import { Context } from ".";

const tooltipOffset = 30;

const offsetNum = 1.2;
const textOffset = (arg) => arg * offsetNum + "em";

const xPart = 1 / 7;

export const Tooltip = ({
  activeCoords,
  activeData,
  tooltipFormat: { tooltipNumberFormat, tooltipTimeFormat, tooltipTitle },
}) => {
  const { innerWidth, innerHeight, colorScale } = useContext(Context);
  const offsetY =
    activeCoords.y < Math.max(tooltipOffset, innerHeight / 4)
      ? tooltipOffset + 10
      : -tooltipOffset;
  const textAnchor =
    activeCoords.x < xPart * innerWidth
      ? "start"
      : activeCoords.x > (1 - xPart) * innerWidth
      ? "end"
      : "middle";
  return (
    <g
      className="tooltip"
      transform={`translate(${activeCoords.x}, ${activeCoords.y})`}
    >
      <circle r={5} fill={colorScale(activeData.country)} />
      <g transform={`translate(0, ${offsetY})`}>
        <text dy={offsetY < 0 ? textOffset(-2) : 0} textAnchor={textAnchor}>
          {activeData.country}
        </text>
        <text
          dy={offsetY < 0 ? textOffset(-1) : textOffset(1)}
          textAnchor={textAnchor}
        >
          {tooltipTimeFormat(activeData.x)} -{" "}
          {tooltipNumberFormat(activeData.y)} died
        </text>
        <text dy={offsetY < 0 ? 0 : textOffset(2)} textAnchor={textAnchor}>
          {tooltipTitle(activeData.country)}
        </text>
      </g>
    </g>
  );
};
