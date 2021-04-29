import type { ButtonHTMLAttributes } from 'react';
export declare namespace Button {
    type styleType = 'primary' | 'default' | 'danger';
    type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
        styleType?: styleType;
    };
}
declare const _default: import("react").NamedExoticComponent<Button.Props>;
export default _default;
