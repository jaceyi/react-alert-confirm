import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import AlertConfirm, { Button } from '../lib/index';
import '../lib/style.css';
import './style.css';

AlertConfirm.config({
  maskClosable: true
});

const App = () => {
  const handleClickConfirm = () => {
    AlertConfirm('This is the confirmation popup !');
  };

  const handleClickAlert = async () => {
    await AlertConfirm.alert(<span>这是 Alert ，支持ReactNode</span>);
    console.log('alert ok');
  };

  const handleClickCustomFooter = async () => {
    const [action, instance] = await AlertConfirm({
      title: 'Confirm',
      content: 'This action will delete the product!',
      footer(dispatch) {
        return (
          <>
            <span className="pointer" onClick={() => dispatch('cancel')}>
              Cancel
            </span>
            <Button onClick={() => dispatch('delete')} styleType="danger">
              Delete
            </Button>
          </>
        );
      },
      async closeBefore(action, close) {
        if (action === 'delete') {
          await alert(
            <div>
              <span className="red">Delete error !</span>
              <em className="pointer" onClick={() => AlertConfirm.closeAll()}>
                Click to destroy all
              </em>
            </div>
          );
        } else {
          close();
        }
      }
    });
    console.log(action, instance);
  };

  const handleClickChangeConfig = () => {
    AlertConfirm.config({
      zIndex: 1024,
      okText: '😊😊',
      cancelText: '🥺🥺'
    });
    AlertConfirm.alert('OK => 😊😊, Cancel => 🥺🥺, zIndex => 1024');
  };

  const handleClickCustomPopup = () => {
    AlertConfirm.confirm({
      className: 'my-alert-confirm',
      style: { width: '80%' },
      title: 'Custom AlertConfirm',
      maskClosable: true,
      content: <div>Some text ...</div>,
      footer: null
    });
  };

  const [visible, setVisible] = useState(true);

  return (
    <div>
      <AlertConfirm
        maskClosable
        title="Hello"
        content="content"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      />
      <Button styleType="primary" onClick={handleClickConfirm}>
        Confirm
      </Button>
      <Button style={{ marginLeft: 10 }} onClick={handleClickAlert}>
        Alert
      </Button>
      <Button
        styleType="danger"
        style={{ marginLeft: 10 }}
        onClick={handleClickCustomFooter}
      >
        Custom footer
      </Button>
      <Button style={{ marginLeft: 10 }} onClick={handleClickChangeConfig}>
        Change config
      </Button>
      <Button style={{ marginLeft: 10 }} onClick={handleClickCustomPopup}>
        Custom AlertConfirm
      </Button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
