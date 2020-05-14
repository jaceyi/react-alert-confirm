import * as React from 'react';

export type Type = 'alert' | 'confirm';
export type Status = 'mount' | 'unmount';
export type DispatchAction = string | number;
export type Dispatch = (action: DispatchAction) => void;
export type ClosePopup = () => void;

interface PopupProps {
  type?: Type;
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  status: Status;
  dispatch: Dispatch;
  onClosePopup: ClosePopup;
}

const classNames = {
  mount: 'alert-confirm-in',
  unmount: 'alert-confirm-out'
};

const Popup: React.FC<PopupProps> = ({
  title,
  content,
  footer,
  dispatch,
  type,
  status,
  onClosePopup
}) => {
  const maskRef = React.useRef<HTMLDivElement>(null);
  const [className, setClassName] = React.useState(classNames[status]);

  React.useEffect(() => {
    const { animationName } = getComputedStyle(maskRef.current);
    if (animationName === 'none') {
      animationEnd();
    } else {
      maskRef.current.addEventListener('animationend', animationEnd);

      return () =>
        maskRef.current.removeEventListener('animationend', animationEnd);
    }
  }, []);

  const animationEnd = () => {
    if (status === 'unmount') {
      onClosePopup();
    } else {
      setClassName('');
    }
  };

  return (
    <div ref={maskRef} className={`alert-confirm-mask ${className}`}>
      <div className={`alert-confirm-main ${type}`}>
        <div className="alert-confirm-header">{title}</div>
        {type !== 'alert' && (
          <div className="alert-confirm-header-close">
            <span className="icon" onClick={() => dispatch('close')}>
              ✕
            </span>
          </div>
        )}
        <div className="alert-confirm-content">{content}</div>
        <div className="alert-confirm-footer">{footer}</div>
      </div>
    </div>
  );
};

export default Popup;
