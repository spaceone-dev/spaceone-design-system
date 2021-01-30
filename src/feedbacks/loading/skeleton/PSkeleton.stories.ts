import {
    toRefs, reactive, ref, computed,
} from '@vue/composition-api';
import {
    text, number, select, object, boolean,
} from '@storybook/addon-knobs';
import PSkeleton from '@/feedbacks/loading/skeleton/PSkeleton.vue';

export default {
    title: 'Feedbacks/Loading/Skeletons',
    component: PSkeleton,
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/wq4wSowBcADBuUrMEZLz6i/SpaceONE-Console-Design?node-id=6980%3A164959',
        },
    },
};

/**
 * propName: {
 *      default: object('propName', {}),
 * }
 */
const getProps = () => ({});

const getState = (props, context) => {
    const state = reactive({});

    return state;
};

export const skeleton = () => ({
    components: { PSkeleton },
    props: {},
    template: `
    <div style="width: 80vw;">
        <PSkeleton v-bind="$props">text</PSkeleton>
    </div>`,
    setup(props, context) {
        const state = getState(props, context);

        return {
            ...toRefs(state),
        };
    },
});
