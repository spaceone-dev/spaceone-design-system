<template>
    <div class="p-autocomplete-search">
        <p-search ref="searchRef"
                  v-model="proxyValue"
                  :placeholder="placeholder"
                  :focused="focused"
                  :disabled="disabled"
                  :disable-icon="disableIcon"
                  :is-focused.sync="proxyIsFocused"
                  v-on="searchListeners"
        >
            <template v-for="(_, slot) of searchSlots" v-slot:[slot]="scope">
                <slot :name="`search-${slot}`" v-bind="{...scope}" />
            </template>
        </p-search>
        <div v-if="proxyVisibleMenu" class="menu-container">
            <p-context-menu ref="menuRef"
                            theme="secondary"
                            :menu="bindingMenu"
                            :loading="loading"
                            @select="onClickMenuItem"
                            @keyup:up:end="focusSearch"
                            @keyup:esc="focusSearch"
                            @focus="onFocusMenuItem"
            >
                <template v-for="(_, slot) of menuSlots" v-slot:[slot]="scope">
                    <slot :name="`menu-${slot}`" v-bind="scope" />
                </template>
            </p-context-menu>
        </div>
    </div>
</template>

<script lang="ts">

import {
    AutocompleteHandler,
} from '@/inputs/search/autocomplete-search/type';
import PContextMenu from '@/inputs/context-menu/PContextMenu.vue';
import {
    ComponentRenderProxy,
    computed, defineComponent, getCurrentInstance, onMounted, onUnmounted, reactive, toRefs,
} from '@vue/composition-api';
import { makeByPassListeners, makeOptionalProxy } from '@/util/composition-helpers';
import PSearch from '@/inputs/search/search/PSearch.vue';
import { reduce, intersectionWith } from 'lodash';
import { MenuItem } from '@/inputs/context-menu/type';
import Fuse from 'fuse.js';

interface AutocompleteSearchProps {
    value: string;
    placeholder?: string;
    focused?: boolean;
    disabled?: boolean;
    disableIcon?: boolean;
    isFocused?: boolean;
    menu: MenuItem[];
    loading?: boolean;
    visibleMenu?: boolean;
    handler?: AutocompleteHandler;
    disableHandler?: boolean;
}

const fuseOptions = {
    keys: ['label'],
    distance: 100,
    threshold: 0.1,
    ignoreLocation: true,
};

