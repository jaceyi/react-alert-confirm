import * as React from 'react';
import Button from '../src/components/Button';
import * as ShallowRenderer from 'react-test-renderer/shallow';

test('Button style and text', () => {
  const renderer = new ShallowRenderer();
  const styleType = 'primary';
  const text = 'button';
  renderer.render(<Button styleType={styleType}>{text}</Button>);
  const button = renderer.getRenderOutput();

  expect(button.type).toBe('button');
  expect(button.props.className).toBe(
    `alert-confirm-button ${styleType || 'default'}-button`
  );
  expect(button.props.children).toBe(text);
});
