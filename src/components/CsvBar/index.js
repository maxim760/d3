import React from "react";
import { useDimensions } from "../../hooks/useDimensions";
import { format, max, scaleBand, scaleLinear } from "d3";
import { useCountryData } from "./hooks/useCountryData";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { Marks } from "./Marks";
const csvUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

const margin = {
  top: 20,
  right: 30,
  bottom: 65,
  left: 225,
};

const xAxisLabelOffset = 50;
const siFormat = (num = 2) => format(`.${num}s`);
const xAxisTickFormat = (num) => (tickValue) =>
  siFormat(num)(tickValue).replace("G", "B");

export const yValue = (item) => item["Country"];
export const xValue = (item) => item["Population"];

export const CsvBar = () => {
  const { width, height } = useDimensions();
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const data = useCountryData(csvUrl, { width, height });
  if (!data) {
    return <div>Loading...</div>;
  }

  const yScale = scaleBand()
    .paddingInner(0.15)
    .domain(data.map(yValue))
    .range([0, innerHeight]);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft yScale={yScale} />
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat(2)}
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
          xScale={xScale}
          yScale={yScale}
          tooltipFormat={xAxisTickFormat(3)}
        />
      </g>
    </svg>
  );
};
