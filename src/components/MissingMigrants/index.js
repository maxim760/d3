import React from "react";
import {
  bin,
  extent,
  format,
  max,
  scaleLinear,
  scaleTime,
  sum,
  timeFormat,
  timeFormatDefaultLocale,
  timeMonths,
} from "d3";
import { useDimensions } from "../../hooks/useDimensions";
import { useData } from "./hooks/useData";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { Marks } from "./Marks";
import {MONTHS} from "../../utils/consts"
import locale from "./locale/ru.json";


timeFormatDefaultLocale(locale);
const monthFormat = date => MONTHS[date.getMonth()]

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
  } - ${monthFormat(x)} ${ timeFormat("%Y г.")(x)}`;
};

export const MissingMigrants = () => {
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
    .nice()

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(...xScale.domain(), 1))(data)
    .map((array) => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1,
    }));
  
  const yScale = scaleLinear()
    .domain([0, max(binnedData, d => d.y)])
    .range([innerHeight, 0])
    .nice();

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft
          yScale={yScale}
          tickFormat={axisNumberFormat()}
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
          binnedData={binnedData}
          innerHeight={innerHeight}
          xScale={xScale}
          yScale={yScale}
          radius={4}
          tooltipFormat={tooltipTickFormat}
        />
      </g>
    </svg>
  );
};
