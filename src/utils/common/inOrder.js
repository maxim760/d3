import {gt} from "./gt"
import {gte} from "./gte"

export const inOrder = (items, { strict = false } = {}) => {
  const greaterThen = strict ? gt : gte 
  for (let i = 0; i < items.length - 1; i++) {
    if (!greaterThen(items[i+1], items[i])) {
      return false
    }
  }
  return true
}