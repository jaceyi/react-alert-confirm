import React, {Component, Fragment} from 'react';
import Button from './Button';

class Popup extends Component {
  render() {
    const {
      title,
      content,
      footer,
      width,
      dispatch,
      type
    } = this.props;
    const isAlert = type !== 'alert';

    return (
      <Fragment>
        <div className={'alert-confirm-shadow'}/>
        <div className={'alert-confirm-main'} style={{width: width || 360}}>
          <div className={'alert-confirm-header'}>
            <div className={'alert-confirm-header-title'}>{title || '提示'}</div>
            {
              isAlert && <div className={'alert-confirm-header-close'} onClick={() => dispatch('close')}>✕</div>
            }
          </div>
          <div className={'alert-confirm-body'}>{content}</div>
          <div className={'alert-confirm-footer'}>
            {
              footer || (
                <Fragment>
                  {
                    isAlert && <Button onClick={() => dispatch('cancel')}>取消</Button>
                  }
                  <Button
                    type={'primary'}
                    style={{marginLeft: 10}}
                    onClick={() => dispatch('confirm')}
                  >确认</Button>
                </Fragment>
              )
            }
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Popup;
