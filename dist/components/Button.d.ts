import * as React from 'react';
declare namespace Button {
    type styleType = 'primary' | 'default' | 'danger';
    type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
        styleType?: styleType;
    };
}
declare const Button: React.FC<Button.Props>;
declare const _default: React.NamedExoticComponent<Button.Props>;
export default _default;
