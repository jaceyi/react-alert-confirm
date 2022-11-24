import type { ReactNode } from 'react';
import type { Root } from 'react-dom/client';
import React, { isValidElement, Component } from 'react';
import * as ReactDOM from 'react-dom';
import Popup, {
  PopupTypes,
  Dispatch,
  DispatchAction,
  DispatchRender,
  HandleEvent
} from './components/Popup';
import languages from './languages';

export { default as Button } from './components/Button';
export type { Dispatch, DispatchAction, DispatchRender };

type CloseBefore = (action: DispatchAction, close: HandleEvent) => void;

interface Options extends Omit<Partial<PopupTypes.Config>, 'closeBefore'> {
  closeBefore?: CloseBefore;
}

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

  private dispatch: Dispatch = action => {
    const {
      closeBefore = Popup.config.closeBefore,
      onOk,
      onCancel
    } = this.options;

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
    const { closeAfter = Popup.config.closeAfter } = this.options;
    this.container.remove();
    instanceMap.delete(this.$id);
    closeAfter?.();
    return this;
  };

  private render() {
    const { visible, container, onOk, onCancel, dispatch, destroy, options } =
      this;
    const { closeBefore, closeAfter, custom, footer, ...props } = options;

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
        onOk={onOk}
        onCancel={onCancel}
        dispatch={dispatch}
        closeAfter={destroy}
      />
    );

    const { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, createRoot } = (ReactDOM as typeof ReactDOM & {
      createRoot?: Function,
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: {
        usingClientEntryPoint?: boolean
      }
    });
    if (this.root) {
      this.root.render(node);
    } else if (createRoot) {
      const has = __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED && typeof __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === 'object';
      if (has) {
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = true;
      }
      this.root = createRoot(container) as Root;
      if (has) {
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = false;
      }
      this.root.render(node);
    } else {
      (ReactDOM as any).render(node, container);
    }

    return this;
  }
}

type Params = Options | ReactNode;
type ConfirmActionResolve = [DispatchAction, PopupGenerator];

interface AlertConfirm {
  new (props: PopupTypes.Props): Popup;
  (this: any, params: Params, options?: Options): Promise<ConfirmActionResolve>;
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
AlertConfirm.prototype = Component.prototype;

export const alert = (params: Params) => {
  return AlertConfirm(params, {
    type: 'alert'
  });
};
AlertConfirm.alert = alert;

export const config = (config?: PopupTypes.Config): PopupTypes.Config => {
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

AlertConfirm.config = config;

export const closeAll = () => {
  instanceMap.forEach(instance => {
    instance.close();
  });
};
AlertConfirm.closeAll = closeAll;

export default AlertConfirm;
