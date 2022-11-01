import React, { isValidElement, ReactNode } from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
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

interface Options extends Omit<Partial<PopupTypes.Config>, 'onCloseBefore'> {
  onCloseBefore?: CloseBefore;
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
    const {
      onCloseBefore = Popup.config.onCloseBefore,
      onOk,
      onCancel
    } = this.options;

    if (action === true) {
      onOk?.();
    } else if (action === false) {
      onCancel?.();
    }

    if (onCloseBefore) {
      onCloseBefore.call(this, action, this.close.bind(this));
    } else {
      this.close();
    }
    return this;
  };

  private destroy = () => {
    const { onCloseAfter = Popup.config.onCloseAfter } = this.options;
    unmountComponentAtNode(this.container!);
    parent?.removeChild(this.container!);
    instanceMap.delete(this.$id);
    onCloseAfter?.();
    return this;
  };

  private render() {
    const { visible, container, onOk, onCancel, dispatch, destroy, options } =
      this;
    const { onCloseBefore, onCloseAfter, custom, footer, ...props } = options;

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

    render(
      <Popup
        {...props}
        custom={_custom}
        footer={_footer}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        dispatch={dispatch}
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
    options.title = params;
  } else if (typeof params === 'object') {
    Object.assign(options, params);
  } else {
    console.warn('options required type is object or ReactNode!');
  }

  const { onCloseBefore, ...rest } = options;
  return new Promise(resolve => {
    const instance = new PopupGenerator({
      ...rest,
      onCloseBefore(action, close) {
        const resolveClose = () => {
          close();
          resolve([action, instance]);
        };
        if (onCloseBefore) {
          onCloseBefore(action, resolveClose);
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
AlertConfirm.alert = alert;

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

AlertConfirm.config = config;

const closeAll = () => {
  instanceMap.forEach(instance => {
    instance.close();
  });
};
AlertConfirm.closeAll = closeAll;

export default AlertConfirm;
