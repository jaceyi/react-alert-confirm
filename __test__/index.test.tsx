import * as React from 'react';
import AlertConfirm, { Button } from '../lib';
import { render, fireEvent, screen } from '@testing-library/react';

const awaitRun = (timeout = 0) =>
  new Promise(resolve => setTimeout(resolve, timeout));

describe('Button', () => {
  it('Render Button', () => {
    const testMessage = 'Test text';
    let count = 0;
    const { getByRole } = render(
      <Button onClick={() => count++}>{testMessage}</Button>
    );
    const button = getByRole('button');
    expect(button.innerHTML).toBe(testMessage);

    fireEvent.click(button);
    expect(count).toBe(1);
  });

  it('button props', () => {
    const { getByRole } = render(<Button styleType="primary"></Button>);
    const button = getByRole('button');
    expect(button.className.includes('primary-button')).toBe(true);
  });
});

describe('AlertConfirm', () => {
  const testTitle = 'Do you Want to delete these items?';
  const testDesc = 'Some descriptions';

  it('Render JSX', () => {
    let visible: boolean = true;
    let action: string = '';
    const getAlertConfirm = () => {
      return (
        <AlertConfirm
          maskClosable
          title={testTitle}
          desc={testDesc}
          visible={visible}
          onOk={() => {
            action = 'OK';
            visible = false;
          }}
          onCancel={() => {
            action = 'Cancel';
            visible = false;
          }}
        />
      );
    };
    const { rerender, getByText, queryByText } = render(getAlertConfirm());
    getByText(testTitle);
    getByText(testDesc);

    const okButton = getByText('OK');
    fireEvent.click(okButton);
    expect(action).toBe('OK');

    rerender(getAlertConfirm());
    expect(queryByText(testTitle)).toBeNull();

    visible = true;
    rerender(getAlertConfirm());
    getByText(testTitle);

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    rerender(getAlertConfirm());
    expect(action).toBe('Cancel');
    expect(queryByText(testTitle)).toBeNull();
  });

  it('Imperative confirm popup', async () => {
    const onOk = jest.fn();
    const { getByRole } = render(
      <Button
        onClick={async () => {
          const [isOk] = await AlertConfirm({
            title: testTitle,
            desc: testDesc
          });
          if (isOk) {
            onOk();
          }
        }}
      >
        Delete
      </Button>
    );
    const button = getByRole('button');
    fireEvent.click(button);
    screen.getByText(testTitle);
    screen.getByText(testDesc);

    fireEvent.click(screen.getByText('OK'));
    await awaitRun();
    expect(onOk).toHaveBeenCalled();
    expect(screen.queryByText(testTitle)).toBeNull();
  });

  it('Imperative alert popup', () => {
    const { getByRole } = render(
      <Button
        onClick={() => {
          AlertConfirm.alert(testTitle);
        }}
      >
        Delete
      </Button>
    );
    const button = getByRole('button');
    fireEvent.click(button);
    screen.getByText(testTitle);

    fireEvent.click(screen.getByText('OK'));
    expect(screen.queryByText(testTitle)).toBeNull();
  });

  it('Test imperative closeBefore and closeAfter callback', () => {
    const closeBeforeFunc = jest.fn();
    const closeAfter = jest.fn();
    const { getByRole } = render(
      <Button
        onClick={() => {
          AlertConfirm({
            title: testTitle,
            closeBefore(action, close) {
              closeBeforeFunc(action);
              close();
            },
            closeAfter: closeAfter
          });
        }}
      >
        Delete
      </Button>
    );
    const button = getByRole('button');
    fireEvent.click(button);

    fireEvent.click(screen.getByText('OK'));
    expect(closeBeforeFunc).toHaveBeenLastCalledWith(true);
    expect(closeAfter).toHaveBeenCalled();
  });

  it('Custom Footer for imperative', async () => {
    const customText = 'Custom Footer';
    const dispatchAction = jest.fn();
    const { getByRole } = render(
      <Button
        onClick={async () => {
          const [action] = await AlertConfirm({
            title: testTitle,
            footer(dispatch) {
              return (
                <Button onClick={() => dispatch('custom')}>{customText}</Button>
              );
            }
          });
          if (action) {
            dispatchAction(action);
          }
        }}
      >
        Delete
      </Button>
    );
    const button = getByRole('button');
    fireEvent.click(button);

    fireEvent.click(screen.getByText(customText));
    await awaitRun();
    expect(dispatchAction).toHaveBeenLastCalledWith('custom');
  });

  it('Verify global config', () => {
    AlertConfirm.config({
      lang: 'zh'
    });
    const defaultOkText: string = AlertConfirm.config().okText!;

    const { getByRole } = render(
      <Button
        onClick={() => {
          AlertConfirm.alert(testTitle);
        }}
      >
        Delete
      </Button>
    );
    const button = getByRole('button');
    fireEvent.click(button);
    const okButton = screen.getByText(defaultOkText);

    fireEvent.click(okButton);
    expect(screen.queryByText(defaultOkText)).toBeNull();

    const okText = 'Custom okText';
    AlertConfirm.config({
      okText: okText
    });
    fireEvent.click(button);
    screen.getByText(okText);
  });
});
