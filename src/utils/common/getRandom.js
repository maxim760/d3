export const getRandom = (start, end) =>
  Math.floor(Math.random() * (end - start) + start + 1);

export const getRandomNumbers = (interval, count) => {
  const nums = new Set();
  while (nums.size !== count) {
    nums.add(~~(Math.random() * interval));
  }
  return Array.from(nums);
};
