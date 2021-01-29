import { action } from '@storybook/addon-actions';
import { select, boolean } from '@storybook/addon-knobs';

import icon from 'vue-svgicon';
import PIconButton from '@/molecules/buttons/icon-button/PIconButton.vue';
import { ICON_BUTTON_STYLE } from '@/molecules/buttons/icon-button/type';
import { BUTTON_STYLE } from '@/atoms/buttons-new/type';

const iconStyleMapping = {
    solid: 'fas',
    regular: 'far',
    light: 'fal',
    duotone: 'fad',
    brands: 'fab',
};
// const sizeMapping = {
//     xs: 'fa-xs',
//     sm: 'fa-sm',
//     lg: 'fa-lg',
//     '2x': 'fa-2x',
//     '3x': 'fa-3x',
//     '4x': 'fa-4x',
//     '5x': 'fa-5x',
//     '6x': 'fa-6x',
//     '7x': 'fa-7x',
//     '8x': 'fa-8x',
//     '9x': 'fa-9x',
//     '10x': 'fa-10x',
// };
const animationMapping = {
    spin: 'fa-spin',
    pulse: 'fa-pulse',
};
const rotatingMapping = {
    90: 'fa-rotate-90',
    180: 'fa-rotate-180',
    270: 'fa-rotate-270',
};
const flipMapping = {
    horizontal: 'fa-flip-horizontal',
    vertical: 'fa-flip-vertical',
    both: 'fa-flip-both',
};

const icons = Object.keys(icon.icons);


export default {
    title: 'Inputs/Buttons/IconButton',
    component: PIconButton,
    parameters: {
        info: {
            summary: '',
            components: { PIconButton },
        },
    },
};

export const iconButton = () => ({
    components: { PIconButton },
    template: `
        <p-icon-button 
            @click="click"
            :name="iconName"
            :disabled="disabled"
            :iconStyle="iconStyle"
            :size="buttonSize"
            :animation="animation"
            :rotating="rotating"
            :flip="flip"
            :styleType="style-type"
        />`,
    props: {
        iconName: {
            default: select('name', icons, 'ic_refresh'),
        },
        iconStyle: {
            default: select('icon_style', [...Object.keys(iconStyleMapping)], 'solid'),
        },
        disabled: {
            default: boolean('disabled', false),
        },
        buttonSize: {
            default: select('size', ['md', 'sm', 'lg'], 'md'),
        },
        animation: {
            default: select('animation', ['', ...Object.keys(animationMapping)], ''),
        },
        rotating: {
            default: select('rotating', ['', ...Object.keys(rotatingMapping)], ''),
        },
        flip: {
            default: select('flip', ['', ...Object.keys(flipMapping)], ''),
        },
        outline: {
            default: boolean('outline', false),
        },
        styleType: {
            default: select('styleType', [...Object.keys(BUTTON_STYLE)], ICON_BUTTON_STYLE.primary),
        },
        shape: {
            default: select('shape', ['circle', 'square'], 'square'),
        },
    },
    setup() {
        const click = action('click');
        return {
            click,
        };
    },
});
