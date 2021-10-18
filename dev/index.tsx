import React from 'react';
import ReactDOM from 'react-dom';
import alertConfirm, { Button, alert } from '../dist/index';
import '../dist/index.css';

alertConfirm.config({
  lang: 'en'
});

const App = () => {
  const handleClickConfirm = () => {
    alertConfirm('This is the confirmation popup !');
  };

  const handleClickAlert = async () => {
    await alertConfirm.alert(<span>这是 Alert ，支持ReactNode</span>);
    console.log('alert ok');
  };

  const handleClickAdvanced = async () => {
    const [isOk, action, instance] = await alertConfirm({
      title: '警告',
      content: '此操作将删除该任务，请确认！',
      footer(dispatch) {
        return (
          <>
            <Button onClick={() => dispatch('cancel')}>Cancel</Button>
            <Button onClick={() => dispatch('delete')} styleType="danger">
              Delete
            </Button>
          </>
        );
      },
      async closeBefore(action, close) {
        if (action === 'delete') {
          await alert('删除成功！');
          close();
        } else {
          close();
        }
      }
    });
    console.log(isOk, action, instance);
  };

  const handleClickChangeConfig = () => {
    alertConfirm.config({
      zIndex: 1024,
      okText: '😊😊',
      cancelText: '🥺🥺'
    });
    alert('OK => 😊😊, Cancel => 🥺🥺, zIndex => 1024');
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
        onClick={handleClickAdvanced}
      >
        Custom footer
      </Button>
      <Button style={{ marginLeft: 10 }} onClick={handleClickChangeConfig}>
        Change config
      </Button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
