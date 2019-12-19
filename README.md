> A react component confirm dialog. （一个react的弹窗组件，支持 alert、confirm）

![GIF](https://raw.githubusercontent.com/jaceyi/react-alert-confirm/master/images/illustrate.gif)

## Installing

```shell
yarn add react-alert-confirm
// or
npm install react-alert-confirm --save
```

## Import
提供按钮组件便于样式统一
```javascript
import 'react-alert-confirm/dist/index.css';
import alertConfirm, { alert, asyncConfirm, Button } from 'react-alert-confirm';
```

## Example
### Confirm
```javascript
alertConfirm('This is Content!');
// or
alertConfirm({
  title: 'Title',
  content: 'Content',
  onOk: () => {
    console.log('ok')
  },
  onCancel: () => {
    console.log('cancel')
  }
})
```
### Alert
```javascript
// Alert
alertConfirm({
  type: 'alert',
  content: 'This is Content!'
})
// or
alert('This is Content!')
```
### Async
```javascript
async function handleClick() {
  await asyncConfirm('This is async dialog!');
  // ... ok events
}
// or
async function handleClick() {
  await alertConfirm('This is async dialog!').async();
  // ... ok events
}
```
## Options
```javascript
{
  // 弹窗的类型
  type?: 'confirm' | 'alert' = 'confirm';

  // 弹窗标题
  title?: React.ReactNode;

  // 弹窗内容
  content?: React.ReactNode;

  // 弹窗底部 用于自定义底部按钮
  footer?: React.ReactNode | { (dispatch): React.ReactNode };

  // 弹层的 z-index 默认为1000
  zIndex?: number = 1000;

  // 确认按钮的文字
  okText?: string = '确认';

  // 取消按钮的文字
  cancelText?: string = '取消';

  // 点击确认的回调
  onOk?: { (): void }

  // 点击取消或者关闭弹窗的回调
  onCancel?: { (): void }

  // 关闭弹窗之前的回调 [tip:此方法会导致 onOk 和 onCancel 失效，且异步方法 (resolve, reject) 会被此方法拦截]
  closeBefore?: {
    /**
     * @params action 触发关闭的来源，默认（ok: 确认按钮 | cancel: 取消按钮 | close: 关闭按钮）
     * @params closePopup 关闭弹窗的方法
     */
    (action: string | number, closePopup: { (): void }): void
  };
}
```

## Instance
```javascript
const instance: AlertConfirmInterface = alertConfirm({ ... }):

interface AlertConfirmInterface {

  title?: React.ReactNode;

  content?: React.ReactNode;

  footer?: React.ReactNode;

  zIndex: number = 1000;

  type: 'confirm' | 'alert' = 'confirm';

  // 实例状态
  status: 'mount' | 'unmount' = 'mount';

  // 实例被 dispatch 时候传入的 action
  action: string | number;

  container: Element;

  onOk?: { (): void };

  onCancel?: { (): void };

  // 关闭实例弹窗的方法 可以手动调用此方法来关闭实例弹窗你并卸载
  closeBefore: (action: string | number, closePopup: { (): void }): void;

  // 异步组件时才有 可以通过自定义 resolve 和 reject 来完成高阶用法
  resolve?: { (instance?: AlertConfirmInterface): void };

  reject?: { (instance?: AlertConfirmInterface): void };

   // 触发事件，传入自定义的 action，会在 closeBefore 中第一个参数返回
  dispatch: {
    (action: string | number): void;
  };

   // 关闭当前实例弹窗
  closePopup: { (): void };

  // 返回 Promise，只有点击 ok 才会 执行 resolve 返回实例内容
  async: { (): Promise<AlertConfirmInterface>};

}
```

## Button Props
```javascript
{
  // 按钮样式
  type?: 'default' | 'primary' | 'danger' = 'default';
  ...ReactNode Props
}
```

## Advanced
### 自定义 Footer
```javascript
import alertConfirm, { Button } from 'react-alert-confirm';

const instance = alertConfirm({
  title: 'Title',
  content: 'Content',
  footer: (
    <Button onClick={() => instance.dispatch('hello')}>
      Hello
    </Button>
  ),
  closeBefore(action, close) {
    switch (action) {
      case 'close':
        // ...
        break;
      case 'hello':
        // ...
        break;
    }
    close() // close popup
  }
})
```
### 异步弹窗
```javascript
import alertConfirm from 'react-alert-confirm';

async function handleClickDelete() {
  try {
    await alertConfirm('确认删除？').async();
    // ok events
  } catch ({ action }) {
    if (action === 'close') {
      // close events
    } else {
      // cancel events
    }
  }
}
```
### 自定义 Footer & 异步弹窗
```javascript
import { asyncConfirm, Button } from 'react-alert-confirm';

async function handleClickDelte() {
  await asyncConfirm({
    content: '这是一个异步弹窗！',
    footer(dispatch) {
      return (
        <Button
          onClick={() => dispatch('hello')}
          type="primary">按 钮</Button>
      )
    },
    closeBefore(action, close) {
      if (action === 'hello') {
        this.resolve(this);
      } else {
        this.reject(this);
      }
      close()
    }
  });
  // ok events
}
```
