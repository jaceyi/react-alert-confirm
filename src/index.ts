import './index.scss';
import { isValidElement, ReactNode } from 'react';
import AlertConfirm, {
  Options,
  globalConfig,
  GlobalConfig,
  DispatchAction,
  instanceMap
} from './main';
import languages from './languages';

export type { DispatchAction };
export { default as Button } from './components/Button';

export const config = (config?: Partial<GlobalConfig>): GlobalConfig => {
  if (config) {
    const { lang } = config;
    if (lang) {
      /* 更改语言时更新按钮文字 */
      const langs = languages[lang];
      Object.assign(globalConfig, {
        okText: langs.ok,
        cancelText: langs.cancel
      });
    }

    /* 如果传入了文字则会讲默认的语言文字覆盖 */
    return Object.assign(globalConfig, config);
  }
  return globalConfig;
};

export const destroyAll = () => {
  instanceMap.forEach(instance => {
    instance.closePopup();
  });
};

type Params = Options | ReactNode;
type ConfirmActionResolve = [boolean, DispatchAction, AlertConfirm];
interface CreateAlertConfirm {
  (params: Params, options?: Options): Promise<ConfirmActionResolve>;
}
interface Popup {
  (params: Params): Promise<ConfirmActionResolve>;
  alert: CreateAlertConfirm;
  config: typeof config;
  destroyAll: typeof destroyAll;
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
  return new Promise(resolve => {
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

export const alert: CreateAlertConfirm = params => {
  return createAlertConfirm(params, {
    type: 'alert'
  });
};
export const confirm: CreateAlertConfirm = createAlertConfirm;

const alertConfirm: Popup = params => createAlertConfirm(params);
alertConfirm.alert = alert;
alertConfirm.config = config;
alertConfirm.destroyAll = destroyAll;

export default alertConfirm;
