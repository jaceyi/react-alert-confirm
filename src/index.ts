import './index.scss';
import * as React from 'react';
import alertConfirm from './main';
import { optionsInterface, AlertConfirmInterface } from './main';
import ConfirmButton from './components/Button';
import { Button as ButtonTypes } from './components/Button';

interface alertInterface {
  (options: optionsInterface | string): AlertConfirmInterface;
}

interface asyncConfirmInterface {
  (options: optionsInterface | string): Promise<AlertConfirmInterface>
}

export const Button: React.ComponentClass<ButtonTypes.Props> = ConfirmButton;

export const alert: alertInterface = options => {
  const _options: optionsInterface = { type: 'alert' };
  if (typeof options === 'string') {
    _options.content = options;
  } else {
    Object.assign(_options, options)
  }
  return alertConfirm(_options)
};

export const asyncConfirm: asyncConfirmInterface = options => {
  return alertConfirm(options).async()
};

export default alertConfirm;
