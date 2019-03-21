import * as React from 'react';

export namespace Button {
  export interface Props {
    type?: 'primary' | 'default';
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler;
  }
}

export default class Button extends React.Component<Button.Props> {
  render() {
    const {
      type,
      children,
      onClick
    } = this.props;

    return (
      <button 
        onClick={onClick}
        className={`alert-confirm-button ${type || 'default'}`}
      >
        {children}
      </button>
    )
  }
}