import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import AlertConfirm, { Button } from 'react-alert-confirm';
import 'react-alert-confirm/lib/style.css';
import './style.css';

AlertConfirm.config({
  maskClosable: true,
  onCloseAfter: () => {
    console.log('close');
  }
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
      desc: 'This action will delete the product!',
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
      async onCloseBefore(action, close) {
        if (action === 'delete') {
          await AlertConfirm.alert({
            title: (
              <div>
                <span className="red">Delete error !</span>
              </div>
            ),
            desc: (
              <em className="pointer" onClick={() => AlertConfirm.closeAll()}>
                Click here to close all popup
              </em>
            )
          });
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
      custom: dispatch => (
        <div className="custom-popup">
          <div>Custom popup</div>
          <div style={{ marginTop: 10 }}>
            <button onClick={() => dispatch(false)}>Close</button>
          </div>
        </div>
      )
    });
    console.log(action);
  };

  const [visible, setVisible] = useState(true);

  return (
    <div>
      <AlertConfirm
        maskClosable
        title="Do you Want to delete these items?"
        desc="Some descriptions"
        visible={visible}
        okText="Yes"
        onOk={() => {
          setVisible(false);
          AlertConfirm.alert('Click Yes');
        }}
        cancelText="No"
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
