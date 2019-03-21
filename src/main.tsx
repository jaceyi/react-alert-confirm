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

  constructor({title, content, footer, closeBefore, zIndex, type}) {
    const container = document.createElement('div');
    container.className = 'alert-confirm-container';
    container.style.zIndex = zIndex || 99999;
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
    this.closeBefore = closeBefore;
    this.container = container;
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

export default options => new AlertConfirm(options);
