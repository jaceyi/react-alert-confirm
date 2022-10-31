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
    const [action] = await AlertConfirm.alert(
      <span>这是 Alert ，支持ReactNode</span>
    );
    action && console.log('alert ok');
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
          await AlertConfirm.alert(
            <div>
              <span className="red">Delete error !</span>
              <em className="pointer" onClick={() => AlertConfirm.closeAll()}>
                Click here to close all popup
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

  const handleClickChangeConfig = async () => {
    const [action] = await AlertConfirm('OK => 😊, Cancel => 😭');
    if (action) {
      AlertConfirm.config({
        okText: '😊',
        cancelText: '😭'
      });
      AlertConfirm.alert('Config changed successfully!');
    }
  };

  const handleClickCustomPopup = async () => {
    const [action] = await AlertConfirm({
      className: 'my-alert-confirm',
      style: { width: '80%' },
      title: 'Custom Popup',
      maskClosable: true,
      content: <div>Some text ...</div>,
      footer: null
    });
    console.log(action);
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
        Custom Popup
      </Button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
