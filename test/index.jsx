import * as React from 'react';
import * as ReactDOM from 'react-dom';
import confirm, { Button, alert } from '../dist/index';
import { Fragment } from 'react';
import '../dist/index.css';

const App = () => {
  const handleClickConfirm = () => {
    const instance = confirm({
      title: 'title',
      content: 'This is the confirmation popup !',
      lang: 'en',
      onOk: () => {
        console.log('ok', instance);
      },
      onCancel: () => {
        console.log('cancel', instance);
      }
    });
  };

  const handleClickAlert = async cb => {
    const instance = await alert(<span>这是 Alert ，支持ReactNode</span>);
    console.log(instance);
    if (cb instanceof Function) cb();
  };

  const handleClickDanger = () => {
    confirm({
      title: '警告',
      content: '此操作将删除该任务，请确认！',
      footer: dispatch => (
        <Fragment>
          <Button onClick={() => dispatch('cancel')}>取 消</Button>
          <Button onClick={() => dispatch('ok')} styleType="danger">
            删 除
          </Button>
        </Fragment>
      ),
      closeBefore: (action, close) => {
        if (action === 'cancel') {
          handleClickAlert(close);
        } else {
          close();
        }
      }
    });
  };

  return (
    <div>
      <Button styleType="primary" onClick={handleClickConfirm}>
        Confirm
      </Button>
      <Button style={{ marginLeft: 10 }} onClick={handleClickAlert}>
        Alert
      </Button>
      <Button styleType="danger" style={{ marginLeft: 10 }} onClick={handleClickDanger}>
        Danger
      </Button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
