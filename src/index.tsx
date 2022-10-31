import React, { isValidElement, ReactNode } from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import Popup, { PopupTypes } from './components/Popup';
import languages from './languages';

export { default as Button } from './components/Button';

type DispatchAction = boolean | string | number;
type Dispatch = (action: DispatchAction) => void;
type CloseBefore = (action: DispatchAction, close: () => void) => void;
type DispatchFooter = (dispatch: Dispatch) => ReactNode;

interface Options extends Omit<Partial<PopupTypes.Config>, 'footer'> {
  closeBefore?: CloseBefore;
  footer?: PopupTypes.Config['footer'] | DispatchFooter;
}

let parent: HTMLDivElement | null = null;
const instanceMap = new Map<number, PopupGenerator>();

class PopupGenerator {
  static $length = 0;

  $id: number;
  visible: boolean = false;
  container: HTMLDivElement;

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
    const { closeBefore, footer, ...props } = options;

    if (!parent) {
      parent = document.createElement('div');
      parent.className = 'alert-confirm-root';
      document.body.appendChild(parent);
    }
    if (visible) {
      parent.appendChild(container);
    }

    let _footer: ReactNode;
    if (typeof footer === 'function') {
      _footer = footer(this.dispatch);
    } else {
      _footer = footer;
    }

    render(
      <Popup
        {...props}
        footer={_footer}
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
    options.content = params;
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

interface Config extends Partial<PopupTypes.Config> {
  closeBefore?: CloseBefore;
}
const _config: Config = Popup.config;

const config = (config?: Config): Config => {
  if (config) {
    const { lang } = config;
    if (lang) {
      const langs = languages[lang];
      if (!langs) {
        console.error(
          `config lang must be one of ${Object.keys(languages).join(',')}.`
        );
        return _config;
      }
      Object.assign(_config, {
        okText: langs.ok,
        cancelText: langs.cancel
      });
    }
    return Object.assign(_config, config);
  }
  return _config;
};

AlertConfirm.alert = alert;
AlertConfirm.config = config;
AlertConfirm.closeAll = closeAll;

export default AlertConfirm;
