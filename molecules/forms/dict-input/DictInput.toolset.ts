import {
    computed, Ref,
} from '@vue/composition-api';
import VueI18n from 'vue-i18n';

import _ from 'lodash';
import {
    HelperToolSet,
    initReactive, optionalType, StateToolSet, SyncStateToolSet,
} from '@/lib/toolset';
import { i18n } from '@/translations';

interface DictInputType {
    keyInvalid?: boolean;
    valueInvalid?: boolean;
    keyInvalidText?: VueI18n.TranslateResult | Ref<VueI18n.TranslateResult> | string;
    valueInvalidText?: VueI18n.TranslateResult | Ref<VueI18n.TranslateResult> | string;
    disabled?: boolean;
}

interface DictInputSyncType {
    name: string;
    value: number | string;
}

export interface DictInputPropsInterface extends DictInputType, DictInputSyncType {}


@StateToolSet<DictInputType>()
@SyncStateToolSet<DictInputSyncType>()
export class DictInputState<
    D, SyncD,
    S extends DictInputType = DictInputType,
    SyncS extends DictInputSyncType = DictInputSyncType
> {
    public state: optionalType<S, D>;

    public syncState: optionalType<SyncS, SyncD>;

    public static initState(): DictInputType {
        return {
            keyInvalid: false,
            valueInvalid: false,
            keyInvalidText: undefined,
            valueInvalidText: undefined,
            disabled: false,
        } as DictInputType;
    }

    public static initSyncState(): DictInputSyncType {
        return {
            name: '',
            value: '',
        } as DictInputSyncType;
    }

    public constructor(initData: D = {} as D, initSyncData: SyncD = {} as SyncD, lazy: boolean = false) {
        this.state = initReactive(lazy, DictInputState.initState(), initData);
        this.syncState = initReactive(lazy, DictInputState.initSyncState(), initSyncData);
    }
}

@HelperToolSet()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DictInputToolSet<D=any, SyncD=any> extends DictInputState<D, SyncD> {
    public id: number = 0;

    public isValid: Ref<boolean> = null as unknown as Ref<boolean>;

    private static i18n: VueI18n = i18n;

    private static count: number = 0;

    public static initToolSet(_this: DictInputToolSet): void {
        _this.id = DictInputToolSet.count;
        _this.isValid = computed((): boolean => !_this.state.keyInvalid && !_this.state.valueInvalid);
        DictInputToolSet.count += 1;
    }

    public constructor(initData: D = {} as D, initSyncData: SyncD = {} as SyncD, lazy = false) {
        super(initData, initSyncData);
        if (!lazy) {
            DictInputToolSet.initToolSet(this);
        }
    }

    public validateKey(newDict: object): boolean {
        if (!this.syncState.name) {
            this.state.keyInvalid = true;
            this.state.keyInvalidText = DictInputToolSet.i18n.t('ACTION.DICT.INVALID.KEY_EMPTY');
        } else if (newDict[this.syncState.name] !== undefined) {
            this.state.keyInvalid = true;
            this.state.keyInvalidText = DictInputToolSet.i18n.t('ACTION.DICT.INVALID.KEY_DUPL');
        } else this.state.keyInvalid = false;
        return !this.state.keyInvalid;
    }

    public validateValue(): boolean {
        if (!this.syncState.value) {
            this.state.valueInvalid = true;
            this.state.valueInvalidText = DictInputToolSet.i18n.t('ACTION.DICT.INVALID.VAL_EMPTY');
        } else this.state.valueInvalid = false;
        return !this.state.valueInvalid;
    }

    public validate(newDict: object): boolean {
        this.validateKey(newDict);
        this.validateValue();
        return !this.state.keyInvalid && !this.state.valueInvalid;
    }
}

export const toDictInputTSList = (dict: object = {}): DictInputToolSet[] => {
    const res: DictInputToolSet[] = [];
    _.forEach(dict, (v, k): void => {
        res.push(new DictInputToolSet(undefined, {
            name: k, value: v,
        }));
    });
    return res;
};

export interface DictInputListStateType {
    pairList: DictInputToolSet[];
    newDict: object;
    isAllValid: boolean;
}

@StateToolSet<DictInputListStateType>()
export class DictInputListState<D, S extends DictInputListStateType = DictInputListStateType> {
    public state: optionalType<S, D>;

    public static initState(): DictInputListStateType {
        return {
            pairList: [],
            newDict: {},
            isAllValid: false,
        } as DictInputListStateType;
    }

    public constructor(initData: D = {} as D, lazy: boolean = false) {
        this.state = initReactive(lazy, DictInputState.initState(), initData);
    }
}

// @HelperToolSet()
// export class DictInputListToolSet<D> extends DictInputListState<D> {
//     public ts: DictInputListStateType
//
//     public constructor(dict: object) {
//         this.pairList = toDictInputTSList(dict);
//         this.newDict = {};
//         this.isAllValid = false;
//     }

// public setNewDict(pair: DictInputToolSet) {
//     this.newDict[pair.syncState.name] = pair.syncState.value || null;
// }
//
// public validateAll(): boolean {
//     this.newDict = {};
//     let res = true;
//     this.pairList.forEach((pair: any) => {
//         res = pair.validate(this.newDict) && res;
//         if (res) this.setNewDict(pair);
//     });
//     return res;
// }
//
// public addPair(dict: object = {}) {
//     this.pairList.push(new DictInputToolSet({ dict }));
// }
//
// public deletePair(idx: number, pair: DictInputToolSet) {
//     this.pairList.splice(idx, 1);
//
//     if (!pair.state.keyInvalid) {
//         delete this.newDict[pair.syncState.name];
//         this.pairList.some((p: any) => {
//             if (p.syncState.name === pair.syncState.name) {
//                 if (p.validateKey(this.newDict)) this.setNewDict(p);
//             }
//             return p.syncState.name === pair.syncState.name;
//         });
//     }
// }
// }

export const dictInputProps = {
    name: {
        type: String,
        default: '',
        required: true,
    },
    /**
     * Value of dict. This is sync prop.
     */
    value: {
        type: [String, Number],
        default: '',
        required: true,
    },
    /**
     * Key invalid.
     */
    keyInvalid: {
        type: Boolean,
        default: false,
    },
    /**
     * Value invalid.
     */
    valueInvalid: {
        type: Boolean,
        default: false,
    },
    /**
     * Key invalid message.
     */
    keyInvalidText: {
        type: String,
        default: undefined,
    },
    /**
     * Value invalid message.
     */
    valueInvalidText: {
        type: String,
        default: undefined,
    },
    /**
     * Disable key, value input boxes.
     */
    disabled: {
        type: Boolean,
        default: false,
    },
};