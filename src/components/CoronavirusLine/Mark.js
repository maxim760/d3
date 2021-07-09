import React, { memo, useContext } from "react";
import { Context } from ".";

export const Mark = memo(({
    data,
    isActive = false,
    lineGenerator,
    updateActiveData,
}) => {
    const { colorScale, colorValue } = useContext(Context);
    const country = colorValue(data);
    return (
      <path
        className={`graph-line ${isActive ? "active" : ""}`}
        d={lineGenerator(data)}
        stroke={colorScale(country)}
        onMouseOver={!isActive ? updateActiveData(country) : undefined}
      />
    );
  }
);
