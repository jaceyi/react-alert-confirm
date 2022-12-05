# react-alert-confirm

A react component confirm dialog, support synchronous mode call（一个 React 确认对话框组件，支持同步方式调用）

[![NPM version][npm-image]][npm-url] [![npm download][download-image]][download-url] [![bundle size][bundlephobia-image]][bundlephobia-url]

[npm-image]: https://badgen.net/npm/v/react-alert-confirm?style=flat-square
[npm-url]: https://npmjs.org/package/react-alert-confirm
[download-image]: https://badgen.net/npm/dm/react-alert-confirm?style=flat-square
[download-url]: https://npmjs.org/package/react-alert-confirm
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/react-alert-confirm?style=flat-square
[bundlephobia-url]: https://bundlephobia.com/result?p=react-alert-confirm

## Docs

View [documentation pages](https://react-alert-confirm-doc.web.app/)

Preview on [CodeSandbox](https://codesandbox.io/s/react-alert-confirm-v4-79lvpw)

## Installing

```bash
yarn add react-alert-confirm
# or
npm install react-alert-confirm --save
```

## Usage

```typescript
import 'react-alert-confirm/lib/style.css';
import AlertConfirm from 'react-alert-confirm';
```

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
