import './index.scss';
import * as React from 'react';
import AlertConfirm, { Options } from './main';
import ConfirmButton from './components/Button';

type AlertConfirmType = AlertConfirm | Promise<AlertConfirm>;

const createInstance = (options: Options | React.ReactNode, defaultOptions: Options = {}): AlertConfirmType => {
  if (typeof options === 'string' || React.isValidElement(options)) {
    defaultOptions.content = options;
  } else if (typeof options === 'object') {
    Object.assign(defaultOptions, options);
  } else {
    throw new Error('options required type is object or and React.ReactNode!');
  }

  if (!defaultOptions.onOk && !defaultOptions.onCancel && !defaultOptions.closeBefore) {
    return new Promise((resolve, reject) => {
      new AlertConfirm(
        Object.assign(defaultOptions, {
          onOk: resolve,
          onCancel: reject
        })
      );
    });
  }

  return new AlertConfirm(defaultOptions);
};

interface IAlert {
  (options: Options | React.ReactNode): AlertConfirmType;
}

export const Button = ConfirmButton;

export const alert: IAlert = options => {
  return createInstance(options, {
    type: 'alert'
  });
};

export default options => createInstance(options);
