import * as React from 'react';

declare namespace Button {
  type styleType = 'primary' | 'default' | 'danger';

  interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    styleType?: styleType;
  }
}

const Button: React.FC<Button.Props> = ({ styleType, ...props }) => (
  <button className={`alert-confirm-button ${styleType || 'default'}-button`} {...props} />
);

export default Button;
