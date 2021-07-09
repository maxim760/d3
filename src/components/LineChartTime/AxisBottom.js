import React, { useMemo } from "react";
import { isLastItem } from "../../utils/array";
import { getTickDistance } from "../../utils/getTickDistance";

export const AxisBottom = ({
  xScale,
  innerHeight,
  tickFormat,
  tickOffset = 10,
}) => {
  const { tickDistance, ticks } = useMemo(() => {
    return getTickDistance(xScale);
  }, [xScale]);
  return ticks.map((tick, i, arr) => {
    return (
      <g className="tick" key={i} transform={`translate(${xScale(tick)}, 0)`}>
        <line x1={0} x2={0} y1={innerHeight} y2={0} />
        {!isLastItem(i, arr) && (
          <text
            x={tickDistance / 2}
            y={innerHeight + tickOffset}
            dy="0.95em"
            textAnchor="middle"
          >
            {tickFormat(tick)}
          </text>
        )}
      </g>
    );
  });
};