export default defineComponent<AutocompleteSearchProps>({
    name: 'PAutocompleteSearch',
    components: { PSearch, PContextMenu },
    model: {
        prop: 'value',
        event: 'update:value',
    },
    props: {
        /* search props */
        value: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: undefined,
        },
        focused: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        disableIcon: {
            type: Boolean,
            default: false,
        },
        isFocused: {
            type: Boolean,
            default: undefined,
        },
        /* context menu props */
        menu: {
            type: Array,
            default: () => [],
        },
        loading: {
            type: Boolean,
            default: false,
        },
        /* extra props */
        visibleMenu: {
            type: Boolean,
            default: undefined,
        },
        handler: {
            type: Function,
            default: undefined,
        },
        disableHandler: {
            type: Boolean,
            default: false,
        },
    },
    setup(props: AutocompleteSearchProps, { emit, slots, listeners }) {
        const vm = getCurrentInstance() as ComponentRenderProxy;
        const state = reactive({
            searchRef: null,
            menuRef: null,
            proxyValue: makeOptionalProxy('value', vm, ''),
            isAutoMode: computed(() => props.visibleMenu === undefined),
            proxyVisibleMenu: makeOptionalProxy('visibleMenu', vm, false),
            proxyIsFocused: makeOptionalProxy('isFocused', vm, props.focused),
            filteredMenu: [] as MenuItem[],
            bindingMenu: computed<MenuItem[]>(() => (props.disableHandler ? props.menu : state.filteredMenu)),
            searchableItems: computed<MenuItem[]>(() => props.menu.filter(d => d.type === undefined || d.type === 'item')),
            fuse: computed(() => new Fuse(state.searchableItems, fuseOptions)),
        });

        const defaultHandler = (inputText: string, list: MenuItem[]) => {
            let results: MenuItem[] = [...list];
            const trimmed = inputText.trim();
            if (trimmed) {
                results = state.fuse.search(trimmed);
            }
            return { results };
        };


        const filterMenu = async (val: string) => {
            if (props.disableHandler) return;

            let results: MenuItem[];
            if (props.handler) {
                let res = props.handler(val, state.searchableItems);
                if (res instanceof Promise) res = await res;
                results = res.results;
            } else {
                results = defaultHandler(val, state.searchableItems).results;
            }

            const filtered = props.menu.filter((item) => {
                if (item.type && item.type !== 'item') return true;
                return !!results.find(d => d.name === item.name);
            });
            if (filtered[filtered.length - 1]?.type === 'divider') filtered.pop();
            state.filteredMenu = filtered;
        };

        const focusSearch = () => {
            if (state.searchRef) {
                state.searchRef.focus();
            }
        };

        const blurSearch = () => {
            if (state.searchRef) state.searchRef.blur();
        };

        const hideMenu = () => {
            if (state.isAutoMode) state.proxyVisibleMenu = false;
            emit('hide-menu');
        };

        const showMenu = () => {
            if (state.isAutoMode) state.proxyVisibleMenu = true;
            emit('show-menu');
        };

        const focusMenu = () => {
            if (state.bindingMenu.length === 0) return;
            showMenu();

            if (state.menuRef) state.menuRef.focus();
        };

        const allFocusOut = () => {
            blurSearch();
            hideMenu();
        };

        const onWindowKeydown = (e: KeyboardEvent) => {
            if (state.proxyVisibleMenu && ['ArrowDown', 'ArrowUp'].includes(e.key)) {
                e.preventDefault();
            }
        };
        onMounted(() => {
            window.addEventListener('click', hideMenu);
            window.addEventListener('blur', hideMenu);
            window.addEventListener('keydown', onWindowKeydown, false);
        });
        onUnmounted(() => {
            window.removeEventListener('click', hideMenu);
            window.removeEventListener('blur', hideMenu);
            window.removeEventListener('keydown', onWindowKeydown, false);
        });

        const onFocusMenuItem = (idx: string) => {
            emit('focus-menu', idx);
        };

        const onSearchFocus = () => {
            filterMenu(state.proxyValue);
            showMenu();
        };

        const menuSlots = computed(() => reduce(slots, (res, d, name) => {
            if (name.startsWith('menu-')) res[`${name.substring(5)}`] = d;
            return res;
        }, {}));

        const searchSlots = computed(() => reduce(slots, (res, d, name) => {
            if (name.startsWith('search-')) res[`${name.substring(7)}`] = d;
            return res;
        }, {}));

        const onInput = async (val: string, e) => {
            if (!state.proxyVisibleMenu) showMenu();

            state.proxyValue = val;
            emit('input', val, e);

            filterMenu(val);
        };

        const emitSearch = (val?: string) => {
            emit('search', val);
        };

        const onSearch = (val?: string) => {
            emitSearch(val);
            hideMenu();
        };

        const onClickMenuItem = (name, idx) => {
            const result = state.filteredMenu[idx]?.label ?? name;
            state.proxyValue = result;
            if (listeners['select-menu']) emit('select-menu', name, idx);
            else emitSearch(name);
            hideMenu();
        };

        const onDelete = () => {
            emitSearch('');
            focusSearch();
        };

        const searchListeners = {
            ...listeners,
            keyup(e) {
                if (e.key === 'ArrowDown' || e.key === 'Down') focusMenu();
                else if (e.key === 'Escape' || e.key === 'Esc') allFocusOut();
                makeByPassListeners(listeners, 'keyup', e);
            },
            focus(e) {
                onSearchFocus();
                makeByPassListeners(listeners, 'focus', e);
            },
            click(e: MouseEvent) {
                e.stopPropagation();
                showMenu();
                makeByPassListeners(listeners, 'click', e);
            },
            delete(...args) {
                onDelete();
                makeByPassListeners(listeners, 'delete', args);
            },
            search: onSearch,
            input: onInput,
        };

        return {
            ...toRefs(state),
            allFocusOut,
            focusMenu,
            onClickMenuItem,
            focusSearch,
            blurSearch,
            showMenu,
            hideMenu,
            onFocusMenuItem,
            onSearchFocus,
            menuSlots,
            searchSlots,
            onInput,
            onDelete,
            onSearch,
            searchListeners,
        };
    },
});
</script>

<style lang="postcss">
.p-autocomplete-search {
    @apply w-full relative;
    .p-search {
        @apply text-sm font-normal;
    }
    .menu-container {
        @apply w-full relative;
    }
    .p-context-menu {
        @apply font-normal;

        /* min-width: unset; */

        .context-header.secondary {
            @apply text-secondary;
        }
    }
}
</style>
