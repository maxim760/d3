import React from 'react'

export const FaceContainer = ({ children, width, height, translate = {}}) => {
  const {cx, cy} = translate;
  return (
    <svg width={width} height={height}>

      <g transform={`translate(${cx},${cy})`}>
        {children}
      </g>
    </svg>
  )
}
