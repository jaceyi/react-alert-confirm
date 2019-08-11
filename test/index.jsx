import * as React from 'react';
import * as ReactDOM from 'react-dom';
import confirm, { Button, alert } from '../dist';
import { Fragment } from 'react';
import '../dist/index.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Button
          type="primary"
          onClick={this.handleClickConfirm}
        >Confirm</Button>
        <Button
          style={{marginLeft: 10}}
          onClick={this.handleClickAlert}
        >Alert</Button>
        <Button
          type="danger"
          style={{marginLeft: 10}}
          onClick={this.handleClickDanger}
        >Danger</Button>
      </div>
    )
  }

  handleClickConfirm = () => {
    const instance = confirm({
      title: '提示',
      content: '这是 Confirm，支持ReactNode',
      okText: 'OK',
      cancelText: 'Cancel',
      onOk: () => {
        console.log('ok', instance);
      },
      onCancel: () => {
        console.log('cancel', instance)
      }
    });
  };

  handleClickAlert = () => {
    const instance = alert({
      content: '这是 Alert ，支持ReactNode'
    });
    console.log(instance);
  };

  handleClickDanger = () => {
    const instance = confirm({
      title: '警告',
      content: '此操作将删除该任务，请确认！',
      footer: (
        <Fragment>
          <Button onClick={() => instance.dispatch('cancel')}>取 消</Button>
          <Button
            onClick={() => instance.dispatch('ok')}
            type="danger"
          >确 认</Button>
        </Fragment>
      ),
      onOk: () => {
        console.log('ok', instance);
      }
    });
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
