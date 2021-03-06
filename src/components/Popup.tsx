import React, { useRef, useState, useEffect } from 'react';
import type { ReactNode, FC } from 'react';

export type Type = 'alert' | 'confirm';
export type Status = 'mount' | 'unmount';
export type DispatchAction = string | number;
export type Dispatch = (action: DispatchAction) => void;
export type ClosePopup = () => void;

interface PopupProps {
  type?: Type;
  title?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  status: Status;
  onClosePopup: ClosePopup;
}

const classNames = {
  mount: 'alert-confirm-in',
  unmount: 'alert-confirm-out'
};

const Popup: FC<PopupProps> = ({
  title,
  content,
  footer,
  type,
  status,
  onClosePopup
}) => {
  const maskRef = useRef<HTMLDivElement>(null);
  const [className, setClassName] = useState(classNames[status]);

  useEffect(() => {
    if (maskRef.current) {
      const animationEnd = () => {
        if (status === 'unmount') {
          onClosePopup();
        } else {
          setClassName('');
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

  return (
    <div ref={maskRef} className={`alert-confirm-mask ${className}`}>
      <div className={`alert-confirm-main ${type}`}>
        <div className="alert-confirm-body">
          <div className="alert-confirm-title">{title}</div>
          <div className="alert-confirm-content">{content}</div>
        </div>
        <div className="alert-confirm-footer">{footer}</div>
      </div>
    </div>
  );
};

export default Popup;
