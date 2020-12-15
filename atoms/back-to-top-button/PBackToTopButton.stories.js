import { withDesign } from 'storybook-addon-designs';
import { action } from '@storybook/addon-actions';
import PBackToTopButton from '@/components/atoms/back-to-top-button/PBackToTopButton.vue';
import PI from '@/components/atoms/icons/PI.vue';
import { select, text } from '@storybook/addon-knobs';
import { computed, ref, toRef } from '@vue/composition-api';

export default {
    title: 'Navigation/BackToTopButton',
    component: { PBackToTopButton },
    decorators: [withDesign],
    argTypes: {
        label: {
            description: 'overwritten description',
            table: {
                type: {
                    summary: 'something short',
                    detail: 'something really really long',
                },
            },
            control: {
                type: null,
            },
        },
    },
    parameters: {
        info: {
            summary: '',
            components: { PBackToTopButton },
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/wq4wSowBcADBuUrMEZLz6i/SpaceONE-Console-Design?node-id=5870%3A136238',
        },
    },
};
// const actions = {
//     click: action('click'),
// };
const data = {};

export const backToTopButton = (object, key) => ({
    components: { PBackToTopButton, PI },
    template: `
        <div style="height: 200vh; overflow: scroll; width: 100px;" >
          <p-back-to-top-button
            @click="scrollTop"
            :location="location"
            :style="margin={margin}"
            v-tooltip.right="{content: 'Back to Top', delay: {show: 200}, classes: ['p-tooltip']}"
          />
        </div>`,
    props: {
        location: {
            default: select('location', ['bottomRight', 'topRight'], 'bottomRight'),
        },
        margin: {
            default: text('margin', '2rem'),
        },
    },
    setup(props, context) {
        const hover = ref(false);
        // const margin = computed(() => margin);
        // const visible = ref(false);

        const scrollTop = () => {
            window.scroll(0, 0);
            // this.intervalId = setInterval(() => {
            //     console.log(window.pageXOffset, window.pageYOffset);
            //     if (window.pageYOffset === 0) {
            //         clearInterval(this.intervalId);
            //     }
            //     window.scroll(0, window.pageYOffset - 50);
            // }, 20);
        };
        const scrollListener = (e) => {
            // 스크롤 맨 위일 때에는 visible = false
            // this.visible = window.scrollY > 150;
        };

        return {
            ...(toRef(hover, key)),
            scrollTop,
            scrollListener,
        };
    },
    // mounted() {
    //     window.addEventListener('scroll', this.scrollListener);
    // },
    // beforeDestroy() {
    //     window.removeEventListener('scroll', this.scrollListener);
    // },
});
