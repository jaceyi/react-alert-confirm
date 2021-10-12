import React from 'react';
import type { ReactNode } from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import Popup, {
  Dispatch,
  DispatchAction,
  ClosePopup,
  Type,
  Status
} from './components/Popup';
import Button from './components/Button';
import languages from './languages';

type CloseBefore = (action: DispatchAction, closePopup: ClosePopup) => void;
type AlertConfirmEvent = (instance?: AlertConfirm) => void;
type GetFooter = (dispatch: Dispatch) => ReactNode;
type Footer = ReactNode | GetFooter;
type Lang = 'zh' | 'en';

export interface Config {
  lang: Lang;
}
export const config: Config = {
  lang: 'zh'
};

export interface Options {
  type?: Type;
  title?: ReactNode;
  content?: ReactNode;
  footer?: Footer;
  lang?: Lang;
  zIndex?: number;
  okText?: string;
  cancelText?: string;
  onOk?: AlertConfirmEvent;
  onCancel?: AlertConfirmEvent;
  closeBefore?: CloseBefore;
}

class AlertConfirm {
  title?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  zIndex: number = 1000;
  type: Type = 'confirm';
  status: Status = 'mount';
  container: Element;
  onOk?: AlertConfirmEvent;
  onCancel?: AlertConfirmEvent;
  closeBefore: CloseBefore | null = null;

  constructor({
    title,
    content,
    footer,
    lang = config.lang,
    zIndex,
    closeBefore,
    type = 'confirm',
    onOk,
    onCancel,
    okText,
    cancelText
  }: Options) {
    const container: HTMLDivElement = document.createElement('div');
    document.body.appendChild(container);

    if (zIndex && !Number.isNaN(zIndex)) {
      container.style.zIndex = String(zIndex);
      this.zIndex = zIndex;
    }
    this.container = container;
    this.title = title;
    this.content = content;

    if (footer) {
      const type = Object.prototype.toString.call(footer);
      this.footer =
        type === '[object Function]'
          ? (footer as GetFooter).call(this, this.dispatch)
          : footer;
    } else {
      const defaultLang = languages[lang];

      this.footer = (
        <>
          {type !== 'alert' && (
            <Button onClick={() => this.dispatch('cancel')}>
              {cancelText || defaultLang?.cancel}
            </Button>
          )}
          <Button styleType="primary" onClick={() => this.dispatch('ok')}>
            {okText || defaultLang?.ok}
          </Button>
        </>
      );
    }
    this.type = type;
    this.onOk = onOk;
    this.onCancel = onCancel;
    closeBefore && (this.closeBefore = closeBefore);
    this.render();
  }

  dispatch: Dispatch = (action) => {
    const { closeBefore, onOk, onCancel } = this;

    if (action === 'ok') {
      onOk?.(this);
    }
    if (action === 'cancel' || action === 'close') {
      onCancel?.(this);
    }
    if (closeBefore) {
      closeBefore.call(this, action, this.closePopup.bind(this));
    }
  };

  closePopup = (): void => {
    this.status = 'unmount';
    this.render();
  };

  render() {
    const { container, title, content, footer, type, status } = this;

    unmountComponentAtNode(container!);
    render(
      <Popup
        type={type}
        title={title}
        content={content}
        footer={footer}
        status={status}
        onClosePopup={() => {
          unmountComponentAtNode(container!);
          document.body.removeChild(container!);
        }}
      />,
      container
    );
  }
}

export default AlertConfirm;
