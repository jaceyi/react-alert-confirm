import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from './components/Popup';
import Button from './components/Button';

interface closeBeforeInterface {
  (action: string | number, closePopup: { (): void }): void
}

export interface optionsInterface {
  type?: 'confirm' | 'alert';
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  zIndex?: number;
  okText?: string;
  cancelText?: string;
  onOk?: { (): void }
  onCancel?: { (): void }
  closeBefore?: closeBeforeInterface;
}

export interface AlertConfirmInterface {
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  zIndex: number;
  type: 'confirm' | 'alert';
  status: 'mount' | 'unmount';
  action: string | number;
  container: Element;
  onOk?: { (): void };
  onCancel?: { (): void };
  closeBefore: closeBeforeInterface;
  resolve?: { (instance?: AlertConfirmInterface): void };
  reject?: { (instance?: AlertConfirmInterface): void };
  dispatch: {
    (action: string | number): void;
  };
  closePopup: { (): void };
  async: { (): Promise<AlertConfirmInterface>};
}

class AlertConfirm implements AlertConfirmInterface {
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  zIndex: number = 1000;
  type: 'confirm' | 'alert' = 'confirm';
  status: 'mount' | 'unmount' = 'mount';
  action: string | number = null;
  container: Element = null;
  onOk?: { (): void };
  onCancel?: { (): void };
  closeBefore: closeBeforeInterface = null;
  resolve?: { (instance?: AlertConfirmInterface): void };
  reject?: { (instance?: AlertConfirmInterface): void };

  constructor({
    title,
    content,
    footer,
    zIndex,
    closeBefore,
    type = 'confirm',
    onOk,
    onCancel,
    okText,
    cancelText
  }: optionsInterface) {
    const container: HTMLDivElement = document.createElement('div');
    container.className = 'alert-confirm-container';
    document.body.appendChild(container);

    if (!Number.isNaN(zIndex) && typeof zIndex === 'number') {
      container.style.zIndex = String(zIndex);
      this.zIndex = zIndex;
    }
    this.container = container;
    this.title = title;
    this.content = content;
    this.footer = footer || (
      <>
        {
          type !== 'alert' && (
            <Button onClick={
              () => this.dispatch('cancel')
            }>{ cancelText || '取 消' }</Button>
          )
        }
        <Button
          type="primary"
          onClick={() => this.dispatch('ok')}
        >{ okText || '确 认' }</Button>
      </>
    );
    this.type = type;
    this.onOk = onOk;
    this.onCancel = onCancel;
    closeBefore && (this.closeBefore = closeBefore);
    this.render();
  }

  dispatch = (action: string | number): void => {
    this.action = action;
    const { closeBefore, onOk, onCancel, resolve, reject } = this;

    if (closeBefore) {
      closeBefore(action, this.closePopup.bind(this));
      return
    }
    if (action === 'ok') {
      onOk && onOk();
      resolve && resolve(this);
    }
    if (action === 'cancel' || action === 'close'){
      onCancel && onCancel();
      reject && reject(this);
    }
    this.closePopup();
  };

  closePopup = (): void => {
    this.status = 'unmount';
    this.render();
  };

  async(): Promise<AlertConfirmInterface> {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    })
  }

  render() {
    const {
      container,
      title,
      content,
      footer,
      type,
      status,
      dispatch
    } = this;

    ReactDOM.unmountComponentAtNode(container);
    ReactDOM.render(
      <Popup
        type={type}
        title={title}
        content={content}
        footer={footer}
        dispatch={action => dispatch(action)}
        status={status}
        onClosePopup={() => {
          ReactDOM.unmountComponentAtNode(container);
          document.body.removeChild(container);
        }}
      />,
      container);
  }
}

export default (options: optionsInterface | string) => {
  const _options: optionsInterface = {};
  if (typeof options === 'string') {
    _options.content = options
  } else if (typeof options === 'object') {
    Object.assign(_options, options);
  } else {
    throw new Error('options required type is object or and string!')
  }

  return new AlertConfirm(_options);
};
