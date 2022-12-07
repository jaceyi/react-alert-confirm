import React from 'react';
import type { FC, ButtonHTMLAttributes } from 'react';
import { classNames } from './Popup';
export declare namespace ButtonTypes {
  type styleType = 'primary' | 'default' | 'danger';

  type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    styleType?: styleType;
    className?: string;
  };
}

const Button: FC<ButtonTypes.Props> = ({ styleType, className, ...props }) => (
  <button
    type="button"
    className={classNames(
      'alert-confirm-button',
      `${styleType || 'default'}-button`,
      className
    )}
    {...props}
  />
);

export default React.memo(Button);
