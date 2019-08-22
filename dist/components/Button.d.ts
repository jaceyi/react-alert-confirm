import * as React from 'react';
export declare namespace Button {
    interface Props {
        type?: 'primary' | 'default' | 'danger';
        children?: React.ReactNode;
        style?: React.CSSProperties;
        onClick?: React.MouseEventHandler;
    }
}
declare class Button extends React.Component<Button.Props> {
    render(): JSX.Element;
}
export default Button;
