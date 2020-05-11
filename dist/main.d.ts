import * as React from 'react';
import { Dispatch, DispatchAction, ClosePopup, Type, Status } from './components/Popup';
declare type CloseBefore = (action: DispatchAction, closePopup: ClosePopup) => void;
declare type AlertConfirmEvent = (instance?: AlertConfirm) => void;
declare type GetFooter = (dispatch: Dispatch) => React.ReactNode;
declare type Footer = React.ReactNode | GetFooter;
declare type Lang = 'zh' | 'en';
export interface Options {
    type?: Type;
    title?: React.ReactNode;
    content?: React.ReactNode;
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
    title?: React.ReactNode;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    zIndex: number;
    type: Type;
    status: Status;
    action: DispatchAction;
    container: Element;
    onOk?: AlertConfirmEvent;
    onCancel?: AlertConfirmEvent;
    closeBefore: CloseBefore;
    constructor({ title, content, footer, lang, zIndex, closeBefore, type, onOk, onCancel, okText, cancelText }: Options);
    dispatch: Dispatch;
    closePopup: () => void;
    render(): void;
}
export default AlertConfirm;
