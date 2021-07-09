export const throttle = (fn, ms) => {
  let isWait = false;
  let timer
  return (...args) => {
    if (isWait) {
      return;
    }
    fn(...args);
    timer && clearTimeout(timer)
    isWait = true;
    timer = setTimeout(() => {
      isWait = false;
    }, ms);
  };
};
