import React from 'react';
import ReactDOM from 'react-dom';
import alertConfirm, {Button} from '../dist';

class App extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={this.handleClickBtn}>点 击</Button>
      </div>
    )
  }

  handleClickBtn = () => {
    alertConfirm({
      title: '提示',
      content: '好嗨呦，感觉人生已经到达了高潮！',
      closeBefore(action, close) {
        console.log(action);
        close();
      }
    });
  };
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
