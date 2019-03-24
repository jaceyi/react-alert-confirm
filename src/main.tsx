import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from './components/Popup';
import { addClassName, removeClassName } from './utils';

interface closePopupInterface {
  (action: string, closePopup: closePopupInterface): void;
}

interface AlertConfirmInterface {
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  type?: 'alert' | 'confirm'
  container: Element;
  closeBefore: closePopupInterface;
  dispatch: {
    (action: string | number): void;
  }
  closePopup: {
    (): void
  }
  animate: {
    (animation: 'show' | 'hide', callBack): void
  }
  mainRef: HTMLElement
}

class AlertConfirm implements AlertConfirmInterface {
  container = null;
  closeBefore = null;
  title = null;
  content = null;
  footer = null;
  type = null;
  mainRef = null;

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
    ReactDOM.render(
      <Popup
        mainRef={node => this.mainRef = node}
        type={type}
        title={title}
        content={content}
        footer={footer}
        dispatch={action => this.dispatch(action)}
      />,
      container);
    this.animate('show', null);
  }

  dispatch(action) {
    if (this.closeBefore) {
      this.closeBefore(action, this.closePopup.bind(this));
    } else {
      this.closePopup();
    }
  }

  closePopup() {
    this.animate('hide', () => {
      ReactDOM.unmountComponentAtNode(this.container);
      document.body.removeChild(this.container);
    });
  }

  animate(animation, callBack) {
    if (animation === 'show') {
      addClassName(this.mainRef, 'zoomIn');
      addClassName(this.container, 'fadeIn');
    } else {
      addClassName(this.mainRef, 'zoomOut');
      addClassName(this.container, 'fadeOut');
    }

    this.mainRef.addEventListener('animationend', () => {
      if (animation === 'show') {
        removeClassName(this.mainRef, 'zoomIn');
        removeClassName(this.container, 'fadeIn');
      } else {
        removeClassName(this.mainRef, 'zoomOut');
        removeClassName(this.container, 'fadeOut');
      }
      callBack && callBack();
    });
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
