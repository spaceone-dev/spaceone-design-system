<template>
    <div class="p-data-table">
        <div class="table-container">
            <table ref="table"
                   :class="{
                       striped: striped,
                       bordered: bordered,
                       [tableStyleType]: true,
                   }"
            >
                <thead>
                    <slot name="head" v-bind="getDefaultSlotProps()">
                        <tr v-if="showHeader" class="fade-in">
                            <th v-if="selectable" class="all-select">
                                <p-check-box v-if="multiSelect"
                                             v-model="allState"
                                             @change="onSelectAllToggle"
                                />
                            </th>
                            <th v-for="(field, index) in fieldsData"
                                :key="`th-${contextKey}-${index}`"
                                :style="{
                                    minWidth: field.width || undefined,
                                    width: field.width || undefined,
                                }"
                                :class="{'fix-width': colCopy}"
                                @click="onTheadClick(field, index, $event)"
                            >
                                <slot :name="`th-${field.name}`"
                                      v-bind="getHeadSlotProps(field, index)"
                                >
                                    <span class="th-contents">
                                        <span class="th-text">
                                            <slot :name="`th-${field.name}-format`"
                                                  v-bind="getHeadSlotProps(field, index)"
                                            >
                                                {{ field.label ? field.label : field.name }}
                                            </slot>
                                            <p-copy-button v-if="colCopy" class="ml-2"
                                                           copy-manually
                                                           @copy="onClickColCopy(index)"
                                            />
                                        </span>

                                        <template v-if="sortable && field.sortable">
                                            <p-i
                                                v-if="sortable && (field.sortKey|| field.name) === sortBy"
                                                :name="proxyState.sortDesc ? 'ic_table_sort_fromZ' : 'ic_table_sort_fromA'"
                                                class="sort-icon"
                                            />
                                            <p-i v-else
                                                 name="ic_table_sort"
                                                 class="sort-icon"
                                            />
                                        </template>
                                    </span>
                                </slot>
                            </th>
                        </tr>
                        <tr v-else>
                            <th :colspan="selectable ? fieldsData.length +1 : fieldsData.length" />
                        </tr>
                    </slot>
                </thead>
                <tbody>
                    <slot v-if="showNoData" name="no-data" v-bind="getDefaultSlotProps()">
                        <div class="no-data">
                            <slot name="no-data-format" v-bind="getDefaultSlotProps()">
                                No Items
                            </slot>
                        </div>
                        <tr :colspan="selectable ? fieldsData.length +1 : fieldsData.length" class="fake-row" />
                    </slot>
                    <slot name="body" :items="items">
                        <tr v-for="(item, index) in items"
                            :key="`tr-${contextKey}-${index}`" :data-index="index"
                            class="fade-in"
                            :class="{
                                ...(getRowClassNames && getRowClassNames()),
                                'tr-selected': getSelectedState(item, index),
                                'row-height-fixed': rowHeightFixed,
                                'row-cursor-pointer': rowCursorPointer,
                                'no-hover': disableHover,
                            } "
                            @click.left="onRowLeftClick( item, index, $event )"
                        >
                            <td v-if="selectable"
                                class="select-checkbox"
                                @click.stop.prevent="onSelectClick"
                            >
                                <p-check-box v-if="multiSelect"
                                             v-model="proxyState.selectIndex"
                                             :disabled="getRowSelectable ? getRowSelectable(item, index): false"
                                             :value="index"
                                />
                                <p-radio v-else
                                         :selected="proxyState.selectIndex[0]"
                                         :disabled="getRowSelectable ? getRowSelectable(item, index): false"
                                         :value="index"
                                         @change="onChangeRadioSelect"
                                />
                            </td>
                            <td v-for="(field, i) in fieldsData"
                                :key="`td-${contextKey}-${index}-${i}`"
                                :class="{'has-width': !!field.width}"
                            >
                                <slot :name="`col-${field.name}-format`" v-bind="getColSlotProps(item, index, field, )">
                                    <slot :name="`col-${i}-format`" v-bind="getColSlotProps(item, index, field, )">
                                        {{ getValue(item,field) }}
                                    </slot>
                                </slot>
                            </td>
                        </tr>
                    </slot>
                </tbody>
                <tfoot>
                    <slot name="foot" />
                </tfoot>
            </table>
        </div>

        <div v-if="showLoading" class="loading-backdrop fade-in" />
        <div v-if="showLoading" class="loading">
            <slot name="loading">
                <p-lottie name="thin-spinner" :size="2.5"
                          :auto="true"
                />
            </slot>
        </div>
        <div v-if="invalid" class="invalid-cover" />
    </div>
