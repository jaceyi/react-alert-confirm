import * as React from 'react';
import AlertConfirm, { Button } from '../lib';
import renderer from 'react-test-renderer';

test('AlertConfirm', () => {
  const button = renderer.create(
    <Button onClick={async () => {
      console.log(1);
      try {
        await AlertConfirm('hello');
      } catch (e) {
        console.log(e);
      }
    }}>
      Click
    </Button>
  );
  button.root.props.onClick();
});
