import React, { useEffect, useMemo, useRef } from "react";
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
  brushX,
  select,
} from "d3";
import { Marks } from "./Marks";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { MONTHS } from "../../../utils/consts";
import locale from "../locale/ru.json";
timeFormatDefaultLocale(locale);

const margin = {
  top: 0,
  right: 20,
  bottom: 15,
  left: 50,
};

const axisLabel = {
  x: {
    offset: 65,
    title: "Время",
  },
  y: {
    offset: 40,
    title: "Кол-во пропавших",
  },
};

const monthFormat = (date) => MONTHS[date.getMonth()];
const axisNumberFormat = (tickValue) => format("")(tickValue);
const axisTimeFormat = timeFormat("%Y");

const tooltipTickFormat = ({ x, y }) => {
  return `${axisLabel.y.title} - ${axisNumberFormat(y)}\n${
    axisLabel.x.title
  } - ${monthFormat(x)} ${timeFormat("%Y г.")(x)}`;
};

export const DateHistogram = ({
  data,
  width,
  height,
  offsetTop = 15,
  bgOpacity = 1,
  setBrushExtent,
  xValue,
  yValue,
}) => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = useMemo(() => {
    return scaleTime()
      .domain(extent(data, xValue))
      .rangeRound([0, innerWidth], 0.1)
      .nice();
  }, [data, xValue, innerWidth]);

  const binnedData = useMemo(() => {
    return bin()
      .value(xValue)
      .domain(xScale.domain())
      .thresholds(timeMonths(...xScale.domain(), 1))(data)
      .map((array) => ({
        y: sum(array, yValue),
        x0: array.x0,
        x1: array.x1,
      }));
  }, [xScale, data, xValue, yValue]);

  const yScale = useMemo(() => {
    return scaleLinear()
      .domain([0, max(binnedData, (d) => d.y)])
      .range([innerHeight, 0])
      .nice();
  }, [innerHeight, binnedData]);

  const brushRef = useRef(null);
  useEffect(() => {
    const brush = brushX().extent([
      [0, 0],
      [innerWidth, innerHeight],
    ]);
    brush(select(brushRef.current));
    brush.on("brush end", ({ selection }) => {
      setBrushExtent(selection ? selection.map(xScale.invert) : null);
    });
  }, [setBrushExtent, innerHeight, innerWidth, xScale]);

  return (
    <>
      <rect
        width={width}
        y={-offsetTop}
        height={height + offsetTop}
        opacity={bgOpacity}
        fill="white"
      />
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft
          yScale={yScale}
          tickFormat={axisNumberFormat}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          tickOffset={10}
        />
        <AxisBottom
          tickOffset={12}
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={axisTimeFormat}
          center
          hideLastTick
        />
        <text
          className="histogram-label"
          x={innerWidth / 2}
          textAnchor="middle"
          y={innerHeight + axisLabel.x.offset}
        >
          {axisLabel.x.title}
        </text>
        <text
          className="histogram-label"
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
        <g ref={brushRef} />
      </g>
    </>
  );
};
