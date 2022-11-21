import * as React from 'react';
import AlertConfirm, { Button } from '../lib';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

it('AlertConfirm', () => {
  const button = renderer.create(
    <Button
      onClick={async () => {
        await AlertConfirm('hello');
      }}
    >
      Click
    </Button>
  );
  button.root.props.onClick();
  console.log(document.querySelector('.react-alert-confirm'));
});
