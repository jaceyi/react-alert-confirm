import './index.scss';
import * as React from 'react';
import AlertConfirm, { Options } from './main';
import ConfirmButton from './components/Button';
declare type AlertConfirmType = AlertConfirm | Promise<AlertConfirm>;
interface IAlert {
    (options: Options | React.ReactNode): AlertConfirmType;
}
export declare const Button: React.FC<ConfirmButton.Props>;
export declare const alert: IAlert;
declare const _default: (options: any) => AlertConfirmType;
export default _default;
