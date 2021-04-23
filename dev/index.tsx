import * as React from 'react';
import * as ReactDOM from 'react-dom';
import confirm, { Button, alert } from '../dist/index';
import '../dist/index.css';

const App = () => {
  const handleClickConfirm = () => {
    confirm({
      title: 'title',
      content: 'This is the confirmation popup !',
      lang: 'en',
      onOk: () => {
        console.log('ok');
      },
      onCancel: () => {
        console.log('cancel');
      }
    });
  };

  const handleClickAlert = async () => {
    await alert(<span>这是 Alert ，支持ReactNode</span>);
    console.log('alert ok');
  };

  const handleClickDanger = async () => {
    const [isOk, action] = await confirm({
      title: '警告',
      content: '此操作将删除该任务，请确认！'
    });
    if (isOk) {
      console.log('Click Ok');
    } else {
      console.log(action);
    }
  };

  const handleClickAdvanced = async () => {
    const [isOk, action] = await confirm({
      title: '警告',
      content: '此操作将删除该任务，请确认！',
      footer(dispatch) {
        return (
          <>
            <Button onClick={() => dispatch('ok')}>OK</Button>
            <Button onClick={() => dispatch('no')} styleType="primary">
              NO
            </Button>
          </>
        );
      },
      async closeBefore(action, close) {
        if (action === 'no') {
          await alert('Click NO');
          close();
        } else {
          close();
        }
      }
    });
    console.log(isOk, action);
  };

  return (
    <div>
      <Button styleType="primary" onClick={handleClickConfirm}>
        Confirm
      </Button>
      <Button style={{ marginLeft: 10 }} onClick={handleClickAlert}>
        Alert
      </Button>
      <Button
        styleType="danger"
        style={{ marginLeft: 10 }}
        onClick={handleClickDanger}
      >
        Danger
      </Button>
      <Button
        styleType="primary"
        style={{ marginLeft: 10 }}
        onClick={handleClickAdvanced}
      >
        Advanced
      </Button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
