import React, {useEffect, useState } from "react";
import { useDimensions } from "../../hooks/useDimensions";
import { getPieArc } from "../../utils/d3Helpers/arc";
import { getData } from "../../utils/getData";
import {
  pie,
  scaleOrdinal,
  schemeSet3,
} from "d3";
const csvUrl =
  "https://gist.githubusercontent.com/maxim760/521014769058778adcd86b5888e5c71e/raw/a619c2a54d64e7b55a400393f6e1dcdd60369ebf/euro2021.csv";

const colorValue = (d) => d.nation;
const sizeValue = (d) => d.chances;

export const Pie = () => {
  const [data, setData] = useState(null);
  const { width, height, min } = useDimensions();
  const { cx, cy } = (() => ({
    cx: width / 2,
    cy: height / 2,
  }))();
  useEffect(() => {
    (async () => {
      const row = (d) => {
        d.chances = +d.chances;
        return d;
      };
      const res = await getData(csvUrl, row);
      setData(res);
    })();
  }, []);
  if (!data) {
    return <div>Loading...</div>;
  }

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(schemeSet3);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${cx}, ${cy})`}>
        {pie()
          .padAngle(0.05)
          .value(sizeValue)(data)
          .map((item) => {
            const pieArc = getPieArc({ ...item, radius: min / 2 });
            const centroid = pieArc.centroid(item);
            return (
              <React.Fragment key={item.data.nation}>
                <path
                  fill={colorScale(colorValue(item.data))}
                  d={pieArc()}
                  title="heelo"
                  stroke="white"
                  strokeWidth="2px"
                >
                  <title>{item.data.chances}%</title>
                </path>
                <text
                  fontSize={25}
                  textAnchor="middle"
                  transform={`translate(${centroid})`}
                >
                  {item.data.nation}
                </text>
              </React.Fragment>
            );
          })}
      </g>
    </svg>
  );
};
