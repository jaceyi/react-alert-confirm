# react-alert-confirm

> A react popup component. （一个react的弹窗组件，支持 alert、confirm）

### Installing

```$xslt
yarn add react-alert-confirm
// or
npm install react-alert-confirm --save
```

## Example

```$xslt
import alertConfirm, {Button} from 'react-alert-confirm';

alertConfirm({
  title: 'Title',
  content: 'Content',
  closeBefore(action, close) {
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

// button 提供统一风格的Button
const instance = alertConfirm({
  title: 'title',
  content: 'content',
  footer: (
    <div>
      <Button onClick={() => instance.dispatch('hello')}>
        Hello
      </Button>
    </div>
  ),
  closeBefore(action, close) {
    switch (action) {
      case 'hello':
        // some event
        break;
      case 'close':
        // some event
        close();
      default:
        close();
    }
  }
})
```

## Options

```$xslt
{
  title: <div>title</div>,
  content: <div>demo</div>,
  footer: null,
  
  // [string] 弹窗类型 default is confirm type
  type: 'alert',
  
  // [number] 弹窗宽度
  width: 360,
  
  // [number]
  zIndex: 99999,
  
  /**
   * @param action
   * default:
   * confirm => 确认按钮
   * cancel => 取消按钮
   * close => 关闭按钮
   *
   * @param close
   * Close the popup callback function
   */
  closeBefore(action, close) {
    // some event
    close()
  }
}
```

## Instance

```$xslt
const instance = alertConfirm([options: object]): object

// popup最外层container元素
instance.container

// 触发 closeBefore 事件
instance.dispatch([action: string]): void

// 关闭当前弹窗
instance.closeConfirm(): void
```
