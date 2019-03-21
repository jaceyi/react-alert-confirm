import React from 'react';
import ReactDOM from 'react-dom';
import alertConfirm, { Button } from '../dist';

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
      content: '此操作会让你少活1s，请确认！',
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
