/* eslint-disable camelcase */

export enum DYNAMIC_FIELD_TYPE {
    badge = 'badge',
    datetime = 'datetime',
    dict = 'dict',
    enum = 'enum',
    list = 'list',
    state = 'state',
    text = 'text',
}

export type DynamicFieldType = keyof typeof DYNAMIC_FIELD_TYPE;


export interface BadgeOptions {
    outline_color?: string;
    shape?: string;
    link?: string;
    background_color?: string;
    text_color?: string;
}

export interface DatetimeOptions {
    source_type: string;
    source_format?: string;
    display_format?: string;
    timezone?: string;
}

export interface DictOptions {
    [key: string]: string|number;
}

export interface EnumOptions {
    [data: string]: DynamicField;
}

export interface ListOptions {
    item?: DynamicField;
    sub_key?: string;
    delimiter?: string;
}

export interface StateOptions {
    icon?: {
        image?: string;
        color?: string;
    };
    text_color?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TextOptions {}


export type DynamicFieldOptions =
    BadgeOptions | DatetimeOptions |
    DictOptions | EnumOptions |
    ListOptions | StateOptions | TextOptions


export interface DynamicField {
    type: DynamicFieldType;
    options?: DynamicFieldOptions;
    data: any;
}
