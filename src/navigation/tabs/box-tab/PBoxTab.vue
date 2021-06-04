<template>
    <div class="p-box-tab">
        <div class="box-group">
            <button v-for="(tab, idx) in tabItems"
                    :key="tab.name"
                    :class="{ active: activeTab && activeTab === tab.name}"
                    @click="onClickTab(tab, idx)"
            >
                <p-i v-show="activeTab && activeTab === tab.name" name="ic_check" color="inherit" />
                <span>{{ tab.label }}</span>
            </button>
        </div>
        <div class="tab-pane">
            <slot />
            <keep-alive>
                <slot v-if="keepTabNames.includes(activeTab)" :name="activeTab" v-bind="currentTabItem" />
            </keep-alive>
            <slot v-if="nonKeepTabNames.includes(activeTab)" :name="activeTab" v-bind="currentTabItem" />
        </div>
    </div>
</template>

<script lang="ts">
import { TabProps, useTab } from '@/hooks/tab';
import { defineComponent, toRefs } from '@vue/composition-api';
import PI from '@/foundation/icons/PI.vue';

type Props = TabProps

export default defineComponent({
    name: 'PBoxTab',
    components: { PI },
    model: {
        prop: 'activeTab',
        event: 'update:activeTab',
    },
    props: {
        /* tab item props */
        tabs: {
            type: Array,
            default: () => [],
        },
        activeTab: {
            type: String,
            default: '',
        },
        keepAliveAll: {
            type: Boolean,
            default: false,
        },
    },
    setup(props: Props, context) {
        const { state, onClickTab } = useTab(props, context);
        return {
            ...toRefs(state),
            onClickTab,
        };
    },
});
</script>

<style lang="postcss">
.p-box-tab {
    $button-margin: 0.25rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    .box-group {
        display: flex;
        flex: 1;
        justify-content: space-evenly;
        width: calc(100% + $button-margin + $button-margin);
        margin: -$button-margin;
        button {
            @apply bg-gray-100 text-gray-500 border border-gray-200 rounded-sm;
            line-height: 1.6;
            font-size: 0.875rem;
            font-weight: bold;
            cursor: pointer;
            white-space: nowrap;
            padding: 1rem;
            min-height: 3.375rem;
            margin: $button-margin;
            width: 100%;
            flex: 1;
            vertical-align: middle;

            @media (hover: hover) {
                &:hover:not(.active) {
                    @apply bg-blue-100 text-indigo-400;
                }
            }

            &.active {
                @apply bg-primary1 border-primary1 text-white;
            }
        }
    }
    .tab-pane {
        margin-top: 1.5rem;
        flex-grow: 1;
        flex-shrink: 0;
    }
}
</style>
