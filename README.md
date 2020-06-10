> A react component confirm dialog. （一个react的弹窗组件，支持 alert、confirm）

在线预览 [CodeSandbox](https://codesandbox.io/s/react-alert-confirm-7ouur)

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
  await alertConfirm('Content!');
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

alert('Content')
// or
alertConfirm({
  type: 'alert',
  content: 'Content'
})
```

## Options

|属性|说明|类型|默认值|
|----|----|----|----|
|type|弹窗的类型|`'confirm'` &#124; `'alert'`|`'confirm'`|
|title|弹窗标题|`string` &#124; `ReactNode`|-|
|content|弹窗内容|`string` &#124; `ReactNode`|-|
|footer|弹窗底部，用于自定义底部按钮|`ReactNode` &#124; `dispatch => React.ReactNode`|确认、取消按钮|
|lang|默认按钮的语言|`'zh'` &#124; `'en'`|`'zh'`|
|zIndex|弹层的 z-index|`number`|`1000`|
|okText|确认按钮的文字|`string` &#124; `ReactNode`|确认/OK|
|cancelText|取消按钮的文字|`string` &#124; `ReactNode`|取消/Cancel|
|onOk|点击确认的回调|`function(e)`|-|
|onCancel|点击取消或者关闭弹窗的回调|`function(e)`|-|
|closeBefore|关闭弹窗之前的回调，调用 close 关闭弹窗|`function(action, close)`|-|

> Options 传 onOk、 onCancel、closeBefore 后将不会返回 Promise

## Button Props

|属性|说明|类型|默认值|
|----|----|----|----|
|styleType|按钮的样式|`'default'` &#124; `'primary'` &#124; `'danger'` |`'default'`|

> Button 还包含 ButtonHTMLAttributes 所有属性

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
