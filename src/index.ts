import './index.scss';
import { isValidElement } from 'react';
import type { ReactNode } from 'react';
import { DispatchAction } from './components/Popup';
import AlertConfirm, { Options } from './main';

export type { DispatchAction } from './components/Popup';

type Params = Options | ReactNode;

type ConfirmActionResolve = [boolean, DispatchAction];

const createInstance = (
  params: Params,
  options: Options = {}
): Promise<ConfirmActionResolve> => {
  if (typeof params === 'string' || isValidElement(params)) {
    options.content = params;
  } else if (typeof params === 'object') {
    Object.assign(options, params);
  } else {
    console.warn('options required type is object or and React.ReactNode!');
  }

  const { closeBefore, ...rest } = options;
  return new Promise((resolve) => {
    new AlertConfirm({
      ...rest,
      closeBefore(action, close) {
        const resolveClose = () => {
          close();
          resolve([action === 'ok', action]);
        };
        if (closeBefore) {
          closeBefore(action, resolveClose);
        } else {
          resolveClose();
        }
      }
    });
  });
};

const alertConfirm = (params: Params) => createInstance(params);

export { default as Button } from './components/Button';

export const alert = (params: Params) => {
  return createInstance(params, {
    type: 'alert'
  });
};

export default alertConfirm;
