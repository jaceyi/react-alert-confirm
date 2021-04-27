import { memo } from 'react';
import type { FC } from 'react';

declare namespace Button {
  type styleType = 'primary' | 'default' | 'danger';

  type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    styleType?: styleType;
  };
}

const Button: FC<Button.Props> = ({ styleType, ...props }) => (
  <button
    className={`alert-confirm-button ${styleType || 'default'}-button`}
    {...props}
  />
);

export default memo(Button);