</template>

<script lang="ts">
import {
    toRefs, computed, reactive, watch, getCurrentInstance, ComponentRenderProxy, defineComponent,
} from '@vue/composition-api';
import { get, range } from 'lodash';
import { copyAnyData } from '@/util/helpers';
import { makeOptionalProxy } from '@/util/composition-helpers';
import { DataTableFieldType, DataTableProps } from '@/data-display/tables/data-table/type';

import PCheckBox from '@/inputs/checkbox/PCheckBox.vue';
import PRadio from '@/inputs/radio/PRadio.vue';
import PCopyButton from '@/inputs/buttons/copy-button/PCopyButton.vue';
import PLottie from '@/foundation/lottie/PLottie.vue';
import PI from '@/foundation/icons/PI.vue';
import { DATA_TABLE_STYLE_TYPE } from '@/data-display/tables/data-table/config';


export default defineComponent<DataTableProps>({
    name: 'PDataTable',
    components: {
        PI,
        PCheckBox,
        PCopyButton,
        PLottie,
        PRadio,
    },
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        fields: {
            type: Array,
            required: true,
            default: () => [],
        },
        items: {
            type: Array,
            default: () => [],
        },
        sortable: {
            type: Boolean,
            default: false,
        },
        sortBy: {
            type: String,
            default: undefined,
        },
        sortDesc: {
            type: Boolean,
            default: undefined,
        },
        colCopy: {
            type: Boolean,
            default: false,
        },
        selectable: {
            type: Boolean,
            default: false,
        },
        selectIndex: {
            type: Array,
            default: undefined,
        },
        multiSelect: {
            type: Boolean,
            default: true,
        },
        rowClickMultiSelectMode: {
            type: Boolean,
            default: false,
        },
        useCursorLoading: {
            type: Boolean,
            default: false,
        },
        tableStyleType: {
            type: String,
            default: 'default',
            validator(value: any) {
                return Object.values(DATA_TABLE_STYLE_TYPE).includes(value);
            },
        },
        striped: {
            type: Boolean,
            default: false,
        },
        bordered: {
            type: Boolean,
            default: true,
        },
        disableHover: {
            type: Boolean,
            default: false,
        },
        rowHeightFixed: {
            type: Boolean,
            default: true,
        },
        rowCursorPointer: {
            type: Boolean,
            default: false,
        },
        invalid: {
            type: Boolean,
            default: false,
        },
        getRowClassNames: {
            type: Function,
            default: undefined,
        },
        getRowSelectable: {
            type: Function,
            default: undefined,
        },
    },
    setup(props: DataTableProps, context) {
        const vm = getCurrentInstance() as ComponentRenderProxy;

        const proxyState = reactive({
            selectIndex: makeOptionalProxy<number[]>('selectIndex', vm, []),
            sortBy: makeOptionalProxy<string>('sortBy', vm, true),
            sortDesc: makeOptionalProxy<boolean|undefined>('sortDesc', vm, ''),
        });

        const state = reactive({
            table: null as any,
            allState: false,
            fieldsData: computed<DataTableFieldType[]>(() => props.fields.map((value: string | DataTableFieldType) => {
                if (typeof value === 'string') return { name: value, label: value, sortable: true };
                return { sortable: true, ...value };
            })),
            copyTargetElement: computed<HTMLCollection>(() => state.table?.children[1]?.children || []),
            showLoading: true,
            showHeader: props.items && props.items.length > 0 && props.fields.length > 0,
            showNoData: computed(() => {
                if (state.showHeader && (
                    !props.items || !Array.isArray(props.items) || props.items.length === 0
                )) {
                    return true;
                }
                return false;
            }),
            contextKey: Math.floor(Math.random() * Date.now()),
        });


        const getValue = (item, field: DataTableFieldType) => {
            if (typeof item === 'object') {
                return get(item, field.name);
            }
            return item;
        };

        const getDefaultSlotProps = () => ({
            fields: state.fieldsData,
        });

        const getHeadSlotProps = (field, index) => ({
            field, index, sortable: props.sortable,
        });

        const getColSlotProps = (item, index, field) => ({
            item, index, field, value: getValue(item, field),
        });

        const getSelectedState = (item, index) => {
            if (props.getRowSelectable) return props.getRowSelectable(item, index);
            return props.multiSelect ? proxyState.selectIndex.some(d => index === d) : proxyState.selectIndex[0] === index;
        };

        const checkboxToggle = (item, index) => {
            const newSelected = [...proxyState.selectIndex];
            if (getSelectedState(item, index)) {
                const idx = newSelected.indexOf(index);
                newSelected.splice(idx, 1);
                state.allState = false;
            } else {
                newSelected.push(index);
            }
            proxyState.selectIndex = newSelected;
        };

        /* Event Handlers */
        const onRowLeftClick = (item, index, event) => {
            context.emit('rowLeftClick', item, index, event);
            if (!props.selectable) return;
            if (props.multiSelect) {
                if (props.rowClickMultiSelectMode) {
                    checkboxToggle(item, index);
                    return;
                }
                if (event.shiftKey) {
                    checkboxToggle(item, index);
                    return;
                }
            }
            proxyState.selectIndex = [index];
        };

        const onTheadClick = (field, index, event) => {
            if (props.sortable && field.sortable) {
                const clickedKey = field.sortKey || field.name;
                let sortBy = proxyState.sortBy;
                let sortDesc: undefined|boolean = proxyState.sortDesc;

                if (sortBy === clickedKey) {
                    // set reverse mode
                    sortDesc = !sortDesc;

                    // when clicked the other thead
                } else {
                    sortBy = clickedKey;
                    sortDesc = true;
                }

                // set changed values
                proxyState.sortBy = sortBy;
                proxyState.sortDesc = sortDesc;
                context.emit('changeSort', sortBy, sortDesc);
            }
        };

        const onSelectClick = (event) => {
            event.target.children[0].click();
        };
        const onSelectAllToggle = () => {
            if (state.allState) {
                proxyState.selectIndex = range(props.items.length);
            } else {
                proxyState.selectIndex = [];
            }
        };
        const onClickColCopy = (idx) => {
            let result = '';
            const arr: Element[] = Array.from(state.copyTargetElement);
            arr.forEach((el) => {
                const children = Array.from(el.children) as HTMLElement[];
                children.forEach((td, colIdx) => {
                    if (colIdx === idx) {
                        if (result) result += `\n${td.innerText}`;
                        else result = td.innerText;
                    }
                });
            });
            copyAnyData(result);
        };

        const onChangeRadioSelect = (e) => {
            proxyState.selectIndex = [e];
        };


        watch(() => proxyState.selectIndex, () => {
            if (props.items && props.items.length && props.items.length === (proxyState.selectIndex as any[]).length) {
                state.allState = true;
            } else {
                state.allState = false;
            }
        }, { immediate: true });

        watch(() => props.loading, (value) => {
            if (typeof value !== 'boolean') {
                state.showHeader = true;
                state.showLoading = false;
                return;
            }

            if (props.useCursorLoading && value) {
                document.body.style.cursor = 'progress';
            } else {
                document.body.style.cursor = 'default';
            }

            if (value) {
                state.showLoading = true;
            } else {
                if (!state.showHeader) {
                    state.showHeader = true;
                }
                state.showLoading = false;
            }
        }, { immediate: true });

        watch([() => props.items, () => props.fields], () => {
            state.contextKey = Math.floor(Math.random() * Date.now());
        });


        return {
            proxyState,
            ...toRefs(state),
            getValue,
            getDefaultSlotProps,
            getHeadSlotProps,
            getColSlotProps,
            getSelectedState,
            onRowLeftClick,
            onTheadClick,
            onSelectClick,
            onSelectAllToggle,
            onClickColCopy,
            onChangeRadioSelect,
        };
    },
});
</script>

