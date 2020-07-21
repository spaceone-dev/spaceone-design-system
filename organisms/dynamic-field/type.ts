/* eslint-disable camelcase */

/** Metadata schema types for Dynamic field */
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

export interface CommonOptions {
    link?: string;
    tooltip?: string;
    sortable?: boolean;
    sort_key?: string;
}

export interface BadgeOptions extends CommonOptions {
    outline_color?: string;
    shape?: string;
    background_color?: string;
    text_color?: string;
}

export enum DATETIME_SOURCE_TYPE {
    iso8601 = 'iso8601',
    timestamp = 'timestamp'
}

export interface DatetimeOptions extends CommonOptions {
    source_type: keyof typeof DATETIME_SOURCE_TYPE;
    source_format?: string;
    display_format?: string;
}

export interface ListOptions extends CommonOptions {
    item?: DynamicField;
    sub_key?: string;
    delimiter?: string;
}

export interface StateOptions extends CommonOptions {
    icon?: {
        image?: string;
        color?: string;
    };
    text_color?: string;
}

export interface EnumOptions {
    [data: string]: DynamicField;
}

export type DictOptions = CommonOptions

export type TextOptions = CommonOptions


export type DynamicFieldOptions =
    BadgeOptions | DatetimeOptions |
    DictOptions | EnumOptions |
    ListOptions | StateOptions | TextOptions


export interface DynamicField {
    type: DynamicFieldType;
    options?: DynamicFieldOptions;
    data: any;
}

/** Props type for Dynamic field components */
export interface DynamicFieldProps extends Required<DynamicField> {
    extra: any;
}
