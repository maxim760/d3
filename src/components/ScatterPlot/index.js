import React, { useCallback, useMemo, useState } from "react";
import {
  extent,
  format,
  scaleLinear,
  scaleOrdinal,
} from "d3";
import Dropdown from "react-dropdown";

import { useDimensions } from "../../hooks/useDimensions";
import { useData } from "./hooks/useData";
import { sampleSize } from "../../utils/array";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { Marks } from "./Marks";

import "react-dropdown/style.css";
import "../../styles/dropdown.css";
import { useAxisAttributes } from "./hooks/useAxisAttributes";
import { capitalize } from "../../utils/string";
import { ColorLegend } from "./ColorLegend";

const csvUrl =
  "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv";

export const getOpacity = ({hoveredColor, color, opacity}) => !hoveredColor || hoveredColor === color ? opacity : Math.min(0.25, opacity / 2)

const margin = {
  top: 20,
  right: 200,
  bottom: 80,
  left: 100,
};

const circleRadius = 18;
const menuHeight = 60;
const xAxisTickFormat = (tickValue) => format("")(tickValue).replace("G", "B");
const initXAttribute = "Petal Length";
const initYAttribute = "Sepal Width";
const axisLabel = {
  offset: { x: 65, y: 55 },
};

const colorAttr = "Species";

export const ScatterPlot = () => {
  const data = useData(csvUrl);

  const attributes = useMemo(() => {
    return data?.columns
      .filter((name) => name !== "Species")
      .map((name) => ({
        value: name,
        label: name,
      }));
  }, [data]);

  const { width, height } = useDimensions({ diff: { height: -menuHeight } });
  const [hoveredValue, setHoveredValue] = useState(null)


  const {
    ref: xRef,
    state: [xAttr, setXAttr],
    getValue: xValue,
    dispatchClick: openDropdownX,
    onChange: onChangeX,
  } = useAxisAttributes(initXAttribute);
  const {
    ref: yRef,
    state: [yAttr, setYAttr],
    getValue: yValue,
    dispatchClick: openDropdownY,
    onChange: onChangeY,
  } = useAxisAttributes(initYAttribute);

  const colorValue = useCallback((item) => item[colorAttr], []);

  const setRandomAttributes = useCallback(() => {
    const [x, y] = sampleSize(attributes, 2);
    setXAttr(x.value);
    setYAttr(y.value);
  }, [attributes, setXAttr, setYAttr]);

  const tooltipTickFormat = ({ x, y, color }) => {
    const tickFormat = xAxisTickFormat;
    return `${xAttr} - ${tickFormat(x)}\n${yAttr} - ${tickFormat(
      y
    )}\n${colorAttr} - ${capitalize(color)}`;
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])
    .nice();

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#E6842A", "#137B80", "#8E6C8A"]);

  return (
    <>
      <div className="menus-container">
        <label onClick={openDropdownX} className="dropdown-label">
          X:
        </label>
        <Dropdown
          ref={xRef}
          options={attributes}
          value={xAttr}
          onChange={onChangeX}
        />
        <label onClick={openDropdownY} className="dropdown-label">
          Y:
        </label>
        <Dropdown
          ref={yRef}
          options={attributes}
          value={yAttr}
          onChange={onChangeY}
        />
        <button onClick={setRandomAttributes} className="dropdown-btn">
          Shuffle
        </button>
      </div>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisLeft
            yScale={yScale}
            tickFormat={xAxisTickFormat}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
            tickOffset={15}
          />
          <AxisBottom
            tickOffset={12}
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
          />
          <text
            className="axis-label"
            x={innerWidth / 2}
            textAnchor="middle"
            y={innerHeight + axisLabel.offset.x}
          >
            {xAttr}
          </text>
          <text
            className="axis-label"
            textAnchor="middle"
            transform={`translate(${-axisLabel.offset.y},${
              innerHeight / 2
            }) rotate(-90)`}
          >
            {yAttr}
          </text>
          <g transform={`translate(${innerWidth + 50}, 30)`}>
            <text y={0} dx={40}  className="axis-label" textAnchor="middle" fontSize="11.4em">
              {colorAttr}
            </text>
            <ColorLegend
              tickSpacing={circleRadius * 2.5}
              tickTextOffset={circleRadius + 10}
              circleRadius={circleRadius}
              colorScale={colorScale}
              offsetTop={50}
            hoveredValue={hoveredValue}
            onHover={setHoveredValue}
            />
          </g>
          <Marks
            data={data}
            xScale={xScale}
            xValue={xValue}
            yScale={yScale}
            yValue={yValue}
            colorScale={colorScale}
            colorValue={colorValue}
            innerHeight={innerHeight}
            radius={circleRadius}
            opacity={0.8}
            tooltipFormat={tooltipTickFormat}
            hoveredValue={hoveredValue}
          />
        </g>
      </svg>
    </>
  );
};
