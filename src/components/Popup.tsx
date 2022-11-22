import React, { createRef, Component } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import Button, { classNames } from './Button';
import languages from '../languages';

const getClassName = (visible: boolean) => ({
  animationClassName: visible ? AnimationNames.in : AnimationNames.out
});

export type DispatchAction = boolean | string | number;
export type Dispatch = (action: DispatchAction) => void;
export type DispatchRender = ReactNode | ((dispatch: Dispatch) => ReactNode);
export type HandleEvent = () => void;
type CloseBefore = (action: DispatchAction, close?: HandleEvent) => void;

export declare namespace PopupTypes {
  type Type = 'alert' | 'confirm';
  type Lang = keyof typeof languages;

  interface Config {
    type?: Type;
    zIndex?: number;
    style?: CSSProperties;
    className?: string;
    maskStyle?: CSSProperties;
    maskClassName?: string;
    maskClosable?: boolean;

    custom?: DispatchRender;
    title?: DispatchRender;
    desc?: DispatchRender;
    footer?: DispatchRender;

    lang?: Lang;
    okText?: string;
    cancelText?: string;
    onOk?: HandleEvent;
    onCancel?: HandleEvent;
    onCloseBefore?: CloseBefore;
    onCloseAfter?: HandleEvent;
  }

  interface Props extends Partial<Config> {
    visible?: boolean;
    dispatch?: Dispatch;
  }

  interface State {
    visible: boolean;
    animationClassName: AnimationNames;
  }
}

enum AnimationNames {
  in = 'alert-confirm-animation-in',
  out = 'alert-confirm-animation-out',
  empty = ''
}

class Popup extends Component<PopupTypes.Props, PopupTypes.State> {
  static config: PopupTypes.Config = {
    lang: 'en',
    okText: languages.en.ok,
    cancelText: languages.en.cancel,
    maskClosable: false
  };

  constructor(props: PopupTypes.Props) {
    super(props);

    const { visible = false } = props;

    this.state = {
      ...getClassName(visible),
      visible
    };
  }

  componentDidMount() {
    this.bindAnimation();
  }

  componentDidUpdate(prevProps: PopupTypes.Props) {
    const { visible = false } = this.props;
    if (prevProps.visible !== visible) {
      this.setState({
        ...getClassName(visible),
        visible: true
      }, () => {
        this.bindAnimation();
      });
    }
  }

  componentWillUnmount() {
    this.animationElements.forEach(element => {
      element.removeEventListener('animationend', this.animationEnd);
    });
  }

  animationCount = 0;
  animationElements: HTMLDivElement[] = [];
  bindAnimation = () => {
    const { maskRef, mainRef } = this;
    if (!maskRef.current || !mainRef.current) return;
    const elements = [maskRef.current, mainRef.current] as HTMLDivElement[];
    const bindAnimationEnd = (element: HTMLDivElement) => {
      const { animationName } = getComputedStyle(element);
      if (!animationName || animationName === 'none') {
        this.animationEnd();
      } else {
        element.removeEventListener('animationend', this.animationEnd);
        element.addEventListener('animationend', this.animationEnd);
      }
    };
    elements.forEach(bindAnimationEnd);
    this.animationCount = elements.length;
    this.animationElements = elements;
  };

  animationEnd = () => {
    const { visible = false, onCloseAfter = Popup.config.onCloseAfter } =
      this.props;
    this.animationCount--;
    if (this.animationCount === 0) {
      this.setState(
        {
          animationClassName: AnimationNames.empty,
          visible
        },
        () => {
          if (!visible) {
            onCloseAfter?.();
          }
        }
      );
    }
  };

  containerRef = createRef<HTMLDivElement>();
  maskRef = createRef<HTMLDivElement>();
  mainRef = createRef<HTMLDivElement>();

  render() {
    const { config } = Popup;
    const {
      type = config.type || 'confirm',
      zIndex = config.zIndex,
      style = config.style,
      className = config.maskClassName,
      maskStyle = config.maskStyle,
      maskClassName = config.maskClassName,
      maskClosable = config.maskClosable,

      custom = config.custom,
      title = config.title,
      desc = config.desc,
      footer = config.footer,

      lang = config.lang || 'en',
      okText = config.okText || languages[lang].ok,
      cancelText = config.cancelText || languages[lang].cancel,
      onOk = config.onOk,
      onCancel = config.onCancel,
      onCloseBefore = config.onCloseBefore,

      dispatch
    } = this.props;
    const { visible, animationClassName } = this.state;

    // merge props
    const zIndexStyle: CSSProperties = {};
    if (zIndex !== void 0) {
      Object.assign(zIndexStyle, { zIndex });
    }

    // render node
    const _dispatch: Dispatch = action => {
      if (dispatch) {
        dispatch(action);
      } else if (onCloseBefore) {
        onCloseBefore(action, onCancel);
      } else if (action === false) {
        onCancel?.();
      } else if (action === true) {
        onOk?.();
      }
    };
    const renderNode = (node: DispatchRender) =>
      typeof node === 'function' ? node(_dispatch) : node;
    const customNode = custom && renderNode(custom);
    const titleNode = title && renderNode(title);
    const descNode = desc && renderNode(desc);

    const footerNode =
      footer === void 0 ? (
        <>
          {type !== 'alert' && <Button onClick={onCancel}>{cancelText}</Button>}
          <Button styleType="primary" onClick={onOk}>
            {okText}
          </Button>
        </>
      ) : (
        renderNode(footer)
      );

    if (!visible) return null;

    return (
      <div ref={this.containerRef} className="alert-confirm-container">
        <div
          ref={this.maskRef}
          onClick={() => maskClosable && onCancel?.()}
          style={Object.assign(zIndexStyle, maskStyle)}
          className={classNames(
            'alert-confirm-mask',
            animationClassName,
            maskClassName
          )}
        >
          <div
            onClick={e => e.stopPropagation()}
            ref={this.mainRef}
            style={style}
            className={classNames('react-alert-confirm', animationClassName)}
          >
            {custom ? (
              customNode
            ) : (
              <div className={classNames('alert-confirm-main', className)}>
                <div className="alert-confirm-body">
                  <div className="alert-confirm-title">{titleNode}</div>
                  {descNode && (
                    <div className="alert-confirm-desc">{descNode}</div>
                  )}
                </div>
                {!!footerNode && (
                  <div className="alert-confirm-footer">{footerNode}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
