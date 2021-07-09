export const getTickDistance = (linearScale) => {
  const ticks = linearScale.ticks()
  const {length} = ticks
  const tickDistance = (linearScale(ticks[length - 1]) - linearScale(ticks[length - 2])) || 0
  return {ticks, tickDistance}
}