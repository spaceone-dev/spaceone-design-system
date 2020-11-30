import {
    OperatorType, ValueItem, ValueHandler, QueryItem,
} from '@/components/organisms/search/query-search/type';

/** Operator Chars */
export const supportOperatorMap: Record<string, OperatorType[]> = {
    integer: ['', '!', '>', '>=', '<', '<=', '=', '!='],
    float: ['', '!', '>', '>=', '<', '<=', '=', '!='],
    boolean: ['', '!', '=', '!='],
    datetime: ['', '>', '<', '='],
};


/** Placeholder Map */
export const placeholderMap = {
    datetime: 'YYYY-MM-DD',
};

/** Menu Type Map */
export const menuTypeMap = {
    datetime: 'OPERATOR',
};


/** Input Validator Map */
const datetimeRegex = RegExp(/^(\d)|[-]$/);

export const inputValidatorMap: Record<string, (value: string) => boolean> = {
    datetime: value => datetimeRegex.test(value),
};


/** Default Value Handler Map */
const booleanItems: ValueItem[] = [
    {
        name: 'true', label: 'TRUE',
    },
    {
        name: 'false', label: 'FALSE',
    },
];
const datetimeItems: ValueItem[] = [
    {
        label: '>: Greater than', name: '>',
    },
    {
        label: '<: Less than', name: '<',
    },
    {
        label: '=: Range', name: '=',
    },
];

export const defaultHandlerMap: Record<string, ValueHandler> = {
    boolean: (inputText: string, keyItem) => {
        const regex = RegExp(inputText || '', 'i');
        return {
            results: booleanItems.reduce((res, d) => {
                if (regex.test(d.name as string)) res.push(d);
                return res;
            }, [] as ValueItem[]),
        };
    },
    datetime: (inputText: string, keyItem) => {
        const regex = RegExp(inputText || '', 'i');
        return {
            results: datetimeItems.filter(d => regex.test(d.name)) as ValueItem[],
            menuType: 'OPERATOR' as const,
        };
    },
};


/** QueryItem Formatter Map  */
const datetimeFormatRegex = RegExp(/^(\d{4}-\d{2}-\d{2})$/);

export const formatterMap: Record<string, (queryItem: QueryItem) => QueryItem> = {
    datetime: (queryItem) => {
        const res = datetimeFormatRegex.test(queryItem.value.name);
        if (res) {
            queryItem.value.label = res[0];
            queryItem.value.name = res[0];
        }
        return queryItem;
    },
    object: (queryItem) => {
        if (!(queryItem.value.name as string).includes(':')) return queryItem;
        if (queryItem.key) {
            const subItems = (queryItem.value.name as string).split(':');
            if (subItems[0]) {
                /* set sub paths */
                const subKeys = subItems[0].split('.');
                if (queryItem.key.subPaths) queryItem.key.subPaths.push(...subKeys.map(d => d.trim()));
                else queryItem.key.subPaths = subKeys;

                /* set value */
                const realValue = subItems[1] ? subItems[1].trim() : '';
                queryItem.value.name = realValue;
                queryItem.value.label = realValue;
            }
        }
        return queryItem;
    },
};