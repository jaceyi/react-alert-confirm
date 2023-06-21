import type { ReactNode } from 'react';
import type { Root } from 'react-dom/client';
import type { PopupTypes, Action, Dispatch, Render } from './components/Popup';
import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/Popup';
import languages from './languages';
import Button from './components/Button';

const { isValidElement, Component } = React;

export type { Dispatch, Action, Render };

type Options = PopupTypes.Config;

let parent: HTMLDivElement | null = null;
const instanceMap = new Map<number, PopupGenerator>();

class PopupGenerator {
  static $length = 0;

  $id: number;
  visible: boolean = false;
  container: HTMLDivElement;
  root: Root | null = null;

  constructor(public options: Options = {}) {
    PopupGenerator.$length++;
    this.$id = PopupGenerator.$length;
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

  private dispatch: Dispatch = async action => {
    const closeBefore = this.options.closeBefore || Popup.config.closeBefore;
    const { onOk, onCancel } = this.options;

    if (action === true) {
      onOk && onOk();
    } else if (action === false) {
      onCancel && onCancel();
    }

    if (closeBefore) {
      try {
        await closeBefore(action);
        this.close();
      } catch (e) {}
    } else {
      this.close();
    }
  };

  private destroy = () => {
    const closeAfter = this.options.closeAfter || Popup.config.closeAfter;
    this.container.remove();
    instanceMap.delete(this.$id);
    closeAfter && closeAfter();
  };

  private render() {
    const { visible, container } = this;
    const { closeBefore, closeAfter, custom, footer, ...props } = this.options;

    if (!parent) {
      parent = document.createElement('div');
      parent.className = 'alert-confirm-root';
      document.body.appendChild(parent);
    }
    if (visible) {
      parent.appendChild(container);
    }

    let _custom: ReactNode;
    if (typeof custom === 'function') {
      _custom = custom(this.dispatch);
    } else {
      _custom = custom;
    }

    let _footer: ReactNode;
    if (typeof footer === 'function') {
      _footer = footer(this.dispatch);
    } else {
      _footer = footer;
    }
    const node = (
      <Popup
        {...props}
        custom={_custom}
        footer={_footer}
        visible={visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
        dispatch={this.dispatch}
        closeAfter={this.destroy}
      />
    );

    const {
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: secret,
      createRoot
    } = ReactDOM as typeof ReactDOM & {
      createRoot?: Function;
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: {
        usingClientEntryPoint?: boolean;
      };
    };
    if (this.root) {
      this.root.render(node);
    } else if (createRoot) {
      const has = secret && typeof secret === 'object';
      if (has) {
        secret.usingClientEntryPoint = true;
      }
      this.root = createRoot(container) as Root;
      if (has) {
        secret.usingClientEntryPoint = false;
      }
      this.root.render(node);
    } else {
      (ReactDOM as any).render(node, container);
    }

    return this;
  }
}

type Params = Options | ReactNode;
export type AlertConfirmPromise = Promise<[Action, PopupGenerator]>;

interface AlertConfirm {
  new (props: PopupTypes.Props): Popup;
  (this: any, params: Params, options?: Options): AlertConfirmPromise;
  alert: typeof alert;
  config: typeof config;
  closeAll: typeof closeAll;
  Button: typeof Button;
}

const AlertConfirm: AlertConfirm = function (
  this: any,
  params: Params,
  options: Options = {}
): Popup | AlertConfirmPromise {
  if (this instanceof AlertConfirm) {
    return new Popup(params as PopupTypes.Props);
  }
  if (typeof params === 'string' || isValidElement(params)) {
    options.title = params;
  } else if (typeof params === 'object') {
    Object.assign(options, params);
  } else {
    console.warn('options required type is object or ReactNode!');
  }

  const { closeBefore, ...rest } = options;
  return new Promise(resolve => {
    const instance = new PopupGenerator({
      ...rest,
      async closeBefore(action) {
        const resolveClose = () => {
          resolve([action, instance]);
        };
        if (closeBefore) {
          await closeBefore(action);
          resolveClose();
        } else {
          resolveClose();
        }
      }
    }).open();
  });
} as AlertConfirm;
AlertConfirm.prototype = Component.prototype;

const alert = (params: Params) => {
  return AlertConfirm(params, {
    type: 'alert'
  });
};
const config = (config?: PopupTypes.Config): PopupTypes.Config => {
  if (config) {
    const { lang } = config;
    if (lang) {
      const langs = languages[lang];
      if (!langs) {
        console.error(
          `config lang must be one of ${Object.keys(languages).join(',')}.`
        );
        return Popup.config;
      }
      Object.assign(Popup.config, {
        okText: langs.ok,
        cancelText: langs.cancel
      });
    }
    return Object.assign(Popup.config, config);
  }
  return Popup.config;
};
const closeAll = () => {
  instanceMap.forEach(instance => {
    instance.close();
  });
};

AlertConfirm.alert = alert;
AlertConfirm.config = config;
AlertConfirm.closeAll = closeAll;
AlertConfirm.Button = Button;

export { alert, config, closeAll, Button };

export default AlertConfirm;
