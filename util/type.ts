import { Ref } from '@vue/composition-api';

export interface Timestamp {
    seconds: string;
    nanos?: number;
}

export type Computed<T> = Readonly<Ref<Readonly<T>>>
