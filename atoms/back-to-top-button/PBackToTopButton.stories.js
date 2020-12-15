import { withDesign } from 'storybook-addon-designs';
import { action } from '@storybook/addon-actions';
import PBackToTopButton from '@/components/atoms/back-to-top-button/PBackToTopButton.vue';
import PI from '@/components/atoms/icons/PI.vue';
import PTooltip from '@/components/molecules/tooltips/PTooltip.vue';
import { number, select, text } from '@storybook/addon-knobs';

export default {
    title: 'Navigation/BackToTopButton',
    component: {
        PBackToTopButton,
        PI,
        PTooltip,
    },
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

export const backToTopButton = () => ({
    components: { PBackToTopButton, PI, PTooltip },
    template: `
        <div style="height: 200vh; overflow: scroll; width: 100px;" >
          <p-back-to-top-button
            @click="scrollTop"
            :location="location"
            @mouseenter="hover=true"
            @mouseleave="hover=false"
          >
            <p-i name="ic_back-to-top"
                 width="1.15rem"
                 height="1.15rem"
                 :color="hover?'#007EE5':'#5F616D'"
            />
            <p-tooltip v-if="hover" 
                       contents="back to top" 
                       position="auto"/>
          </p-back-to-top-button>
        </div>`,
    data() {
        return {
            ...data,
            hover: false,
        };
    },
    props: {
        location: {
            default: select('location', ['topRight', 'bottomRight'], 'bottomRight'),
        },
        // margin: {
        //     default: text('margin', '2rem'),
        // },
    },
    computed: {

    },
    methods: {
        // ...actions,
        scrollTop() {
            this.intervalId = setInterval(() => {
                console.log(window.pageXOffset, window.pageYOffset);
                if (window.pageYOffset === 0) {
                    clearInterval(this.intervalId);
                }
                window.scroll(0, window.pageYOffset - 50);
            }, 20);
        },
        scrollListener(e) {
            // 스크롤 맨 위일 때에는 unvisible
            // this.visible = window.scrollY > 150;
        },
    },
    mounted() {
        window.addEventListener('scroll', this.scrollListener);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollListener);
    },
});
