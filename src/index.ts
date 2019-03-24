import './index.scss';
import alertConfirm from './main';
import _Button from './components/Button';

export const Button = _Button;
export const alert = options => alertConfirm({ type: 'alert', ...options });
export default alertConfirm;
