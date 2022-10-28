'use strict';
import React, { isValidElement, ReactNode } from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import Popup, { PopupTypes, globalConfig } from './components/Popup';
import languages from './languages';

export { default as Button } from './components/Button';

type DispatchAction = boolean | string | number;
type Dispatch = (action: DispatchAction) => void;
type CloseBefore = (action: DispatchAction, close: () => void) => void;

interface Options extends Partial<PopupTypes.Config> {
  closeBefore?: CloseBefore;
  // footer?: (dispatch: Dispatch) => ReactNode
}

let parent: HTMLDivElement | null = null;
const instanceMap = new Map<number, PopupAenerator>();

class PopupAenerator {
  static $length = 0;

  $id: number;
  type!: PopupTypes.Type;
  visible: boolean = false;
  container: HTMLDivElement;

  constructor(public options: Options = {}) {
    this.type = options.type || 'confirm';

    PopupAenerator.$length++;
    this.$id = PopupAenerator.$length;
    instanceMap.set(this.$id, this);

    const container: HTMLDivElement = document.createElement('div');
    container.setAttribute('data-alert-confirm-id', String(this.$id));

    this.container = container;
  }

  onOk = () => {
    this.dispatch(true);
    return this;
  };

  onCancel = () => {
    this.dispatch(false);
    return this;
  };

  open = () => {
    this.visible = true;
    this.render();
    return this;
  };

  close = () => {
    this.visible = false;
    this.render();
    return this;
  };

  private dispatch: Dispatch = action => {
    const { closeBefore, onOk, onCancel } = this.options;

    if (action === true) {
      onOk?.();
    } else if (action === false) {
      onCancel?.();
    }

    if (closeBefore) {
      closeBefore.call(this, action, this.close.bind(this));
    } else {
      this.close();
    }
    return this;
  };

  private destroy = () => {
    unmountComponentAtNode(this.container!);
    parent?.removeChild(this.container!);
    instanceMap.delete(this.$id);
    return this;
  };

  private render() {
    const { visible, container, onOk, onCancel, destroy, options } = this;
    const { closeBefore, ...props } = options;

    if (!parent) {
      parent = document.createElement('div');
      parent.className = 'alert-confirm-root';
      document.body.appendChild(parent);
    }
    if (visible) {
      parent.appendChild(container);
    }

    render(
      <Popup
        {...props}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        onCloseAfter={destroy}
      />,
      container
    );
    return this;
  }
}

type Params = Options | ReactNode;
type ConfirmActionResolve = [DispatchAction, PopupAenerator];

interface AlertConfirm {
  new (props: PopupTypes.Props): Popup;
  (this: any, params: Params, options?: Options): Promise<ConfirmActionResolve>;
  confirm: AlertConfirm;
  alert: typeof alert;
  config: typeof config;
  closeAll: typeof closeAll;
}
const AlertConfirm: AlertConfirm = function (
  this: any,
  params: PopupTypes.Props | Params,
  options: Options = {}
): Popup | Promise<ConfirmActionResolve> {
  if (this instanceof AlertConfirm) {
    return new Popup(params as PopupTypes.Props);
  }
  if (typeof params === 'string' || isValidElement(params)) {
    options.content = params;
  } else if (typeof params === 'object') {
    Object.assign(options, params);
  } else {
    console.warn('options required type is object or ReactNode!');
  }

  const { closeBefore, ...rest } = options;
  return new Promise(resolve => {
    const instance = new PopupAenerator({
      ...rest,
      closeBefore(action, close) {
        const resolveClose = () => {
          close();
          resolve([action, instance]);
        };
        if (closeBefore) {
          closeBefore(action, resolveClose);
        } else {
          resolveClose();
        }
      }
    }).open();
  });
} as AlertConfirm;
AlertConfirm.prototype = React.Component.prototype;

const alert = (params: Params) => {
  return AlertConfirm(params, {
    type: 'alert'
  });
};
const closeAll = () => {
  instanceMap.forEach(instance => {
    instance.close();
  });
};

type Config = Options;
const config = (config?: Config): Config => {
  if (config) {
    const { lang } = config;
    if (lang) {
      const langs = languages[lang];
      if (!langs) {
        console.error(
          `config lang must be one of ${Object.keys(languages).join(',')}.`
        );
        return globalConfig;
      }
      Object.assign(globalConfig, {
        okText: langs.ok,
        cancelText: langs.cancel
      });
    }
    return Object.assign(globalConfig, config);
  }
  return globalConfig;
};

if (new Date().getTimezoneOffset() / -60 === 8) {
  config({
    lang: 'zh'
  });
}

AlertConfirm.alert = alert;
AlertConfirm.config = config;
AlertConfirm.closeAll = closeAll;

export default AlertConfirm;
