import React from 'react'


export const Eyes = ({radius,x,y,offsetX }) => {
  
  return (
    <>
      <circle r={radius} cx={x + offsetX} cy={y} />
      <circle r={radius} cx={x - offsetX} cy={y} /> 
    </>
  )
}