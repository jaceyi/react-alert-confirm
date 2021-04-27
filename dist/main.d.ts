import type { ReactNode } from 'react';
import { Dispatch, DispatchAction, ClosePopup, Type, Status } from './components/Popup';
declare type CloseBefore = (action: DispatchAction, closePopup: ClosePopup) => void;
declare type AlertConfirmEvent = (instance?: AlertConfirm) => void;
declare type GetFooter = (dispatch: Dispatch) => ReactNode;
declare type Footer = ReactNode | GetFooter;
declare type Lang = 'zh' | 'en';
export interface Options {
    type?: Type;
    title?: ReactNode;
    content?: ReactNode;
    footer?: Footer;
    lang?: Lang;
    zIndex?: number;
    okText?: string;
    cancelText?: string;
    onOk?: AlertConfirmEvent;
    onCancel?: AlertConfirmEvent;
    closeBefore?: CloseBefore;
}
declare class AlertConfirm {
    title?: ReactNode;
    content?: ReactNode;
    footer?: ReactNode;
    zIndex: number;
    type: Type;
    status: Status;
    container: Element | null;
    onOk?: AlertConfirmEvent;
    onCancel?: AlertConfirmEvent;
    closeBefore: CloseBefore | null;
    constructor({ title, content, footer, lang, zIndex, closeBefore, type, onOk, onCancel, okText, cancelText }: Options);
    dispatch: Dispatch;
    closePopup: () => void;
    render(): void;
}
export default AlertConfirm;
