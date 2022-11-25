# react-alert-confirm

A react component confirm dialog, support synchronous mode call.（一个 React 确认对话框组件，支持同步方式调用。）

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url] 
[![bundle size][bundlephobia-image]][bundlephobia-url]

[npm-image]: https://img.shields.io/npm/v/react-alert-confirm.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-alert-confirm
[download-image]: https://img.shields.io/npm/dm/react-alert-confirm.svg?style=flat-square
[download-url]: https://npmjs.org/package/react-alert-confirm
[bundlephobia-url]: https://bundlephobia.com/result?p=react-alert-confirm
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/react-alert-confirm?style=flat-square

[CodeSandbox](https://codesandbox.io/s/react-alert-confirm-v4-79lvpw)

## Installing

```bash
yarn add react-alert-confirm
# or
npm install react-alert-confirm --save
```

## Import

```typescript
import 'react-alert-confirm/lib/style.css';
import AlertConfirm from 'react-alert-confirm';
```

## Example

### Imperative

```typescript jsx
import AlertConfirm from 'react-alert-confirm';

const openConfirm = async () => {
  const [isOk] = await AlertConfirm('Are you sure?');
  if (isOk) {
    console.log('ok');
  }
}

const openConfirm2 = () => {
  AlertConfirm({
    title: 'Are you sure?',
    desc: 'description...',
    onOk: () => {
      console.log('ok');
    },
    onCancel: () => {
      console.log('cancel');
    }
  });
}

const openAlert = async () => {
  await AlertConfirm.alert('Are you sure?');
  console.log('ok');
}

const openAlert2 = async () => {
  await AlertConfirm.alert({
    title: 'Are you sure?',
    desc: 'description...',
  });
  console.log('ok');
}
```

### Render JSX

```typescript jsx
import React, { useState } from 'react';
import AlertConfirm from 'react-alert-confirm';

const Component = () => {
  const [visible, setVisible] = useState(false);

  return (
    <AlertConfirm
      title="Are you sure?"
      desc="description..."
      onOk={() => {
        console.log('ok');
        setVisible(false);
      }}
    />
  )
}
```

## Imperative API

函数调用传参 API

| Property      | Description                                                 | Type                                     | Default               |
| ------------- | ----------------------------------------------------------- | ---------------------------------------- | --------------------- |
| type          | AlertConfirm type                                           | `'confirm'` &#124; `'alert'`             | `'confirm'`           |
| zIndex        | The `z-index` of the AlertConfirm                           | `number`                                 | `1000`                |
| style         | Style of floating layer                                     | `CSSProperties`                          | -                     |
| className     | The class name of the container of the floating layer       | `string`                                 | -                     |
| maskStyle     | Style for mask element                                      | `CSSProperties`                          | -                     |
| maskClassName | The class name of the container of mask                     | `string`                                 | -                     |
| maskClosable  | Whether to close the modal dialog when the mask is clicked  | `boolean`                                | `false`               |
| custom        | Customize floating layer content                            | [DispatchRender](#types)                 | -                     |
| title         | The AlertConfirm dialog's title                             | [DispatchRender](#types)                 | -                     |
| desc          | The AlertConfirm dialog's description                       | [DispatchRender](#types)                 | -                     |
| footer        | The AlertConfirm dialog's footer, set `null` to not display | [DispatchRender](#types)                 | OK and Cancel buttons |
| lang          | Languages                                                   | `'zh'` &#124; `'en'`                     | `'en'`                |
| okText        | Text of the OK button                                       | `ReactNode`                              | OK                    |
| cancelText    | Text of the Cancel button                                   | `ReactNode`                              | Cancel                |
| onOk          | Specify a function that will be called when a user clicks mask or Cancel button | `function(e)`        | -                     |
| onCancel      | Specify a function that will be called when a user clicks the OK button | `function(e)`                | -                     |
| closeBefore | Specify a function that will be called when dispatch action, You can also just return a promise and when the promise is resolved, the modal dialog will also be closed                                                           | `(action: boolean | string | number, close) => void`| -          |
| closeAfter  | Specify a function that will be called when modal is closed completely | `function(e)`                 | -                     |

## Render JSX Props

Includes [Imperative Options](#imperative-api)（当组件使用时传参大致同 [Imperative API](#imperative-api)，`closeBefore` 的第二个参数变为可选，有没有取决于是否传入 `onCancel`）
| Property      | Description                                        | Type                                                     | Default    |
| ------------- | -------------------------------------------------- | -------------------------------------------------------- | ---------- |
| visible       | Whether the AlertConfirm is visible or not         | `boolean`                                                | `'false'`  |
| dispatch      | Events dispatch                                    | [Dispatch](#types)                                       | -          |
| closeBefore | `onCancel` may be undefined                        | `(action: boolean | string | number, onCancel?) => void` | -          |

## Advanced

### Custom Footer

```typescript jsx
import AlertConfirm, { Button } from 'react-alert-confirm';

AlertConfirm({
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
  async closeBefore(action, close) {
    if (action === 'delete') {
      await deleteProduct(); // some async events ...;
      close();
    } else {
      close();
    }
  }
});
```

### Return Values

```typescript jsx
const [action, instance] = await AlertConfirm('Alert info');
```

### closeAll

Close all `AlertConfirm` popup （关闭全部弹窗）

```typescript jsx
import AlertConfirm from 'react-alert-confirm';

AlertConfirm.closeAll();
```

## Custom

### Custom config

[All Config types](#options-and-props)（配置可选参数与调用 AlertConfirm 的传参一致）
#### Example
```typescript jsx
import AlertConfirm from 'react-alert-confirm';

AlertConfirm.config({
  lang: 'zh', // language
  zIndex: 1024
}); // update config

AlertConfirm.config(); // get config
```

## Button

| Property  | Description        | Type                                             | Default     |
| --------- | ------------------ | ------------------------------------------------ | ----------- |
| styleType | Button style type  | `'default'` &#124; `'primary'` &#124; `'danger'` | `'default'` |

The Button also contains all attributes of the ButtonHTMLAttributes

## Types

```typescript
type DispatchAction = boolean | string | number;
type Dispatch = (action: DispatchAction) => void;
type DispatchRender = ReactNode | ((dispatch: Dispatch) => ReactNode);
```
