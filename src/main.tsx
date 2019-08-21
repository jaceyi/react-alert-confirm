import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from './components/Popup';
import Button from './components/Button';

interface closeBeforeInterface {
  (action: string | number, closePopup: { (): void }): void
}

interface optionsInterface {
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  zIndex?: number;
  type: 'confirm' | 'alert';
  closeBefore: closeBeforeInterface;
  onOk: { (): void }
  onCancel: { (): void }
}

interface AlertConfirmInterface {
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  zIndex: number;
  type: 'confirm' | 'alert';
  status: 'mount' | 'unmount';
  container: Element;
  onOk?: { (): void };
  onCancel?: { (): void };
  closeBefore: closeBeforeInterface;
  resolve?: { (instance: AlertConfirmInterface): void };
  reject?: { (instance: AlertConfirmInterface): void };
  dispatch: {
    (action: string | number): void;
  };
  closePopup: { (): void };
  async: { (): Promise<AlertConfirmInterface>};
}

class AlertConfirm {
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  zIndex: number = 1000;
  type: 'confirm' | 'alert' = 'confirm';
  status: 'mount' | 'unmount' = 'mount';
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
    const _footer = (
      <React.Fragment>
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
      </React.Fragment>
    );
    this.footer = footer || _footer;
    this.type = type;
    this.onOk = onOk;
    this.onCancel = onCancel;
    closeBefore && (this.closeBefore = closeBefore);
    this.render();
  }

  dispatch = (action: string | number): void => {
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

export default (options: optionsInterface) => new AlertConfirm(options);
