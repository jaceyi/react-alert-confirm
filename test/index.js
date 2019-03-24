import * as React from 'react';
import * as ReactDOM from 'react-dom';
import confirm, { Button, alert } from '../dist';

class App extends React.Component {
  render() {
    return (
      <div>
        <Button
          type={'primary'}
          onClick={this.handleClickConfirm}
        >Confirm</Button>
        <Button
          style={{marginLeft: 10}}
          onClick={this.handleClickAlert}
        >Alert</Button>
      </div>
    )
  }

  handleClickConfirm = () => {
    const instance = confirm({
      title: '提示',
      content: '这是 Confirm，支持ReactNode',
      onOk: () => {
        console.log('ok');
      },
      onCancel: () => {
        console.log('cancel')
      }
    });
    console.log(instance);
  };

  handleClickAlert = () => {
    const instance = alert({
      content: '这是 Alert ，支持ReactNode'
    });
    console.log(instance);
  };
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
