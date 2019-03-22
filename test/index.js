import * as React from 'react';
import * as ReactDOM from 'react-dom';
import alertConfirm, { Button } from '../dist';

class App extends React.Component {
  render() {
    return (
      <div>
        <Button
          type={'primary'}
          onClick={this.handleClickBtn}
        >点 击</Button>
      </div>
    )
  }

  handleClickBtn = () => {
    alertConfirm({
      title: '提示',
      content: '这是提示语，支持ReactNode',
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
