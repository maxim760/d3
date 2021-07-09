import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDimensions } from "../../hooks/useDimensions";
import { getPieArc } from "../../utils/d3Helpers/arc";
import { getData } from "../../utils/getData";
import { toProportion } from "../../utils/toProportion";
import { pie } from "d3";
const csvUrl =
  'https://gist.githubusercontent.com/maxim760/9f8ab1f06fd630c649f92dd661821c78/raw/0233f10c4eb295114fc7571ef80b8dde68217ca8/cssColors.csv';

export const CsvColors = () => {
  const [data, setData] = useState(null);
  const { width, height } = useDimensions();
  const { cx, cy } = (() => ({
    cx: width / 2,
    cy: height / 2,
  }))();
  useEffect(() => {
    (async () => {
      const res = await getData(csvUrl);
      setData(res);
    })();
  }, [width, height]);
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${cx}, ${cy})`}>
        {pie()
          .value(1)(data)
          .map((item) => {
            return (
              <path
                key={item.index}
                fill={item.data["RGB hex value"]}
                d={getPieArc({ ...item, radius: height })}
              />
            );
          })}
        {/* {data.map(
          (
            { Specification: spec, Keyword: colorName, "RGB hex value": color },
            i,
            { length }
          ) => (
            <path
              key={colorName}
              fill={color}
              d={getPieArc({
                radius: width,
                startAngle: toProportion({ from: length, to: Math.PI*2, value: i}),
                endAngle: toProportion({ from: length, to: Math.PI*2, value: i+1}),
              })}
            />
          )
        )} */}
      </g>
    </svg>
  );
};
