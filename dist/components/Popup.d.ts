import * as React from 'react';
declare namespace Popup {
    interface Props {
        title?: React.ReactNode;
        content?: React.ReactNode;
        footer?: React.ReactNode;
        dispatch: {
            (action: string | number): void;
        };
        type?: 'alert' | 'confirm';
        status: 'mount' | 'unmount';
        onClosePopup: {
            (): void;
        };
    }
    interface State {
        maskClassName: string;
        mainClassName: string;
    }
}
declare class Popup extends React.Component<Popup.Props, Popup.State> {
    state: {
        maskClassName: string;
        mainClassName: string;
    };
    componentDidMount(): void;
    animationEnd: () => void;
    render(): JSX.Element;
}
export default Popup;
