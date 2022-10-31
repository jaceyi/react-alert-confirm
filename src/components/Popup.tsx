import React, { useRef, useState, useEffect } from 'react';
import type { ReactNode, FC, CSSProperties } from 'react';
import { classNames } from '../utils';
import { Dispatch } from '../main';

export type Type = 'alert' | 'confirm';
export type Status = 'mount' | 'unmount';
export type ClosePopup = () => void;

interface PopupProps {
  type?: Type;
  title?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  zIndex: number;
  status: Status;
  className?: string;
  maskClassName?: string;
  containerClassName?: string;
  style?: CSSProperties;
  maskStyle?: CSSProperties;
  maskClosable?: boolean;
  dispatch: Dispatch;
  onClosePopup: ClosePopup;
}

const classNameMaps = {
  mount: 'alert-confirm-animation-in',
  unmount: 'alert-confirm-animation-out'
};

const Popup: FC<PopupProps> = ({
  title,
  content,
  footer,
  zIndex,
  type,
  status,
  className,
  maskClassName,
  containerClassName,
  style,
  maskStyle,
  maskClosable,
  dispatch,
  onClosePopup
}) => {
  const maskRef = useRef<HTMLDivElement>(null);
  const [animationClassName, setAnimationClassName] = useState(
    classNameMaps[status]
  );

  useEffect(() => {
    if (maskRef.current) {
      const animationEnd = () => {
        if (status === 'unmount') {
          onClosePopup();
        } else {
          setAnimationClassName('');
        }
      };

      const { animationName } = getComputedStyle(maskRef.current);
      if (!animationName || animationName === 'none') {
        animationEnd();
      } else {
        maskRef.current.addEventListener('animationend', animationEnd);

        return () => {
          maskRef.current?.removeEventListener('animationend', animationEnd);
        };
      }
    }
  }, []);

  const zIndexStyle: CSSProperties = {};
  if (zIndex !== 1000) {
    Object.assign(zIndexStyle, { zIndex });
  }

  return (
    <div className={classNames('alert-confirm-container', containerClassName)}>
      <div
        onClick={() => maskClosable && dispatch('cancel')}
        className={classNames(
          'alert-confirm-mask',
          animationClassName,
          maskClassName
        )}
        style={Object.assign({}, zIndexStyle, maskStyle)}
      />
      <div
        ref={maskRef}
        style={Object.assign({}, zIndexStyle, style)}
        className={classNames(
          'alert-confirm-main',
          `alert-confirm-${type}`,
          animationClassName,
          className
        )}
      >
        <div className="alert-confirm-body">
          {!!title && <div className="alert-confirm-title">{title}</div>}
          <div className="alert-confirm-content">{content}</div>
        </div>
        {!!footer && <div className="alert-confirm-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Popup;
