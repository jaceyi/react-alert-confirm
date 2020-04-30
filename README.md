> A react component confirm dialog. （一个react的弹窗组件，支持 alert、confirm）

在线预览 [CodeSandbox](https://codesandbox.io/s/react-alert-confirm-edvb8)

## Installing

```bash
yarn add react-alert-confirm
// or
npm install react-alert-confirm --save
```

## Import

```typescript
import 'react-alert-confirm/dist/index.css';
```

## Example

### Confirm

```typescript
import alertConfirm from 'react-alert-confirm';

try {
  await alertConfirm('This is Content!');
  console.log('ok')
} catch (e) {
  console.log(e, 'cancel')
}
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

```typescript
import alertConfirm, { alert } from 'react-alert-confirm';

// Alert
alertConfirm({
  type: 'alert',
  content: 'This is Content!'
})
// or
alert('This is Content!')
```

## Options

```typescript
{
  // 弹窗的类型
  type?: 'confirm' | 'alert' = 'confirm';

  // 弹窗标题
  title?: React.ReactNode;

  // 弹窗内容
  content?: React.ReactNode;

  // 弹窗底部 用于自定义底部按钮
  footer?: React.ReactNode | (dispatch) => React.ReactNode;

  // 默认按钮的语言
  lang?: 'zh' | 'en' = 'zh';

  // 弹层的 z-index
  zIndex?: number = 1000;

  // 确认按钮的文字
  okText?: string = '确认';

  // 取消按钮的文字
  cancelText?: string = '取消';

  // 点击确认的回调
  onOk?: { (): void }

  // 点击取消或者关闭弹窗的回调
  onCancel?: { (): void }

  // 关闭弹窗之前的回调，调用 closePopup 关闭弹窗
  closeBefore?: {
    /**
     * @params action 触发关闭的来源
     *         默认情况（ok: 确认按钮 | cancel: 取消按钮 | close: 关闭按钮）
     * @params closePopup 关闭弹窗的方法
     */
    (action: string | number, closePopup: { (): void }): void
  };
}
```

> Options 传 onOk、 onCancel、closeBefore 后将不会返回 Promise

## Button Props

```typescript
{
  // 按钮样式
  styleType?: 'default' | 'primary' | 'danger' = 'default';

  ...ButtonHTMLAttributes
}
```

## Advanced

### 自定义 Footer
提供按钮组件便于样式统一
```typescript
import alertConfirm, { Button } from 'react-alert-confirm';

alertConfirm({
  title: 'Title',
  content: 'Content',
  footer(dispatch) {
    return (
      <Button onClick={() => dispatch('hello')}>
        Hello
      </Button>
    )
  },
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
