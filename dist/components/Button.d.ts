import type { FC } from 'react';
declare namespace Button {
    type styleType = 'primary' | 'default' | 'danger';
    type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
        styleType?: styleType;
    };
}
declare const Button: FC<Button.Props>;
declare const _default: import("react").NamedExoticComponent<Button.Props>;
export default _default;
