import { QueryItem } from '@/components/organisms/search/query-search/type';


export type QueryTag = QueryItem

export interface QuerySearchTagsProps {
    tags: QueryTag[];
}

export interface QueryValidator {
    (query: QueryTag): boolean;
}

export interface QuerySearchTagsFunctions {
    addTag(query: QueryTag, validator?: QueryValidator): void;
    deleteTag(index: number): void;
    deleteAllTags(): void;
}

export interface QuerySearchTagsListeners {
    add: (tags: QueryTag[]) => void|Promise<void>;
    delete: (tags: QueryTag[]) => void|Promise<void>;
    'delete:tag': (idx: number) => void|Promise<void>;
    'delete:all': () => void|Promise<void>;
    change: (tags: QueryTag[]) => void|Promise<void>;
}
