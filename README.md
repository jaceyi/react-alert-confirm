# react-alert-confirm

A react component confirm dialog, support synchronous mode call（一个 React 确认对话框组件，支持同步方式调用）

[![NPM version][npm-image]][npm-url] [![npm download][download-image]][download-url] [![bundle size][bundlephobia-image]][bundlephobia-url]

[npm-image]: https://img.shields.io/npm/v/react-alert-confirm.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-alert-confirm
[download-image]: https://img.shields.io/npm/dm/react-alert-confirm.svg?style=flat-square
[download-url]: https://npmjs.org/package/react-alert-confirm
[bundlephobia-url]: https://bundlephobia.com/result?p=react-alert-confirm
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/react-alert-confirm?style=flat-square

<a href="https://codesandbox.io/s/react-alert-confirm-v4-79lvpw" rel="nofollow">
  <img width="100px" src="https://cdn.icon-icons.com/icons2/2098/PNG/512/codesandbox_icon_128900.png" alt="CodeSandbox" />
  <div><b>CodeSandbox</b></div>
</a>

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
};

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
};

const openAlert = async () => {
  await AlertConfirm.alert('Are you sure?');
  console.log('ok');
};

const openAlert2 = async () => {
  await AlertConfirm.alert({
    title: 'Are you sure?',
    desc: 'description...'
  });
  console.log('ok');
};
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
  );
};
```

## Imperative API

函数调用传参 API

| Property      | Description                                                                         | Type                         | Default               |
| ------------- | ----------------------------------------------------------------------------------- | ---------------------------- | --------------------- |
| type          | AlertConfirm type                                                                   | `'confirm'` &#124; `'alert'` | `'confirm'`           |
| zIndex        | The `z-index` of the AlertConfirm                                                   | `number`                     | `1000`                |
| style         | Style of floating layer                                                             | `CSSProperties`              | -                     |
| className     | The class name of the container of the floating layer                               | `string`                     | -                     |
| maskStyle     | Style for mask element                                                              | `CSSProperties`              | -                     |
| maskClassName | The class name of the container of mask                                             | `string`                     | -                     |
| maskClosable  | Whether to close the modal dialog when the mask is clicked                          | `boolean`                    | `false`               |
| custom        | Customize floating layer content                                                    | [Render Type](#types)        | -                     |
| title         | The AlertConfirm dialog's title                                                     | [Render Type](#types)        | -                     |
| desc          | The AlertConfirm dialog's description                                               | [Render Type](#types)        | -                     |
| footer        | The AlertConfirm dialog's footer, set `null` to not display                         | [Render Type](#types)        | OK and Cancel buttons |
| lang          | Languages                                                                           | `'zh'` &#124; `'en'`         | `'en'`                |
| okText        | Text of the OK button                                                               | `ReactNode`                  | `'OK'`                |
| cancelText    | Text of the Cancel button                                                           | `ReactNode`                  | `'Cancel'`            |
| onOk          | Specify a function that will be called when a user clicks mask or Cancel button     | `function(e)`                | -                     |
| onCancel      | Specify a function that will be called when a user clicks the OK button             | `function(e)`                | -                     |
| closeBefore   | Specify a function that will be called when dispatch action [Usage](#custom-footer) | [CloseBefore Type](#types)   | -                     |
| closeAfter    | Specify a function that will be called when modal is closed completely              | `function(e)`                | -                     |

## Render JSX Props

Includes [Imperative Options](#imperative-api)

当组件使用时传参比 [Imperative API](#imperative-api) 多了下面几个选项

| Property | Description                                | Type                    | Default   |
| -------- | ------------------------------------------ | ----------------------- | --------- |
| visible  | Whether the AlertConfirm is visible or not | `boolean`               | `'false'` |
| dispatch | Events dispatch                            | [Dispatch Type](#types) | -         |

## Advanced

### Custom Footer

**closeBefore**: Specify a function that will be called when dispatch action, You can also just return a promise and when the promise is resolved, the modal dialog will also be closed.

**closeBefore**: 对话框触发 `Action` 之后调用，可以在里面判断 `Action` 可以使用 Promise 做异步逻辑，返回 `Promise.resolve()` 时将关闭对话框。

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
  async closeBefore(action) {
    if (action === 'delete') {
      await deleteProduct(); // some async events ...;
      // promise is resolved close
    }
    // auto close
  }
});
```

### Return Values

```typescript jsx
const [action, instance] = await AlertConfirm('Alert info');
```

### closeAll

Close all `AlertConfirm` dialog

```typescript jsx
import AlertConfirm from 'react-alert-confirm';

AlertConfirm.closeAll();
```

## Custom

### Custom config

All Config Types [Imperative API](#imperative-api)

配置可选参数同 [Imperative API](#imperative-api)

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

The Button also contains all attributes of the `ButtonHTMLAttributes`

相比 HTML `button` 多了下面一个参数用来预设按钮样式

| Property  | Description       | Type                                             | Default     |
| --------- | ----------------- | ------------------------------------------------ | ----------- |
| styleType | Button style type | `'default'` &#124; `'primary'` &#124; `'danger'` | `'default'` |

## Types

```typescript
type Action = boolean | string | number;
type Dispatch = (action: Action) => void;
type Render = ReactNode | ((dispatch: Dispatch) => ReactNode);
type CloseBefore = (action: Action) => Promise<any> | void;
```
