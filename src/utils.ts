/**
 * @description 给元素增加 class 名
 * @param el
 * @param className
 */
export function addClassName(el: HTMLElement, className: string) {
  const _ = el.className.split(' ');
  el.className = [..._, className].join(' ');
}

/**
 * @description 删除元素 class 名
 * @param el
 * @param className
 */
export function removeClassName(el: HTMLElement, className: string) {
  const _ = el.className.split(' ');
  el.className = removeArrayItem(_, className).join(' ');
}

/**
 * @description 删除数组元素
 * @param arr
 * @param item
 */
export function removeArrayItem(arr: (string | number)[], item: string | number) {
  const index = arr.indexOf(item);
  if (index < 0) return arr;
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
