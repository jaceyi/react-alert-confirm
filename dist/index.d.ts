import './index.scss';
import * as React from 'react';
import alertConfirm from './main';
import { optionsInterface, AlertConfirmInterface } from './main';
import { Button as ButtonTypes } from './components/Button';
interface alertInterface {
    (options: optionsInterface | string): AlertConfirmInterface;
}
interface asyncConfirmInterface {
    (options: optionsInterface | string): Promise<AlertConfirmInterface>;
}
export declare const Button: React.ComponentClass<ButtonTypes.Props>;
export declare const alert: alertInterface;
export declare const asyncConfirm: asyncConfirmInterface;
export default alertConfirm;
