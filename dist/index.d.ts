import './index.scss';
import * as React from 'react';
import AlertConfirm, { Options } from './main';
declare type AlertConfirmType = AlertConfirm | Promise<AlertConfirm>;
declare type Params = Options | React.ReactNode;
export { default as Button } from './components/Button';
export declare const alert: (params: Params) => AlertConfirmType;
declare const _default: (params: Params) => AlertConfirmType;
export default _default;
