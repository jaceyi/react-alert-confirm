# react-alert-confirm

> A react popup component. （一个react的弹窗组件，支持 alert、confirm）

### Installing

```$xslt
yarn add react-alert-confirm
// or
npm install react-alert-confirm --save-dev
```

### Example
```$xslt
import alertConfirm from 'react-alert-confirm';

alertConfirm({
  title: 'Title',
  content: 'Content',
  closeBefore(function (action, close) {
    switch (action) {
      case 'confirm':
        // some event
        break;
      case 'cancel':
        // some event
        break;
      case 'close':
        // some event
        close() // 关闭弹窗
        break;
      default:
        close() // close popup
    }
  }
})

// alert
alertConfirm({
  type: 'alert',
  //...
})
```
