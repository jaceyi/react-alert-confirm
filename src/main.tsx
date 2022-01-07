import React, { CSSProperties } from 'react';
import type { ReactNode } from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import Popup, { ClosePopup, Type, Status } from './components/Popup';
import Button from './components/Button';
import languages from './languages';

export type DispatchAction = string | number;
export type Dispatch = (action: DispatchAction) => void;
type CloseBefore = (action: DispatchAction, closePopup: ClosePopup) => void;
type AlertConfirmEvent = (instance?: AlertConfirm) => void;
type GetFooter = (dispatch: Dispatch) => ReactNode;
type Footer = ReactNode | GetFooter;
type Lang = 'zh' | 'en';

export interface GlobalConfig {
  lang: Lang;
  zIndex: number;
  okText: string;
  cancelText: string;
  maskClosable: boolean;
}

/* 默认全局配置 */
export const globalConfig: GlobalConfig = {
  lang: 'zh',
  okText: languages.zh.ok,
  cancelText: languages.zh.cancel,
  zIndex: 1000,
  maskClosable: false
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
  className?: string;
  maskClassName?: string;
  style?: CSSProperties;
  maskStyle?: CSSProperties;
  maskClosable?: boolean;

  onOk?: AlertConfirmEvent;
  onCancel?: AlertConfirmEvent;
  closeBefore?: CloseBefore;
}

let parent: HTMLDivElement | null = null;
export const instanceMap = new Map<number, AlertConfirm>();

class AlertConfirm {
  $id: number;
  type: Type = 'confirm';
  title?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  zIndex!: number;
  className?: string;
  maskClassName?: string;
  style?: CSSProperties;
  maskStyle?: CSSProperties;
  maskClosable: boolean = false;

  status: Status = 'mount';
  container: HTMLDivElement;
  onOk?: AlertConfirmEvent;
  onCancel?: AlertConfirmEvent;
  closeBefore?: CloseBefore;

  constructor({
    footer,
    lang,
    zIndex,
    okText,
    cancelText,
    maskClosable,
    ...rest
  }: Options) {
    Object.assign(this, rest);
    const {
      lang: _lang,
      okText: _okText,
      cancelText: _cancelText,
      zIndex: _zIndex,
      maskClosable: _maskClosable
    } = globalConfig;

    this.$id = instanceMap.size + 1;
    instanceMap.set(this.$id, this);

    if (!parent) {
      parent = document.createElement('div');
      parent.className = 'alert-confirm-root';
      document.body.appendChild(parent);
    }
    const container: HTMLDivElement = document.createElement('div');
    parent.appendChild(container);
    container.setAttribute('data-id', String(this.$id));

    this.container = container;
    this.zIndex = zIndex ?? _zIndex ?? 1000;
    this.maskClosable = maskClosable ?? _maskClosable ?? false;

    if (footer) {
      const type = Object.prototype.toString.call(footer);
      this.footer =
        type === '[object Function]'
          ? (footer as GetFooter).call(this, this.dispatch)
          : footer;
    } else if (footer === void 0) {
      const langConfig = languages[lang || _lang];

      this.footer = (
        <>
          {this.type !== 'alert' && (
            <Button onClick={() => this.dispatch('cancel')}>
              {cancelText || _cancelText || langConfig.cancel}
            </Button>
          )}
          <Button styleType="primary" onClick={() => this.dispatch('ok')}>
            {okText || _okText || langConfig.ok}
          </Button>
        </>
      );
    }

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
    const {
      container,
      title,
      content,
      footer,
      type,
      status,
      zIndex,
      className,
      style,
      maskClassName,
      maskStyle,
      maskClosable,
      dispatch
    } = this;

    unmountComponentAtNode(container!);
    render(
      <Popup
        type={type}
        title={title}
        content={content}
        footer={footer}
        status={status}
        zIndex={zIndex}
        className={className}
        maskClassName={maskClassName}
        style={style}
        maskStyle={maskStyle}
        maskClosable={maskClosable}
        dispatch={dispatch}
        onClosePopup={() => {
          unmountComponentAtNode(container!);
          instanceMap.delete(this.$id);
          parent?.removeChild(container!);
        }}
      />,
      container
    );
  }
}

export default AlertConfirm;
