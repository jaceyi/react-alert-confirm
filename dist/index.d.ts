import * as React from 'react';

interface closeBeforeInterface {
  (action: string | number, closePopup: { (): void }): void
}

interface AlertConfirmInterface {
  container: Element;
  closeBefore: closeBeforeInterface;
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  type: 'confirm' | 'alert';
  status: 'mount' | 'unmount';
  onOk: { (): void };
  onCancel: { (): void };
  dispatch: {
    (action: string | number): void;
  };
  closePopup: { (): void };
  render: {
    (callBack: { (): void }): void
  }
}

interface optionsInterface {
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  closeBefore?: closeBeforeInterface;
  onOk: { (): void };
  onCancel: { (): void };
}

export default function (options: optionsInterface): AlertConfirmInterface;

export function alert (options: optionsInterface): AlertConfirmInterface;

export namespace Button {
  export interface Props {
    type?: 'primary' | 'default';
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler;
  }
}
