import './index.scss';
import * as React from 'react';
import AlertConfirm from './main';
import { optionsInterface, AlertConfirmInterface } from './main';
import ConfirmButton from './components/Button';
import { Button as ButtonTypes } from './components/Button';

function createInstance(
  options: optionsInterface | React.ReactNode,
  defaultOptions:optionsInterface = {}): AlertConfirmInterface {
  if (typeof options === 'string' || React.isValidElement(options)) {
    defaultOptions.content = options
  } else if (typeof options === 'object') {
    Object.assign(defaultOptions, options);
  } else {
    throw new Error('options required type is object or and React.ReactNode!')
  }

  return new AlertConfirm(defaultOptions);
}

interface alertInterface {
  (options: optionsInterface | React.ReactNode): AlertConfirmInterface;
}

interface asyncConfirmInterface {
  (options: optionsInterface | React.ReactNode): Promise<AlertConfirmInterface>
}

export const Button: React.ComponentClass<ButtonTypes.Props> = ConfirmButton;

export const alert: alertInterface = options => {
  return createInstance(options, {
    type: 'alert'
  })
};

export const asyncConfirm: asyncConfirmInterface = options => {
  return createInstance(options).async()
};

export default options => createInstance(options);
