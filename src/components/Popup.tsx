import React from 'react';
import type { ReactNode, CSSProperties } from 'react';
import Button from './Button';
import languages from '../languages';

const { createRef, Component } = React;

export const classNames = (...names: Array<string | undefined>) =>
  names?.filter(n => n).join(' ');

const getClassName = (visible: boolean) => ({
  animationClassName: visible ? AnimationNames.in : AnimationNames.out
});

export type Action = boolean | string | number;
export type Dispatch = (action: Action) => void;
export type Render = ReactNode | ((dispatch: Dispatch) => ReactNode);
export type CloseBefore = (action: Action) => Promise<any> | void;
type HandleEvent = () => void;

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

    custom?: Render;
    title?: Render;
    desc?: Render;
    footer?: Render;

    lang?: Lang;
    okText?: string;
    cancelText?: string;
    onOk?: HandleEvent;
    onCancel?: HandleEvent;
    closeBefore?: CloseBefore;
    closeAfter?: HandleEvent;
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

    const visible = !!props.visible;
    this.state = {
      ...getClassName(visible),
      visible
    };
  }

  componentDidMount() {
    this.bindAnimation();
  }

  componentDidUpdate(prevProps: PopupTypes.Props) {
    if (prevProps.visible !== this.props.visible) {
      this.setState(
        {
          ...getClassName(!!this.props.visible),
          visible: true
        },
        () => {
          this.bindAnimation();
        }
      );
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
    const closeAfter = this.props.closeAfter || Popup.config.closeAfter;
    const visible = !!this.props.visible;

    this.animationCount--;
    if (this.animationCount === 0) {
      this.setState(
        {
          animationClassName: AnimationNames.empty,
          visible
        },
        () => {
          !visible && closeAfter && closeAfter();
        }
      );
    }
  };

  containerRef = createRef<HTMLDivElement>();
  maskRef = createRef<HTMLDivElement>();
  mainRef = createRef<HTMLDivElement>();

  render() {
    const merge = { ...Popup.config, ...this.props };
    const { lang = 'en', onOk, onCancel } = merge;
    const { visible, animationClassName } = this.state;

    // render node
    const _dispatch: Dispatch = async action => {
      if (merge.dispatch) {
        merge.dispatch(action);
      } else if (merge.closeBefore) {
        try {
          await merge.closeBefore(action);
          onCancel && onCancel();
        } catch (e) {}
      } else if (action === false) {
        onCancel && onCancel();
      } else if (action === true) {
        onOk && onOk();
      }
    };
    const renderNode = (node: Render) =>
      typeof node === 'function' ? node(_dispatch) : node;
    const customNode = merge.custom && renderNode(merge.custom);
    const titleNode = merge.title && renderNode(merge.title);
    const descNode = merge.desc && renderNode(merge.desc);

    const footerNode =
      merge.footer === void 0 ? (
        <>
          {merge.type !== 'alert' && (
            <Button onClick={onCancel}>
              {merge.cancelText || languages[lang].cancel}
            </Button>
          )}
          <Button styleType="primary" onClick={onOk}>
            {merge.okText || languages[lang].ok}
          </Button>
        </>
      ) : (
        renderNode(merge.footer)
      );

    if (!visible) return null;

    return (
      <div ref={this.containerRef} className="alert-confirm-container">
        <div
          ref={this.maskRef}
          onClick={() => merge.maskClosable && onCancel && onCancel()}
          style={{
            zIndex: merge.zIndex,
            ...merge.maskStyle
          }}
          className={classNames(
            'alert-confirm-mask',
            animationClassName,
            merge.maskClassName
          )}
        >
          <div
            ref={this.mainRef}
            className={classNames('react-alert-main', animationClassName)}
            onClick={e => e.stopPropagation()}
          >
            {customNode ? (
              customNode
            ) : (
              <div
                className={classNames('react-alert-confirm', merge.className)}
                style={merge.style}
              >
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
