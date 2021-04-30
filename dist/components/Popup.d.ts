import type { ReactNode, FC } from 'react';
export declare type Type = 'alert' | 'confirm';
export declare type Status = 'mount' | 'unmount';
export declare type DispatchAction = string | number;
export declare type Dispatch = (action: DispatchAction) => void;
export declare type ClosePopup = () => void;
interface PopupProps {
    type?: Type;
    title?: ReactNode;
    content?: ReactNode;
    footer?: ReactNode;
    status: Status;
    onClosePopup: ClosePopup;
}
declare const Popup: FC<PopupProps>;
export default Popup;
