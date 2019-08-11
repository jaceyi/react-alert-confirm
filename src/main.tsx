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

class AlertConfirm {
  title?: React.ReactNode = null;
  content?: React.ReactNode = null;
  footer?: React.ReactNode = null;
  zIndex?: number = 1000;
  type: 'confirm' | 'alert' = 'confirm';
  status: 'mount' | 'unmount' = 'mount';
  container: Element = null;
  closeBefore: closeBeforeInterface = null;
  onOk: { (): void } = null;
  onCancel: { (): void } = null;

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

    if (typeof zIndex === 'number') {
      container.style.zIndex = String(zIndex);
      this.zIndex = zIndex;
    }
    this.container = container;
    this.title = title;
    this.content = content;
    const _footer = (
      <React.Fragment>
        {
          type !== 'alert' && <Button onClick={() => this.dispatch('cancel')}>{ cancelText || '取 消' }</Button>
        }
        <Button
          type="primary"
          onClick={() => this.dispatch('ok')}
        >{ okText || '确 认' }</Button>
      </React.Fragment>
    )
    this.footer = footer || _footer;
    this.type = type;
    this.onOk = onOk;
    this.onCancel = onCancel;
    closeBefore && (this.closeBefore = closeBefore);
    this.render();
  }

  dispatch = (action: string | number): void => {
    const { closeBefore, onOk, onCancel } = this;

    if (closeBefore) {
      closeBefore(action, this.closePopup.bind(this));
      return
    }
    if (action === 'ok') onOk && onOk();
    if (action === 'cancel' || action === 'close') onCancel && onCancel();
    this.closePopup();
  }

  closePopup = (): void => {
    this.status = 'unmount';
    this.render();
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
