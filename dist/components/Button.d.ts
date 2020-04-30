import * as React from 'react';
declare namespace Button {
    type styleType = 'primary' | 'default' | 'danger';
    interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
        styleType?: styleType;
    }
}
declare const Button: React.FC<Button.Props>;
export default Button;
