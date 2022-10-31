import React from 'react';
import type { FC, ButtonHTMLAttributes } from 'react';
import { classNames } from '../utils';

export declare namespace Button {
  type styleType = 'primary' | 'default' | 'danger';

  type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    styleType?: styleType;
    className?: string;
  };
}

const Button: FC<Button.Props> = ({ styleType, className, ...props }) => (
  <button
    className={classNames(
      'alert-confirm-button',
      `${styleType || 'default'}-button`,
      className
    )}
    {...props}
  />
);

export default React.memo(Button);
