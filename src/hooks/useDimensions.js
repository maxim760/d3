import { useEffect, useState } from "react"

const getDimensions = ({height = 0, width = 0} = {}) => ({
  width: window.innerWidth + width,
  height: window.innerHeight + height,
})

export const useDimensions = ({diff: {height = 0, width = 0} = {}} = {}) => {
  const [dimensions, setDimensions] = useState(getDimensions({width, height}))
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions(getDimensions({width, height}))
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [setDimensions, width, height])
  return {...dimensions, min: Math.min(dimensions.width, dimensions.height)}

}