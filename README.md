> A react component confirm dialog. （一个 react 的弹窗组件，支持 alert、confirm）

在线预览 [CodeSandbox](https://codesandbox.io/s/react-alert-confirm-v3-k0gc4)

## Installing

```bash
yarn add react-alert-confirm
// or
npm install react-alert-confirm --save
```

## Import

```typescript
import 'react-alert-confirm/dist/index.css';
import alertConfirm from 'react-alert-confirm';
```

## Example

### Confirm

```typescript jsx
import alertConfirm, { confirm } from 'react-alert-confirm';

const [isOk] = await alertConfirm('Content');
if (isOk) {
  console.log('ok');
}
// or
confirm('Content');
// or
alertConfirm({
  title: 'Title',
  content: 'Content',
  onOk: () => {
    console.log('ok');
  },
  onCancel: () => {
    console.log('cancel');
  }
});
```

### Alert

```typescript jsx
import alertConfirm, { alert } from 'react-alert-confirm';

alertConfirm.alert('Content');
// or
alert('Content');
// or
alertConfirm({
  type: 'Title',
  content: 'Content'
});
```

## Options

| 属性          | 说明                                    | 类型                                             | 默认值         |
| ------------- | --------------------------------------- | ------------------------------------------------ | -------------- |
| type          | 弹窗的类型                              | `'confirm'` &#124; `'alert'`                     | `'confirm'`    |
| title         | 弹窗标题                                | `string` &#124; `ReactNode`                      | -              |
| content       | 弹窗内容                                | `string` &#124; `ReactNode`                      | -              |
| footer        | 弹窗底部，用于自定义底部按钮            | `ReactNode` &#124; `dispatch => React.ReactNode` | 确认、取消按钮 |
| lang          | 默认按钮的语言                          | `'zh'` &#124; `'en'`                             | `'zh'`         |
| zIndex        | 弹层的 z-index                          | `number`                                         | `1000`         |
| okText        | 确认按钮的文字                          | `string` &#124; `ReactNode`                      | 确认/OK        |
| cancelText    | 取消按钮的文字                          | `string` &#124; `ReactNode`                      | 取消/Cancel    |
| className     | 对话框的 className                      | `string`                                         | -              |
| maskClassName | 遮罩的 className                        | `string`                                         | -              |
| style         | 对话框的样式                            | `CSSProperties`                                  | -              |
| maskStyle     | 遮罩的样式                              | `CSSProperties`                                  | -              |
| maskClosable  | 点击遮罩可关闭                          | `boolean`                                        | false          |
| onOk          | 点击确认的回调                          | `function(e)`                                    | -              |
| onCancel      | 点击取消或者关闭弹窗的回调              | `function(e)`                                    | -              |
| closeBefore   | 关闭弹窗之前的回调，调用 close 关闭弹窗 | `function(action, close)`                        | -              |

## Advanced

更多自定义用法

### Custom Footer

自定义 Footer，并提供按钮组件便于样式统一

```typescript jsx
import alertConfirm, { Button } from 'react-alert-confirm';

const [isOk, action, instance] = await alertConfirm({
  title: '警告',
  content: '此操作将删除该任务，请确认！',
  footer(dispatch) {
    return (
      <>
        <Button onClick={() => dispatch('ok')}>OK</Button>
        <Button onClick={() => dispatch('no')} styleType="primary">
          NO
        </Button>
      </>
    );
  },
  async closeBefore(action, close) {
    if (action === 'no') {
      await alert('Click NO');
      close();
    } else {
      close();
    }
  }
});
console.log(isOk, action, instance);
```

### Return Values

```typescript jsx
const [isOk, action] = await alert('Alert info');
```

| 属性   | 说明           | 类型      |
| ------ | -------------- | --------- |
| isOk   | 是否点击的确认 | `booleal` |
| action | 选择的 action  | `string`  |

## Custom

### Languages

设置全局语言

```typescript jsx
import alertConfirm from 'react-alert-confirm';

alertConfirm.config({
  lang: 'en'
});

alertConfirm.config(); // Get current config
```

### Other config

| 属性        | 说明                                    | 类型                        | 默认值      |
| ----------- | --------------------------------------- | --------------------------- | ----------- |
| lang        | 默认按钮的语言                          | `'zh'` &#124; `'en'`        | `'zh'`      |
| zIndex      | 弹层的 z-index                          | `number`                    | `1000`      |
| okText      | 确认按钮的文字                          | `string` &#124; `ReactNode` | 确认/OK     |
| cancelText  | 取消按钮的文字                          | `string` &#124; `ReactNode` | 取消/Cancel |
| closeBefore | 关闭弹窗之前的回调，调用 close 关闭弹窗 | `function(action, close)`   | -           |

```typescript jsx
import alertConfirm from 'react-alert-confirm';

alertConfirm.config({
  lang: 'en',
  zIndex: 1024,
  okText: 'YES',
  cancelText: 'NO',
  closeBefore: (action, close) => {}
});

alertConfirm.config(); // 获取当前配置
```

### destroyAll

```typescript jsx
import alertConfirm from 'react-alert-confirm';

alertConfirm.destroyAll(); // 销毁全部弹窗
```

## Button

为了自定义按钮时样式统一，增加了 Button 组件。

### Props

| 属性      | 说明       | 类型                                             | 默认值      |
| --------- | ---------- | ------------------------------------------------ | ----------- |
| styleType | 按钮的样式 | `'default'` &#124; `'primary'` &#124; `'danger'` | `'default'` |

> Button 还包含 ButtonHTMLAttributes 所有属性