<style lang="postcss">

@define-mixin table-theme $th-bg-color, $stripe-bg-color, $border-color, $hover-color {
    /* th */
    th {
        background-color: $th-bg-color;
        height: 2rem;
    }
    &.bordered {
        td {
            border-bottom: 1px solid $border-color;
        }
    }
    tr {
        &.tr-selected {
            @apply text-secondary bg-blue-200;
        }
        &:not(.no-hover):hover {
            background-color: $hover-color;
        }
    }
    &.striped {
        tr:nth-of-type(odd) {
            background-color: $stripe-bg-color;
        }
        tr:nth-of-type(even) {
            background-color: transparent;
        }
        tr:not(.no-hover):hover {
            background-color: $hover-color;
        }
    }
}

.p-data-table {
    @apply h-full w-full relative overflow-auto;
    min-height: 12rem;
    .table-container {
        @apply overflow-auto h-full w-full;
    }
    table {
        @apply min-w-full;
        border-collapse: separate;
        border-spacing: 0;
        table-layout: fixed;
    }
    thead {
        tr {
            position: sticky;
            top: 0;
            z-index: 1;
        }
    }
    th {
        vertical-align: bottom;
        line-height: 1.25rem;
        font-size: 0.875rem;
        text-align: left;
        letter-spacing: 0;
        white-space: nowrap;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        .th-contents {
            @apply flex justify-between pl-4;
            line-height: 2;
            .th-text {
                display: inline-flex;
                align-content: center;
            }
        }
        .sort-icon {
            @apply text-gray-500 float-right my-px;
            &:hover { cursor: pointer; }
        }
        &.fix-width {
            @apply min-w-19;
        }
        &:last-child {
            .th-contents {
                @apply pr-2;
            }
        }
        &.all-select {
            @apply py-1 pl-4;
            width: 2.5rem;
            min-width: 2.5rem;
            max-width: 2.5rem;
        }
    }
    td {
        @apply h-10 px-4 z-0 align-middle min-w-28 text-sm;
        vertical-align: middle;
        &.has-width {
            word-break: break-word;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
        }
    }
    tr {
        &.row-height-fixed {
            td:not(.has-width) {
                overflow-x: hidden;
                white-space: nowrap;
            }
        }
        &.row-cursor-pointer {
            cursor: pointer;
        }
    }

    .select-checkbox {
        @apply cursor-pointer min-w-4 w-4;
    }

    .no-data {
        @apply absolute justify-center items-center flex w-full text-gray-300 text-center;
        line-height: 120%;
        font-size: 1rem;
        height: calc(100% - 2rem);
        max-height: 16.875rem;
        top: 2rem;
    }

    .loading-backdrop {
        @apply absolute w-full h-full overflow-hidden;
        background-color: white;
        opacity: 0.5;
        top: 0;
        z-index: 1;
    }

    .loading {
        @apply absolute flex w-full h-full justify-center items-center;
        top: 0;
        max-height: 16.875rem;
        z-index: 1;
    }

    .invalid-cover {
        @apply absolute w-full h-full overflow-hidden border border-alert rounded-lg;
        pointer-events: none;
        top: 0;
        z-index: 1;
    }

    .fake-row {
        @apply opacity-0;
    }

    /* transitions */
    .fade-in-enter-active {
        transition: opacity 0.2s;
    }
    .fade-in-leave-active {
        transition: opacity 0.2s;
    }
    .fade-in-enter, .fade-in-leave-to {
        opacity: 0;
    }
    .fade-in-leave, .fade-in-enter-to {
        opacity: 0.5;
    }

    /* themes */
    .default {
        @mixin table-theme theme('colors.white'), theme('colors.primary4'), theme('colors.gray.300'), theme('colors.blue.100');
    }

    .light {
        @mixin table-theme theme('colors.white'), theme('colors.primary4'), theme('colors.gray.300'), theme('colors.blue.100');
        th {
            @apply border-gray-200;
            border-bottom: 1px solid;
        }
    }

    .primary4 {
        @mixin table-theme theme('colors.white'), transparent, theme('colors.white'), transparent;
        tr {
            @apply bg-primary4;
        }
        &.bordered {
            td {
                border-bottom-width: 4px;
            }
        }
    }
}

</style>
