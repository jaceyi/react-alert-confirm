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

const Popup: React.FC<PopupProps> = ({ title, content, footer, dispatch, type, status, onClosePopup }) => {
  const [classNames, setClassNames] = React.useState({
    maskClassName: 'fadeIn',
    mainClassName: 'zoomIn'
  });

  React.useEffect(() => {
    if (status !== 'mount') {
      setClassNames({
        maskClassName: 'fadeOut',
        mainClassName: 'zoomOut'
      });
    }
  }, []);

  const handleAnimationEnd = () => {
    if (status === 'unmount') {
      onClosePopup();
    } else {
      setClassNames({
        maskClassName: '',
        mainClassName: ''
      });
    }
  };

  return (
    <div className={`alert-confirm-mask ${classNames.maskClassName}`}>
      <div className={`alert-confirm-main ${classNames.mainClassName} ${type}`} onAnimationEnd={handleAnimationEnd}>
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
