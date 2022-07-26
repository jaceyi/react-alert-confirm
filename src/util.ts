export const classNames = (...names: Array<string | undefined>) =>
  names?.filter(n => n).join(' ');
