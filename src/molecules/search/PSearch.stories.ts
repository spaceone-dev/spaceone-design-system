import {
    toRefs, reactive,
} from '@vue/composition-api';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import PButton from '@/atoms/buttons/PButton.vue';
import PSearch from '@/molecules/search/PSearch.vue';

export default {
    title: 'Inputs/Search/Search',
    component: PSearch,
    parameters: {
        info: {
            summary: '',
            components: { PSearch },
        },
        knobs: { escapeHTML: false },
    },
};


export const defaultCase = () => ({
    components: { PSearch },
    props: {
        placeholder: {
            default: text('placeholder', 'Search'),
        },
        focused: {
            default: boolean('focused', false),
        },
        disabled: {
            default: boolean('disabled', false),
        },
        disableIcon: {
            default: boolean('disableIcon', false),
        },
    },
    template: `
        <div class="bg-white py-10" style="width: 80vw;">
            <PSearch v-bind="$props"
                     v-model="value"
                     @input="onInput"
                     @delete="onDelete"
                     @focus="onFocus"
                     @blur="onBlur"
                     @search="onSearch"
            ></PSearch>
        </div>`,
    setup(props, context) {
        const state = reactive({
            value: '',
        });

        return {
            ...toRefs(state),
            onInput: action('input'),
            onDelete: action('delete'),
            onFocus: action('focus'),
            onBlur: action('blur'),
            onSearch: action('search'),
        };
    },
});


export const controlFocus = () => ({
    components: { PSearch, PButton },
    props: {
        placeholder: {
            default: text('placeholder', 'Search'),
        },
        disabled: {
            default: boolean('disabled', false),
        },
        disableIcon: {
            default: boolean('disableIcon', false),
        },
    },
    template: `
        <div class="bg-white py-10" style="width: 80vw;">
            <PSearch v-bind="$props"
                     v-model="value"
                     :isFocused.sync="isFocused"
                     @input="onInput"
                     @delete="onDelete"
                     @focus="onFocus"
                     @blur="onBlur"
                     @search="onSearch"
            ></PSearch>
            <p-button @click="isFocused = true">Click here for focus</p-button>
            <p-button @click="isFocused = false">Click here for blur</p-button>
        </div>
        `,
    setup(props, context) {
        const state = reactive({
            value: '',
            isFocused: false,
        });

        return {
            ...toRefs(state),
            onInput: action('input'),
            onDelete: action('delete'),
            onFocus: action('focus'),
            onBlur: action('blur'),
            onSearch: action('search'),
        };
    },
});
