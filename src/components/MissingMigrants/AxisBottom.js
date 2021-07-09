import React, { useMemo } from "react";
import {getTickDistance} from "../../utils/getTickDistance"
import {isLastItem} from "../../utils/array"

export const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 10, hideLastTick = false, center = false }) => {
  
  const { tickDistance, ticks } = useMemo(() => {
    const { ticks, tickDistance } = getTickDistance(xScale);
    return {ticks, tickDistance}
  }, [xScale]);

  return ticks.map((tick, i, array) => {
    const isHideText = isLastItem(i, array) && hideLastTick
    return (
      <g className="tick" key={i} transform={`translate(${xScale(tick)}, 0)`}>
        <line x1={0} x2={0} y1={innerHeight}  y2={0}  />
        {!isHideText && <text
          x={center ? tickDistance / 2 : 0}
          y={innerHeight + tickOffset}
          dy="0.95em"
          textAnchor="middle"
        >
          {tickFormat(tick)}
        </text>}
      </g>
    );
  });
};
