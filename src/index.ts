import './index.scss';
import { isValidElement, ReactNode } from 'react';
import { DispatchAction } from './components/Popup';
import AlertConfirm, { Options, config as _config, Config } from './main';

export type { DispatchAction } from './components/Popup';

type Params = Options | ReactNode;

type ConfirmActionResolve = [boolean, DispatchAction, AlertConfirm];

interface CreateAlertConfirm {
  (params: Params, options?: Options): Promise<ConfirmActionResolve>;
}

const createAlertConfirm: CreateAlertConfirm = (params, options = {}) => {
  if (typeof params === 'string' || isValidElement(params)) {
    options.content = params;
  } else if (typeof params === 'object') {
    Object.assign(options, params);
  } else {
    console.warn('options required type is object or ReactNode!');
  }

  const { closeBefore, ...rest } = options;
  return new Promise((resolve) => {
    const instance = new AlertConfirm({
      ...rest,
      closeBefore(action, close) {
        const resolveClose = () => {
          close();
          resolve([action === 'ok', action, instance]);
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

export { default as Button } from './components/Button';

export const alert: CreateAlertConfirm = (params) => {
  return createAlertConfirm(params, {
    type: 'alert'
  });
};

export const confirm: CreateAlertConfirm = createAlertConfirm;

interface Popup {
  (params: Params): Promise<ConfirmActionResolve>;
  alert: CreateAlertConfirm;
  confirm: CreateAlertConfirm;
  config: (config: Partial<Config>) => Config;
}

const alertConfirm: Popup = (params) => createAlertConfirm(params);
alertConfirm.alert = alert;
alertConfirm.confirm = alertConfirm;

alertConfirm.config = (config?: Partial<Config>) => {
  if (config) {
    return Object.assign(_config, config);
  }
  return _config;
};

export default alertConfirm;
