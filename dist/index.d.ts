import * as React from 'react';

interface closeBeforeInterface {
  (action: string | number, closePopup: { (): void }): void
}

interface AlertConfirmInterface {
  container: Element;
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  zIndex: number;
  type: 'confirm' | 'alert';
  status: 'mount' | 'unmount';
  onOk: { (): void };
  onCancel: { (): void };
  closeBefore: closeBeforeInterface;
  dispatch: {
    (action: string | number): void;
  };
  closePopup: { (): void };
  render: { (): void };
}

interface optionsInterface {
  type?: 'alert' | 'confirm';
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  zIndex?: number;
  onOk: { (): void };
  onCancel: { (): void };
  closeBefore?: closeBeforeInterface;
}

export default function (options: optionsInterface): AlertConfirmInterface;

export function alert (options: optionsInterface): AlertConfirmInterface;

export namespace Button {
  export interface Props {
    type?: 'primary' | 'default' | 'danger';
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler;
  }
}
