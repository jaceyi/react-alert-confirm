import React from 'react';
import ReactDOM from 'react-dom';
import alertConfirm, { Button, alert } from '../lib/index';
import '../lib/style.css';
import './style.css';

alertConfirm.config({
  lang: 'en',
  maskClosable: true
});

const App = () => {
  const handleClickConfirm = () => {
    alertConfirm('This is the confirmation popup !');
  };

  const handleClickAlert = async () => {
    await alertConfirm.alert(<span>这是 Alert ，支持ReactNode</span>);
    console.log('alert ok');
  };

  const handleClickCustomFooter = async () => {
    const [isOk, action, instance] = await alertConfirm({
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
              <em className="pointer" onClick={() => alertConfirm.destroyAll()}>
                Click to destroy all
              </em>
            </div>
          );
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

  const handleClickCustomPopup = () => {
    alertConfirm({
      className: 'my-alert-confirm',
      style: { width: '80%' },
      title: 'Custom Popup',
      maskClosable: true,
      content: <div>Some text ...</div>,
      footer: null
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
