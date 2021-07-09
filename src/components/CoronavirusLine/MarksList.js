import { curveBasis, line } from "d3";
import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import { Context, margin } from ".";
import { throttle } from "../../utils/common/throttle";
import { Mark } from "./Mark";
import { Tooltip } from "./Tooltip";

export const MarksList = memo(
  ({ data, tooltipNumberFormat, tooltipTimeFormat }) => {
    const { xScale, xValue, yScale, yValue } = useContext(Context);

    const [activeData, setActiveData] = useState(null);
    const [activeCoords, setActiveCoords] = useState({ x: 0, y: 0 });

    const tooltipTitle = useCallback(
      (country) => {
        const countryAr = data.findByCountry(country);
        return `Total: ${yValue(
          countryAr[countryAr.length - 1]
        ).toLocaleString()}`;
      },
      [data, yValue]
    );

    const lineGenerator = useMemo(() => {
      return line()
        .curve(curveBasis)
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)));
    }, [xScale, xValue, yScale, yValue]);

    const throttled = useCallback(
      throttle((e, country) => {
        const y = ~~yScale.invert(e.clientY - margin.top);
        const x = xScale.invert(e.clientX - margin.left);
        setActiveData({ country, x, y });
        setActiveCoords({
          x: e.clientX - margin.left,
          y: e.clientY - margin.top,
        });
      }, 150),
      [setActiveData, setActiveCoords]
    );

    const updateActiveData = useCallback(
      (country) => (e) => throttled(e, country),
      [throttled]
    );

    return (
      <>
        {!!activeData && (
          <Mark
            data={data.findByCountry(activeData.country)}
            lineGenerator={lineGenerator}
            isActive
          />
        )}
        <g>
          {data.map((item, i) => (
            <Mark
              key={i}
              data={item}
              lineGenerator={lineGenerator}
              updateActiveData={updateActiveData}
            />
          ))}
        </g>
        {!!activeData && (
          <Tooltip
            activeCoords={activeCoords}
            activeData={activeData}
            tooltipFormat={{
              tooltipTimeFormat,
              tooltipNumberFormat,
              tooltipTitle,
            }}
          />
        )}
      </>
    );
  }
);
