import * as React from 'react';

declare namespace Popup {
  interface Props {
    title?: React.ReactNode;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    dispatch: {
      (action: string | number): void;
    };
    type?: 'alert' | 'confirm';
    status: 'mount' | 'unmount';
    onClosePopup: { (): void };
  }

  interface State {
    maskClassName: string;
    mainClassName: string;
  }
}

class Popup extends React.Component<Popup.Props, Popup.State> {
  state = {
    maskClassName: '',
    mainClassName: ''
  };

  componentDidMount() {
    if (this.props.status === 'mount') {
      this.setState({
        maskClassName: 'fadeIn',
        mainClassName: 'zoomIn'
      });
    } else {
      this.setState({
        maskClassName: 'fadeOut',
        mainClassName: 'zoomOut'
      });
    }
  }

  animationEnd = () => {
    this.setState({
      maskClassName: '',
      mainClassName: ''
    });
    const { status, onClosePopup } = this.props;
    if (status === 'unmount') {
      onClosePopup();
    }
  };

  render() {
    const { maskClassName, mainClassName } = this.state;
    const { title, content, footer, dispatch, type } = this.props;

    return (
      <div className={`alert-confirm-mask ${maskClassName}`}>
        <div className={`alert-confirm-main ${mainClassName} ${type}`} onAnimationEnd={this.animationEnd}>
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
  }
}

export default Popup;
