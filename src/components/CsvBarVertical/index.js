import React from "react";
import { useDimensions } from "../../hooks/useDimensions";
import {
  format,
  max,
  scaleBand,
  scaleLinear,
} from "d3";
import { useCountryData } from "./hooks/useCountryData";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { Marks } from "./Marks";
const csvUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

const margin = {
  top: 20,
  right: 50,
  bottom: 80,
  left: 100,
};

const xAxisLabelOffset = 65;
const siFormat = (num = 2) => format(`.${num}s`);
const xAxisTickFormat = (num) => (tickValue) =>
  siFormat(num)(tickValue).replace("G", "B");

export const yValue = (item) => item["Population"];
export const xValue = (item) => item["Country"];

export const CsvBarVertical = () => {
  const { width, height } = useDimensions();
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const data = useCountryData(csvUrl, { width, height });
  if (!data) {
    return <div>Loading...</div>;
  }

  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([0, innerHeight]);

  const xScale = scaleBand()
    .domain(data.map(xValue))
    .range([0, innerWidth])
    .paddingInner(0.3);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft yScale={yScale} tickFormat={xAxisTickFormat(2)} innerWidth={innerWidth} innerHeight={innerHeight}/>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
        />
        <text
          className="axis-label"
          x={innerWidth / 2}
          textAnchor="middle"
          y={innerHeight + xAxisLabelOffset}
        >
          Population
        </text>
        <Marks
          data={data}
          innerHeight={innerHeight}
          xScale={xScale}
          yScale={yScale}
          tooltipFormat={xAxisTickFormat(3)}
        />
      </g>
    </svg>
  );
};
