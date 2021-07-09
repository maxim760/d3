import React, { useMemo } from "react";
import { xValue, yValue } from ".";

export const Marks = ({ data, xScale, yScale, tooltipFormat, innerHeight }) => {
  return data.map((item) => {
    return (
      <rect className="mark"
        key={item["Country code"]}
        x={xScale(xValue(item))}
        y={innerHeight - yScale(yValue(item)) }
        width={xScale.bandwidth()}
        height={yScale(yValue(item))}
      >
        <title>{xValue(item)} - {tooltipFormat(yValue(item))}</title>
      </rect>
    );
  });
};
