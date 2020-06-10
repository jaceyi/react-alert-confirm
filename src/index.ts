import './index.scss';
import * as React from 'react';
import AlertConfirm, { Options } from './main';

type AlertConfirmType = AlertConfirm | Promise<AlertConfirm>;
type Params = Options | React.ReactNode;

const createInstance = (
  params: Params,
  defaultOptions: Options = {}
): AlertConfirmType => {
  if (typeof params === 'string' || React.isValidElement(params)) {
    defaultOptions.content = params;
  } else if (typeof params === 'object') {
    Object.assign(defaultOptions, params);
  } else {
    console.warn('options required type is object or and React.ReactNode!');
  }

  if (
    !defaultOptions.onOk &&
    !defaultOptions.onCancel &&
    !defaultOptions.closeBefore
  ) {
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

const alertConfirm = (params: Params) => createInstance(params);

export { default as Button } from './components/Button';

export const alert = (params: Params) =>
  createInstance(params, {
    type: 'alert'
  });

export default alertConfirm;
