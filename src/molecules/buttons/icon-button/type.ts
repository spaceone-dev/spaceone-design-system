export enum ICON_BUTTON_STYLE {
    primary = 'primary',
    'primary-dark' = 'primary-dark',
    primary1 = 'primary1',
    primary2 = 'primary2',
    secondary = 'secondary',
    secondary1 = 'secondary1',
    gray = 'gray',
    gray900 = 'gray900',
    'gray900-hover' = 'gray900-hover',
    'gray900-border' = 'gray900-border',
    alert = 'alert',
    safe = 'safe',
    transparent = 'transparent',
}

export enum ICON_BUTTON_SIZE {
    sm = 'sm',
    md = 'md',
}

export enum ICON_BUTTON_SHAPE {
    circle='circle',
    square='square'
}

export type IconButtonStyle = keyof ICON_BUTTON_STYLE;
export type IconButtonSize = keyof ICON_BUTTON_SIZE;
export type IconButtonShape = keyof ICON_BUTTON_SHAPE;


export interface IconButtonProps {
    name: string;
    // dir: string | null;
    // fill: boolean;
    width: string;
    height: string;
    // scale?: string;
    // original: boolean;
    // title?: string;
    // color: string;
    styleType?: IconButtonStyle;
    loading?: boolean;
    disabled?: boolean;
    outline?: boolean;
    // solid: boolean;
    size?: IconButtonSize;
    shape?: IconButtonShape;
}
