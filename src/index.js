import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './Popup';

class ClassConfirm {
  constructor({title, content, footer, width, closeBefore}) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(
      <Popup
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
    this.closeBefore(action, () => {
      this.closeConfirm()
    });
  }

  // close Confirm popup
  closeConfirm() {
    document.body.removeChild(this.container);
  }
}

export default options => new ClassConfirm(options);
