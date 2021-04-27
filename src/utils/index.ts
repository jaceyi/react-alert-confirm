// 防抖
export const debounce = (func: Function, wait: number) => {
  let timer: number;
  return (...args: any[]) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      func(...args);
    }, wait);
  };
};
