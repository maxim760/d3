export const capitalize = (word = "") => {
  return word ? word[0].toUpperCase() + word.substring(1).toLowerCase(): "";
}

export const capitalizeString = (string = "", removedChars = "_-") => {
  const regexp = new RegExp(`[${removedChars}]`, "g")
  return string.replace(regexp, " ").split(" ").map(capitalize).join(" ")
}