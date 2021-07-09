export const round = (number, precision = 0) => {
  return Math.round(number * 10 ** precision) / 10 ** precision;
}