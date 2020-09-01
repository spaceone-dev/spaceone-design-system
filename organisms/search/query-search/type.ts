export type KeyDataType = 'string'|'integer'|'float'|'boolean'|'datetime'

export interface KeyItem {
    label: string;
    name: string;
    dataType?: KeyDataType;
}

export type OperatorType = ''|'!'|'>'|'>='|'<'|'<='|'='|'!='|'$';

export interface ValueItem {
    label: string;
    name: string;
    icon?: string;
    link?: string;
    target?: string;
}

export interface QueryItem {
    key?: KeyItem;
    operator: OperatorType;
    value: ValueItem;
    invalid?: boolean;
    description?: string;
}


export type ValueHandler = (inputText: string, keyItem: KeyItem) => Promise<{
    results: ValueItem[];
    totalCount: number;
}>;

export interface ValueHandlerMap {
    [key: string]: ValueHandler;
}

export interface QuerySearchState {
    placeholder: string;
    focused: boolean;
    keyItems: KeyItem[];
    valueHandlerMap: ValueHandlerMap;
}
export interface QuerySearchSyncState {
    value: string;
}

export interface QuerySearchProps extends QuerySearchState, QuerySearchSyncState {
}

export interface QuerySearchListeners {
    search?: (query: QueryItem) => Promise<void>|void;
}
