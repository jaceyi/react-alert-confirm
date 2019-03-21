import * as React from 'react';
import Button from './Button';

export namespace Popup {
  export interface Props {
    title?: React.ReactNode;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    dispatch: {
      (action: string): void
    };
    type?: 'alert' | 'confirm'
  }
}

class Popup extends React.Component<Popup.Props> {
  render() {
    const {
      title,
      content,
      footer,
      dispatch,
      type
    } = this.props;
    const isAlert = type !== 'alert';

    return(
      <React.Fragment>
        <div className={'alert-confirm-shadow'}/>
        <div className={'alert-confirm-main'}>
          <div className={'alert-confirm-header'}>
            <div className={'alert-confirm-header-title'}>{title || '提示'}</div>
            {
              isAlert && (
                <div className={'alert-confirm-header-close'}>
                  <span className={'icon'} onClick={() => dispatch('close')}>✕</span>
                </div>
              )
            }
          </div>
          <div className={'alert-confirm-body'}>{content}</div>
          <div className={'alert-confirm-footer'}>
            {
              footer || (
                <React.Fragment>
                  {
                    isAlert && <Button onClick={() => dispatch('cancel')}><span>取 消</span></Button>
                  }
                  <Button
                    type="primary"
                    style={{marginLeft: 10}}
                    onClick={() => dispatch('confirm')}
                  >确 认</Button>
                </React.Fragment>
              )
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Popup;
