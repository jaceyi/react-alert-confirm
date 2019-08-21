import './index.scss';
import alertConfirm from './main';
import { optionsInterface } from './main';
import _Button from './components/Button';

export const Button = _Button;
export const alert = options => {
  const _options: optionsInterface = { type: 'alert' };
  if (typeof options === 'string') {
    _options.content = options;
  } else {
    Object.assign(_options, options)
  }
  return alertConfirm(_options)
};
export default alertConfirm;
