import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from './components/Popup';

interface closePopupInterface {
  (action: string, closePopup: closePopupInterface): void;
}

interface AlertConfirmInterface {
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  type?: 'alert' | 'confirm'
  container: Element;
  animateTimer: number;
  closeBefore: closePopupInterface;
  dispatch: {
    (action): void;
  }
  closePopup: {
    (): void
  }
  render: {
    (): void
  }
}

class AlertConfirm implements AlertConfirmInterface {
  container = null;
  closeBefore = null;
  animateTimer = null;
  title = null;
  content = null;
  footer = null;
  type = null;

  constructor({title, content, footer, closeBefore, type}: optionsInterface) {
    this.title = title;
    this.content = content;
    this.footer = footer;
    this.type = type;
    const container = document.createElement('div');
    container.className = 'alert-confirm-container';
    document.body.appendChild(container);
    this.container = container;
    closeBefore && (this.closeBefore = closeBefore);
    this.render();
  }

  dispatch(action) {
    if (this.closeBefore) {
      this.closeBefore(action, this.closePopup.bind(this));
    } else {
      this.closePopup();
    }
  }

  closePopup() {
    this.render();
    // document.body.removeChild(this.container);
  }

  render() {
    const { container, type, title, content, footer } = this;

    if (ReactDOM.unmountComponentAtNode(container)) {
      return
    }

    ReactDOM.render(
      <Popup
        type={type}
        title={title}
        content={content}
        footer={footer}
        dispatch={action => this.dispatch(action)}
      />,
      container);
  }
}

interface optionsInterface {
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  closeBefore?: closePopupInterface;
  type?: 'alert' | 'confirm'
}

export default (options: optionsInterface) => new AlertConfirm(options);
