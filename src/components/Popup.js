import React, {Component, Fragment} from 'react';
import Button from './Button';

class Popup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      content,
      footer,
      width,
      dispatch
    } = this.props;

    return (
      <div>
        <div/>
        <div style={{width: width || 350}}>
          <div>
            <div>{title || '提示'}</div>
            <div onClick={() => dispatch('close')}>✕</div>
          </div>
          <div>{content}</div>
          <div>
            {
              footer || (
                <Fragment>
                  <Button onClick={() => dispatch('cancel')}>取消</>
                  <Button style={{marginLeft: 10}}
                    onClick={() => dispatch('confirm')}
                  >确认</Button>
                </Fragment>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Popup;
