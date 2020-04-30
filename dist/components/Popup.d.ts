import * as React from 'react';
export declare type Type = 'alert' | 'confirm';
export declare type Status = 'mount' | 'unmount';
export declare type DispatchAction = string | number;
export declare type Dispatch = (action: DispatchAction) => void;
export declare type ClosePopup = () => void;
interface PopupProps {
    title?: React.ReactNode;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    dispatch: Dispatch;
    type?: Type;
    status: Status;
    onClosePopup: ClosePopup;
}
declare const Popup: React.FC<PopupProps>;
export default Popup;
