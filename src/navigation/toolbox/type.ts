import { QueryTag } from '@/inputs/search/query-search-tags/type';

export interface ToolboxOptions {
    start?: number;
    limit?: number;
    sortBy?: string;
    queryTags?: QueryTag[];
    searchText?: string;
}
