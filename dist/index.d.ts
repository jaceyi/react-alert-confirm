import * as React from 'react';

interface closeBeforeInterface {
  (action: string | number, closePopup: { (): void }): void
}

interface AlertConfirmInterface {
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  zIndex: number;
  type: 'confirm' | 'alert';
  status: 'mount' | 'unmount';
  container: Element;
  onOk?: { (): void };
  onCancel?: { (): void };
  closeBefore: closeBeforeInterface;
  resolve?: { (instance: AlertConfirmInterface): void };
  reject?: { (instance: AlertConfirmInterface): void };
  dispatch: {
    (action: string | number): void;
  };
  closePopup: { (): void };
  async: { (): Promise<AlertConfirmInterface>};
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
    type?: 'default' | 'primary' | 'danger';
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler;
  }
}
