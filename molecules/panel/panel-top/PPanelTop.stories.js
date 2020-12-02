import {
    toRefs, reactive, ref, computed,
} from '@vue/composition-api';
import { action } from '@storybook/addon-actions';
import {
    text, number, select, object,
} from '@storybook/addon-knobs/vue';
import PPanelTop from '@/components/molecules/panel/panel-top/PPanelTop.vue';

export default {
    title: 'Data Display/Title',
    component: PPanelTop,
    parameters: {
        info: {
            summary: '',
            components: { PPanelTop },
        },
        knobs: { escapeHTML: false },
    },
};

/**
 * propName: {
 *      default: object('propName', {}),
 * }
 */
const getProps = () => ({
    title: {
        default: text('title', 'Title'),
    },
});

const getState = (props, context) => {
    const state = reactive({});

    return state;
};

export const panelTop = () => ({
    components: { PPanelTop },
    props: getProps(),
    template: `
        <div style="width: 80vw;">
            <p-panel-top v-bind="$props">
                {{title}}
            </p-panel-top>
        </div>`,
    setup(props, context) {
        const state = getState(props, context);

        return {
            ...toRefs(state),
        };
    },
});

// export const extraCase = () => ({
//     components: { PPanelTop },
//     props: getProps(),
//     template: `
//     <div style="width: 80vw;">
//         <p-panel-top v-bind="$props">
//             <template>
//             {{title}}
//             </template>
//             <template #extra>
//                 <div style="display: flex; justify-content: space-between;">
//                     <button style="background-color: #0f69ff; padding: .5rem;">Extra button1</button>
//                     <button style="background-color: goldenrod; padding: .5rem;">Extra button2</button>
//                 </div>
//             </template>
//         </p-panel-top>
//     </div>`,
//     setup(props, context) {
//         const state = getState(props, context);
//
//         return {
//             ...toRefs(state),
//         };
//     },
// });
