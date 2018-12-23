import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/Popup';

class AlertConfirm {
  constructor({title, content, footer, width, closeBefore, zIndex, type}) {
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
        width={width}
        dispatch={action => this.dispatch(action)}
      />
      , container);
    this.closeBefore = closeBefore;
    this.container = container;
  }

  /**
   * @param action
   * default:
   * confirm => 确认按钮
   * cancel => 取消按钮
   * close => 关闭按钮
   */
  dispatch(action) {
    if (this.closeBefore) {
      this.closeBefore(action, () => this.closePopup());
      return;
    }
    this.closePopup()
  }

  // close popup
  closePopup() {
    document.body.removeChild(this.container);
  }
}

export default options => new AlertConfirm(options);
