import { axisBottom, select } from 'd3'
import React, { useContext, useEffect, useRef } from 'react'
import { Context } from '.';


export const XAxis = ({ tickFormat, offset = 10 }) => {
  const { xScale, innerHeight } = useContext(Context);
  const ref = useRef(null)
  useEffect(() => {
    const xAxisElem = select(ref.current)
    const xAxis = axisBottom(xScale).tickFormat(tickFormat).tickSize(-innerHeight).tickPadding(offset)
    // xAxisElem.call(xAxis).selectAll(".tick:last-of-type text").remove()
    xAxisElem.call(xAxis)
  }, [innerHeight, xScale, tickFormat, offset])
  return (
    <g ref={ref} transform={`translate(0, ${innerHeight})`} className="marker-line" />
  )
}