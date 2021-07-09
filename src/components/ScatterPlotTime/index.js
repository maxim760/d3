import React from "react";
import { useDimensions } from "../../hooks/useDimensions";
import { extent, format, scaleLinear, scaleTime, timeFormat, timeFormatDefaultLocale } from "d3";
import { useData } from "./hooks/useData";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { Marks } from "./Marks";
import locale from "./locale/ru.json"
timeFormatDefaultLocale(locale)
const csvUrl =
  "https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv";

const margin = {
  top: 20,
  right: 50,
  bottom: 80,
  left: 100,
};

const axisLabel = {
  x: {
    offset: 65,
    title: "Время",
  },
  y: {
    offset: 53,
    title: "Температура",
  },
};
export const xValue = (item) => item["timestamp"];
export const yValue = (item) => item["temperature"];
const siFormat = (num = 2) => format(`.${num}s`);
const axisNumberFormat = (num) => (tickValue) =>
  siFormat(num)(tickValue).replace("G", "B");

const axisTimeFormat = () => {
  return timeFormat("%a")
}

const tooltipTickFormat =
  (num) => ({x,y}) => {
    const numberFormat = axisNumberFormat(num);
    return `${axisLabel.y.title} - ${numberFormat(y)}°C\n${axisLabel.x.title} - ${timeFormat("%c")(x)}`;
  };

export const ScatterPlotTime = () => {
  const { width, height } = useDimensions();
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const data = useData(csvUrl);
  if (!data) {
    return <div>Loading...</div>;
  }

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();
    
    const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft
          yScale={yScale}
          tickFormat={axisNumberFormat(2)}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          tickOffset={15}
        />
        <AxisBottom
          tickOffset={12}
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={axisTimeFormat()}
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
          transform={`translate(${-axisLabel.y.offset},${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {axisLabel.y.title}
        </text>
        <Marks
          data={data}
          innerHeight={innerHeight}
          xScale={xScale}
          yScale={yScale}
          radius={12}
          tooltipFormat={tooltipTickFormat(3)}
        />
      </g>
    </svg>
  );
};
