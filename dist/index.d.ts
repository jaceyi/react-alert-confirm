import * as React from 'react';

interface closePopupInterface {
  (): void
}

interface AlertConfirmInterface {
  container: Element
  closeBefore: {
    (action: string, closePopup: closePopupInterface): void;
  };
  dispatch: {
    (action): void;
  }
  closePopup: {
    (): void
  }
}

interface optionsInterface {
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  closeBefore?: closePopupInterface;
  zIndex?: number;
  type?: 'alert' | 'confirm'
}

export default function (options: optionsInterface): AlertConfirmInterface;

export namespace Button {
  export interface Props {
    type?: 'primary' | 'default';
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler;
  }
}
