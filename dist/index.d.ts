import './index.scss';
import * as React from 'react';
import { optionsInterface, AlertConfirmInterface } from './main';
import { Button as ButtonTypes } from './components/Button';
interface alertInterface {
    (options: optionsInterface | React.ReactNode): AlertConfirmInterface;
}
interface asyncConfirmInterface {
    (options: optionsInterface | React.ReactNode): Promise<AlertConfirmInterface>;
}
export declare const Button: React.ComponentClass<ButtonTypes.Props>;
export declare const alert: alertInterface;
export declare const asyncConfirm: asyncConfirmInterface;
declare const _default: (options: any) => AlertConfirmInterface;
export default _default;
