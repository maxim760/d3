import React, { createContext, useMemo } from "react";
import { useDimensions } from "../../hooks/useDimensions";
import {
  extent,
  format,
  scaleTime,
  timeFormat,
  max,
  scaleLog,
  schemeSet2,
  scaleOrdinal,
} from "d3";
import { useData } from "./hooks/useData";
import { MarksList } from "./MarksList";
import { XAxis } from "./XAxis";
import { YAxis } from "./YAxis";

export const margin = {
  top: 45,
  right: 75,
  bottom: 65,
  left: 80,
};

const csvUrl =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

const axisNumberFormat = (tickValue) => format(`0.0s`)(tickValue);
const tooltipNumberFormat = (tickValue) => {
  const number = 1 + ((~~Math.log10(tickValue) + 1) % 3 || 3)
  if (tickValue < 1000) {
    return format("")(tickValue)
  }
  return format(`0.${number}s`)(tickValue)
};

const axisTimeFormat = timeFormat("%d %b %y");

export const Context = createContext();

export const xKey = "date";
export const yKey = "deathTotal";
const xValue = (d) => d[xKey];
const yValue = (d) => d[yKey];
const colorValue = (d) => d?.countryName;

export const CoronavirusLine = () => {
  const { width, height } = useDimensions();
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const data = useData(csvUrl);

  const xScale = useMemo(
    () =>
      data &&
      scaleTime()
        .domain(extent(data[0], xValue))
        .rangeRound([0, innerWidth], 0.1),
    [data, innerWidth]
  );
  const yScale = useMemo(
    () =>
      data &&
      scaleLog()
        .clamp(true)
        .domain([
          1,
          max(
            data.map((item) => item[item.length - 1]),
            yValue
          ),
        ])
        .range([innerHeight, 0]),
    [data, innerHeight]
  );
  const colorScale = useMemo(() => {
    return (
      data && scaleOrdinal().domain(data.map(colorValue)).range(schemeSet2)
    );
  }, [data]);
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <Context.Provider
          value={{
            xScale,
            xValue,
            yScale,
            yValue,
            colorScale,
            colorValue,
            innerHeight,
            innerWidth,
          }}
        >
          <XAxis tickFormat={axisTimeFormat} offset={8} />
          <YAxis tickFormat={axisNumberFormat} ticksCount={18} offset={8} />
          <MarksList data={data} tooltipNumberFormat={tooltipNumberFormat} tooltipTimeFormat={axisTimeFormat} />
          <text
            className="main-label"
            x={innerWidth / 2}
            textAnchor="middle"
            dy={-10}
          >
            Coronavirus Global Death Over Time
          </text>
          <text
            className="axis-label-info"
            y={innerHeight}
            dominantBaseline="hanging"
            dy={25}
            x={innerWidth / 2}
            textAnchor="middle"
          >
            Time
          </text>
          <text
            className="axis-label-info"
            transform={`translate(-45,${innerHeight / 2}) rotate(-90) `}
            textAnchor="middle"
          >
            Cumulative Death
          </text>
        </Context.Provider>
      </g>
    </svg>
  );
};
