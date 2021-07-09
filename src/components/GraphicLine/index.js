import React from "react";
import { useDimensions } from "../../hooks/useDimensions";
import { extent, format, scaleLinear } from "d3";
import { useData } from "./hooks/useData";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { Marks } from "./Marks";
const csvUrl =
  "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv";

const margin = {
  top: 20,
  right: 50,
  bottom: 80,
  left: 100,
};


const axisLabel = {
  x: {
    offset: 65,
    title: "Sepal Length",
  },
  y: {
    offset: 53,
    title: "Sepal Width"
  }
};
export const xValue = (item) => item["sepal_length"];
export const yValue = (item) => item["sepal_width"];
const siFormat = (num = 2) => format(`.${num}s`);
const xAxisTickFormat = (num) => (tickValue) =>
  siFormat(num)(tickValue).replace("G", "B");
const tooltipTickFormat = (num) => ({ x, y }) => {
  const tickFormat = xAxisTickFormat(num)
  return `${axisLabel.x.title} - ${tickFormat(x)}\n${axisLabel.y.title} - ${tickFormat(y)}`
}

export const GraphicLine = () => {
  const { width, height } = useDimensions();
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const data = useData(csvUrl);
  if (!data) {
    return <div>Loading...</div>;
  }

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth]).nice()

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]).nice()

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft
          yScale={yScale}
          tickFormat={xAxisTickFormat(2)}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          tickOffset={15}
        />
        <AxisBottom
          tickOffset={12}
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat(2)}
        />
        <text
          className="axis-label"
          x={innerWidth / 2}
          textAnchor="middle"
          y={innerHeight + axisLabel.x.offset}
        >
          {axisLabel.x.title}
        </text>
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-axisLabel.y.offset},${innerHeight / 2}) rotate(-90)`}
        >
          {axisLabel.y.title}
        </text>
        <Marks
          data={data}
          innerHeight={innerHeight}
          xScale={xScale}
          yScale={yScale}
          radius={18}
          tooltipFormat={tooltipTickFormat(2)}
        />
      </g>
    </svg>
  );
};
