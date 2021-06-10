<template>
    <div class="p-definition-table">
        <slot v-if="!loading && isNoData" name="empty">
            <p-empty class="no-data">
                <span>{{ $t('COMPONENT.DEFINITION_TABLE.NO_DATA') }}</span>
            </p-empty>
        </slot>
        <table v-else-if="!isNoData">
            <tbody>
                <p-definition v-for="(bind, idx) in items" :key="`${contextKey}-${idx}`"
                              class="def-row" v-bind="bind" @copy="onCopy(bind, idx)"
                              :disable-copy="disableCopy"
                >
                    <template #default="scope">
                        <slot :name="`data-${bind.name}`" v-bind="{...scope, index: idx, items}" />
                        <slot :name="`data-${idx}`" v-bind="{...scope, index: idx, items}" />
                    </template>
                    <template #copy="scope">
                        <slot name="copy" v-bind="{...scope, index: idx, items}">
                            <slot :name="`copy-${bind.name}`" v-bind="{...scope, index: idx, items}" />
                            <slot :name="`copy-${idx}`" v-bind="{...scope, index: idx, items}" />
                        </slot>
                    </template>
                    <template v-if="$scopedSlots.key" #key="scope">
                        <slot name="key" v-bind="{...scope, index: idx, items}" />
                    </template>
                </p-definition>
            </tbody>
        </table>
        <slot v-if="loading" name="loading">
            <div class="loading-backdrop fade-in" />
            <p-lottie name="thin-spinner" :size="2.5"
                      :auto="true" class="loading"
            />
        </slot>
    </div>
</template>

<script lang="ts">
import { every, range, get } from 'lodash';

import {
    computed, defineComponent, reactive, toRefs, watch,
} from '@vue/composition-api';

import {
    DefinitionTableProps, DefinitionData, DefinitionField,
} from '@/data-display/tables/definition-table/type';
import PDefinition from '@/data-display/tables/definition-table/definition/PDefinition.vue';
import PLottie from '@/foundation/lottie/PLottie.vue';
import PEmpty from '@/data-display/empty/PEmpty.vue';
import { DefinitionProps } from '@/data-display/tables/definition-table/definition/type';

const makeDefItems = (fields: DefinitionField[], data?: DefinitionData): DefinitionProps[] => fields.map(item => ({
    ...item,
    data: get(data, item.name, ''),
}));

export default defineComponent<DefinitionTableProps>({
    name: 'PDefinitionTable',
    components: {
        PLottie, PEmpty, PDefinition,
    },
    props: {
        fields: {
            type: Array,
            default: () => [],
        },
        data: {
            type: Object,
            default: undefined,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        skeletonRows: {
            type: Number,
            default: 5,
        },
        disableCopy: {
            type: Boolean,
            default: false,
        },
        styleType: {
            type: String,
            default: DEFINITION_TABLE_STYLE_TYPE.primary,
            validator(styleType: any) {
                return Object.values(DEFINITION_TABLE_STYLE_TYPE).includes(styleType);
            },
        },
    },
    setup(props: DefinitionTableProps, { emit }) {
        const state = reactive({
            contextKey: Math.floor(Math.random() * Date.now()),
            isNoData: computed(() => every(state.items, def => !def.data)),
            skeletons: computed(() => range(props.skeletonRows)),
            items: computed(() => makeDefItems(props.fields, props.data)),
        });

        watch([() => props.data, () => props.fields], () => {
            state.contextKey = Math.floor(Math.random() * Date.now());
        });

        return {
            ...toRefs(state),
            onCopy(bind, idx) {
                emit('copy', bind, idx);
                emit(`copy:${bind.name}`, bind, idx);
            },
        };
    },
});
</script>

<style lang="postcss">
.p-definition-table {
    @apply relative;
    z-index: 0;
    min-height: 11.25rem;
    .no-data {
        min-height: 11.25rem;
    }
    table {
        @apply w-full;
        table-layout: fixed;
        td {
            @apply border-white;
            line-height: 1.8;
            word-break: break-word;
        }
    }
    .def-row {
        td:first-child {
            @apply border-r-2;
        }
    }
    .loading-backdrop {
        @apply absolute w-full h-full overflow-hidden;
        background-color: rgba(theme('colors.white'), 0.5);
        top: 0;
        z-index: 1;
    }
    .loading {
        @apply absolute flex w-full h-full justify-center items-center;
        top: 0;
        max-height: 10rem;
        z-index: 2;
    }

    /* style types */
    @define-mixin style-type $table-border-color, $stripe-bg-color, $row-border-color, $key-border-color {
        table {
            td {
                border-color: $table-border-color;
            }
            tr {
                border-color: $row-border-color;
            }
        }
        .def-row {
            &:nth-child(2n+1) {
                background-color: $stripe-bg-color;
            }
            td:first-child {
                border-color: $key-border-color;
            }
        }
    }

    &.primary {
        @mixin style-type theme('colors.white'), theme('colors.violet.100'), transparent, theme('colors.white');
    }
    &.white {
        @mixin style-type theme('colors.white'), theme('colors.white'), theme('colors.gray.300'), theme('colors.white');
        @apply rounded-lg border border-gray-200;
        table {
            tr {
                @apply border-b;
                &:first-of-type {
                    @apply rounded-t-lg;
                }
                &:last-of-type {
                    @apply rounded-b-lg border-b-0;
                }
            }
        }
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
}
</style>
