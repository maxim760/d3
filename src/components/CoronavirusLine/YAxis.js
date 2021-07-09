import React, { useContext, useEffect, useRef } from 'react'
import { axisLeft, select } from 'd3'
import { Context } from '.';


export const YAxis = ({ tickFormat, offset = 10, ticksCount = 10 }) => {
  const { yScale, innerWidth } = useContext(Context);
  const ref = useRef(null)
  useEffect(() => {
    const yAxisElem = select(ref.current)
    const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(offset)
    yAxis.ticks(ticksCount, tickFormat)
    yAxisElem.call(yAxis)
  }, [innerWidth, yScale, tickFormat, offset, ticksCount])
  return (
    <g ref={ref} className="marker-line" />
  )
}
