import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from './components/Popup';

interface closeBeforeInterface {
  (action: string | number, closePopup: { (): void }): void
}

interface optionsInterface {
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  type: 'confirm' | 'alert';
  status: 'mount' | 'unmount';
  closeBefore: closeBeforeInterface;
  onOk: { (): void }
  onCancel: { (): void }
}

class AlertConfirm {
  title?: React.ReactNode = null;
  content?: React.ReactNode = null;
  footer?: React.ReactNode = null;
  type: 'confirm' | 'alert' = 'confirm';
  status: 'mount' | 'unmount' = 'mount';
  container: Element = null;
  closeBefore: closeBeforeInterface = null;
  onOk: { (): void } = null;
  onCancel: { (): void } = null;

  constructor({ title, content, footer, closeBefore, type = 'confirm', onOk, onCancel }: optionsInterface) {
    const container = document.createElement('div');
    container.className = 'alert-confirm-container';
    document.body.appendChild(container);
    this.container = container;
    this.type = type;
    this.title = title;
    this.content = content;
    this.footer = footer;
    this.onOk = onOk;
    this.onCancel = onCancel;
    closeBefore && (this.closeBefore = closeBefore);
    this.render();
  }

  dispatch(action: string | number): void {
    const { closeBefore, onOk, onCancel } = this;

    /*优先选择 closeBefore */
    if (closeBefore) {
      closeBefore(action, this.closePopup.bind(this));
      return
    }
    if (action === 'ok') onOk && onOk();
    if (action === 'cancel' || action === 'close') onCancel && onCancel();
    this.closePopup();
  }

  closePopup(): void {
    this.status = 'unmount';
    this.render(() => {
      ReactDOM.unmountComponentAtNode(this.container);
      document.body.removeChild(this.container);
    });
  }

  render(callBack: { (): void } = null) {
    const {
      container,
      title,
      content,
      footer,
      type,
      status
    } = this;

    ReactDOM.unmountComponentAtNode(container);
    ReactDOM.render(
      <Popup
        type={type}
        title={title}
        content={content}
        footer={footer}
        dispatch={action => this.dispatch(action)}
        status={status}
        onClosePopup={callBack}
      />,
      container);
  }
}

export default (options: optionsInterface) => new AlertConfirm(options);
