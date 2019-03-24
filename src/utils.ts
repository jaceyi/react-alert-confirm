/**
 * @description 给元素增加 class 名
 * @param el
 * @param className
 */
export function addClassName(el: HTMLElement, className: string) {
  const _ = el.className.split(' ');
  el.className = [..._, className].join(' ');
}
