import React, { useMemo } from "react";
import { xValue, yValue } from ".";

export const Marks = ({ data, xScale, yScale, tooltipFormat }) => {
  return data.map((item) => {
    return (
      <rect className="mark"
        key={item["Country code"]}
        x={0}
        y={yScale(yValue(item)) }
        width={xScale(xValue(item))}
        height={yScale.bandwidth()}
      >
        <title>{tooltipFormat(xValue(item))}</title>
      </rect>
    );
  });
};
