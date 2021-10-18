import * as React from 'react';
import Button, { Button as ButtonType } from '../src/components/Button';
import alertConfirm, { alert } from '../src/index';
import { mount, configure } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const sleep = (duration: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

describe('Button', () => {
  test('Base', () => {
    const styleType = 'primary';
    const text = 'button';
    const wrapper = mount<ButtonType.Props>(
      <Button styleType={styleType}>{text}</Button>
    );

    expect(
      wrapper.find(`.alert-confirm-button.${styleType}-button`).length
    ).toBe(1);

    expect(wrapper.text()).toBe(text);
  });

  test('bind event', () => {
    const onClick = jest.fn();
    const wrapper = mount<ButtonType.Props>(
      <Button onClick={onClick}>button</Button>
    );
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);

    wrapper.setProps({ disabled: true });
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('Popup', () => {
  test('Base', async () => {
    const text = 'Hello World!';
    const wrapper = mount<ButtonType.Props>(
      <Button
        onClick={async () => {
          const [isOk] = await alertConfirm(text);
          expect(isOk).toBe(true);
        }}
      >
        button
      </Button>
    );
    wrapper.simulate('click');
    expect(document.querySelectorAll('.alert-confirm-main').length).toBe(1);

    expect(document.querySelector('.alert-confirm-content')?.textContent).toBe(
      text
    );

    const buttons = document.querySelectorAll<HTMLButtonElement>(
      '.alert-confirm-button'
    );
    expect(buttons.length).toBe(2);
    buttons[1].click();

    await sleep(100);
    expect(document.querySelectorAll('.alert-confirm-main').length).toBe(0);
  });

  test('Option event', async () => {
    const wrapper = mount<ButtonType.Props>(
      <Button
        onClick={async () => {
          let text = '';
          await alertConfirm({
            title: 'title',
            content: 'content',
            onOk() {
              console.log('ok');
              text = 'ok';
            }
          });
          console.log(text);
          expect(text).toBe('ok');
        }}
      >
        button
      </Button>
    );
    wrapper.simulate('click');
    await sleep(100);
    document
      .querySelector<HTMLButtonElement>('.alert-confirm-button .primary-button')
      ?.click();
  });

  test('Custom footer', async () => {
    const wrapper = mount<ButtonType.Props>(
      <Button
        onClick={async () => {
          const [isOk, action] = await alertConfirm({
            title: 'title',
            content: 'content',
            footer(dispatch) {
              return (
                <>
                  <Button>One</Button>
                  <Button onClick={() => dispatch('two')}>Two</Button>
                  <Button>Three</Button>
                </>
              );
            }
          });
          expect(isOk).toBe(false);
          expect(action).toBe('two');
        }}
      >
        button
      </Button>
    );
    wrapper.simulate('click');
    const buttons = document.querySelectorAll<HTMLButtonElement>(
      '.alert-confirm-button'
    );
    expect(buttons.length).toBe(3);
    buttons[1].click();
  });

  test('Alert', async () => {
    const text = 'Alert text';
    const wrapper = mount<ButtonType.Props>(
      <Button
        onClick={() => {
          alert(text);
        }}
      >
        button
      </Button>
    );
    wrapper.simulate('click');
    const buttons = document.querySelectorAll<HTMLButtonElement>(
      '.alert-confirm-button'
    );
    expect(buttons.length).toBe(1);

    console.log(document.querySelector('.alert-confirm-content')?.textContent);
    expect(document.querySelector('.alert-confirm-content')?.textContent).toBe(
      text
    );

    buttons[0].click();
    await sleep(100);
    expect(document.querySelectorAll('.alert-confirm-main').length).toBe(0);
  });
});
