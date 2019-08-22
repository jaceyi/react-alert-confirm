import * as React from 'react';
interface closeBeforeInterface {
    (action: string | number, closePopup: {
        (): void;
    }): void;
}
export interface optionsInterface {
    type?: 'confirm' | 'alert';
    title?: React.ReactNode;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    zIndex?: number;
    okText?: string;
    cancelText?: string;
    onOk?: {
        (): void;
    };
    onCancel?: {
        (): void;
    };
    closeBefore?: closeBeforeInterface;
}
export interface AlertConfirmInterface {
    title?: React.ReactNode;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    zIndex: number;
    type: 'confirm' | 'alert';
    status: 'mount' | 'unmount';
    action: string | number;
    container: Element;
    onOk?: {
        (): void;
    };
    onCancel?: {
        (): void;
    };
    closeBefore: closeBeforeInterface;
    resolve?: {
        (instance?: AlertConfirmInterface): void;
    };
    reject?: {
        (instance?: AlertConfirmInterface): void;
    };
    dispatch: {
        (action: string | number): void;
    };
    closePopup: {
        (): void;
    };
    async: {
        (): Promise<AlertConfirmInterface>;
    };
}
declare class AlertConfirm implements AlertConfirmInterface {
    title?: React.ReactNode;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    zIndex: number;
    type: 'confirm' | 'alert';
    status: 'mount' | 'unmount';
    action: string | number;
    container: Element;
    onOk?: {
        (): void;
    };
    onCancel?: {
        (): void;
    };
    closeBefore: closeBeforeInterface;
    resolve?: {
        (instance?: AlertConfirmInterface): void;
    };
    reject?: {
        (instance?: AlertConfirmInterface): void;
    };
    constructor({ title, content, footer, zIndex, closeBefore, type, onOk, onCancel, okText, cancelText }: optionsInterface);
    dispatch: (action: string | number) => void;
    closePopup: () => void;
    async(): Promise<AlertConfirmInterface>;
    render(): void;
}
declare const _default: (options: string | optionsInterface) => AlertConfirm;
export default _default;
