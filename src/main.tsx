import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from './components/Popup';

interface closePopupInterface {
  (): void
}

interface AlertConfirmInterface {
  container: Element
  closeBefore: {
    (action: string, closePopup: closePopupInterface): void;
  };
  dispatch: {
    (action): void;
  }
  closePopup: {
    (): void
  }
}

class AlertConfirm implements AlertConfirmInterface {
  container = null;

  constructor({title, content, footer, closeBefore, zIndex, type}: optionsInterface) {
    const container = document.createElement('div');
    container.className = 'alert-confirm-container';
    zIndex && (container.style.zIndex = String(zIndex));
    document.body.appendChild(container);
    ReactDOM.render(
      <Popup
        type={type}
        title={title}
        content={content}
        footer={footer}
        dispatch={action => this.dispatch(action)}
      />,
      container);
    this.container = container;

    closeBefore && (this.closeBefore = closeBefore);
  }

  closeBefore(action, closePopup) {
    closePopup();
  }

  /**
   * @param action
   * confirm => 确认按钮
   * cancel => 取消按钮
   * close => 关闭按钮
   */
  dispatch(action) {
    this.closeBefore(action, () => this.closePopup());
  }

  // close popup
  closePopup() {
    document.body.removeChild(this.container);
  }
}

interface optionsInterface {
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  closeBefore?: closePopupInterface;
  zIndex?: number;
  type?: 'alert' | 'confirm'
}

export default (options: optionsInterface) => {
  const instance: AlertConfirmInterface = new AlertConfirm(options);
  return instance;
};
