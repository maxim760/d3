import React from "react";
import {
  extent,
  format,
  max,
  scaleLog,
  scaleTime,
  timeFormat,
  timeFormatDefaultLocale,
} from "d3";
import { useDimensions } from "../../hooks/useDimensions";
import { useData } from "./hooks/useData";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { Marks } from "./Marks";
import { MONTHS } from "../../utils/consts";
import locale from "./locale/ru.json";

timeFormatDefaultLocale(locale);
const monthFormat = (date) => MONTHS[date.getMonth()];

const csvUrl =
  "https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/267eac8b97d161c479d950ffad3ddd5ce2d1f370/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv";
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
    title: "Кол-во пропавших",
  },
};
export const xValue = (item) => item["Reported Date"];
export const yValue = (item) => item["Total Dead and Missing"];

const axisNumberFormat = () => (tickValue) => format("")(tickValue);

const axisTimeFormat = () => {
  return timeFormat("%Y");
};

const tooltipTickFormat = ({ x, y }) => {
  const numberFormat = axisNumberFormat();
  return `${axisLabel.y.title} - ${numberFormat(y)}\n${
    axisLabel.x.title
  } - ${monthFormat(x)} ${timeFormat("%Y г.")(x)}`;
};

export const MissingMigrantsLog = () => {
  const { width, height } = useDimensions();
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const data = useData(csvUrl);

  if (!data) {
    return <div>Loading...</div>;
  }

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .rangeRound([0, innerWidth], 0.1)
    .nice();

  const yScale = scaleLog()
    .clamp(true)
    .domain([1, max(data, yValue)])
    .range([innerHeight, 0]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft
          yScale={yScale}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          tickOffset={15}
        />
        <AxisBottom
          tickOffset={18}
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={axisTimeFormat()}
          center
          hideLastTick
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
          xValue={xValue}
          yScale={yScale}
          yValue={yValue}
          radius={3}
          tooltipFormat={tooltipTickFormat}
        />
      </g>
    </svg>
  );
};
