export const classNames = (...names: Array<string | undefined>) =>
  names?.filter(n => n).join(' ');

export const isFunc = (o: any) =>
  Object.prototype.toString.call(o) === '[object Function]';
