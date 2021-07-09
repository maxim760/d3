import {getRandom} from "./common/getRandom"

export const sampleSize = (collection, num) => {
  const newCol = [...collection];
  
  const size = Math.min(newCol.length, num);
  return Array.from({
    length: size
  }, () => {
    const index = getRandom(0, newCol.length - 1);
    return newCol.splice(index, 1)[0];
  });
}

export const isLastItem = (idx, array) => array.length - 1 === idx