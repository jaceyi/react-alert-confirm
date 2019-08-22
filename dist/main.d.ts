import * as React from 'react';
interface closeBeforeInterface {
    (action: string | number, closePopup: {
        (): void;
    }): void;
}
export interface optionsInterface {
    title?: React.ReactNode;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    okText?: string;
    cancelText?: string;
    zIndex?: number;
    type?: 'confirm' | 'alert';
    closeBefore?: closeBeforeInterface;
    onOk?: {
        (): void;
    };
    onCancel?: {
        (): void;
    };
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
declare class AlertConfirm {
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
    dispatch: (action: React.ReactText) => void;
    closePopup: () => void;
    async(): Promise<AlertConfirmInterface>;
    render(): void;
}
declare const _default: (options: string | optionsInterface) => AlertConfirm;
export default _default;
