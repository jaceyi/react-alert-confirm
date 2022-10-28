import React, { createRef, Component } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import Button from './Button';
import languages from '../languages';

export const classNames = (...names: Array<string | undefined>) =>
  names?.filter(n => n).join(' ');
const isFunc = (o: any) =>
  Object.prototype.toString.call(o) === '[object Function]';
const getClassName = (visible: boolean) => ({
  animationClassName: visible ? AnimationNames.in : AnimationNames.out
});

type HandleEvent = () => void;
type RenderNode = ReactNode | (() => ReactNode);
enum AnimationNames {
  in = 'alert-confirm-animation-in',
  out = 'alert-confirm-animation-out',
  empty = ''
}
export declare namespace PopupTypes {
  type Type = 'alert' | 'confirm';
  type Lang = keyof typeof languages;

  interface Config {
    type?: Type;

    style?: CSSProperties;
    zIndex?: number;
    className?: string;
    maskClassName?: string;
    maskStyle?: CSSProperties;
    maskClosable?: boolean;

    title?: RenderNode;
    footer?: RenderNode;
    content?: RenderNode;

    lang?: Lang;
    okText?: string;
    cancelText?: string;
    onOk?: HandleEvent;
    onCancel?: HandleEvent;
  }

  interface Props extends Partial<Config> {
    visible?: boolean;
    onCloseAfter?: HandleEvent;
  }

  interface State {
    visible: boolean;
    animationClassName: AnimationNames;
  }
}

export const globalConfig: PopupTypes.Config = {
  lang: 'en',
  okText: languages.en.ok,
  cancelText: languages.en.cancel,
  maskClosable: false
};

class Popup extends Component<PopupTypes.Props, PopupTypes.State> {
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
      this.setState(getClassName(visible), () => {
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
    const { visible = false, onCloseAfter } = this.props;
    this.animationCount--;
    if (this.animationCount <= 0) {
      this.setState({
        visible
      });
      if (!visible) {
        onCloseAfter?.();
      }
    }
  };

  containerRef = createRef<HTMLDivElement>();
  maskRef = createRef<HTMLDivElement>();
  mainRef = createRef<HTMLDivElement>();

  render() {
    const {
      title,
      content,
      footer,
      zIndex,
      lang = globalConfig.lang || 'en',
      okText = globalConfig.okText || languages[lang].ok,
      cancelText = globalConfig.cancelText || languages[lang].cancel,
      type,
      className,
      maskClassName,
      style,
      maskStyle,
      maskClosable,
      onOk,
      onCancel
    } = this.props;
    const { visible, animationClassName } = this.state;

    // merge props
    const zIndexStyle: CSSProperties = {};
    if (zIndex !== void 0) {
      Object.assign(zIndexStyle, { zIndex });
    }

    // handle node
    const renderNode = (node: RenderNode) =>
      isFunc(node) ? (node as Function)() : (node as ReactNode);
    const titleNode = title && renderNode(title);

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
          className={classNames(
            'alert-confirm-mask',
            animationClassName,
            maskClassName
          )}
          style={Object.assign({}, zIndexStyle, maskStyle)}
        />
        <div
          ref={this.mainRef}
          style={Object.assign({}, zIndexStyle, style)}
          className={classNames(
            'alert-confirm-main',
            `alert-confirm-${type}`,
            animationClassName,
            className
          )}
        >
          <div className="alert-confirm-body">
            {!!titleNode && (
              <div className="alert-confirm-title">{titleNode}</div>
            )}
            <div className="alert-confirm-content">{renderNode(content)}</div>
          </div>
          {!!footerNode && (
            <div className="alert-confirm-footer">{footerNode}</div>
          )}
        </div>
      </div>
    );
  }
}

export default Popup;
