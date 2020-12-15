<script lang="ts">
import { getBindClass } from '@/components/util/functional-helpers';
import PI from '@/components/atoms/icons/PI.vue';
import PTooltip from '@/components/molecules/tooltips/PTooltip.vue';
import { BackToTopButton } from '@/components/atoms/back-to-top-button/type';

export default {
    name: 'PBackToTopButton',
    functional: true,
    components: { PI, PTooltip },
    render(h, {
        props, listeners, children, data,
    }) {
        function getClass(attrs: BackToTopButton) {
            const cls = {
                'p-back-to-top-button': true,
                margin: !!attrs.margin,
            };
            if (attrs.location) {
                cls[attrs.location] = true;
            }
            return cls;
        }

        const iconEl = h(PI, {
            props: {
                name: 'ic_back-to-top',
                width: '1.15rem',
                height: '1.15rem',
                color: 'inherit',
            },
        });

        return h('div', {
            ...data,
            class: {
                ...getClass({ ...data.attrs, ...props }),
                ...getBindClass(data.class),
            },
            // on: {
            //     ...listeners,
            //     click: (event) => {
            //         this.intervalId = setInterval(() => {
            //             if (window.pageYOffset === 0) {
            //                 clearInterval(this.intervalId);
            //             }
            //             window.scroll(0, window.pageYOffset - 50);
            //         }, 20);
            //         // if (listeners.click) {
            //         //     if (typeof listeners.click === 'function') {
            //         //         console.log(window);
            //         //         listeners.click(event);
            //         //     } else listeners.click.forEach(func => func(event));
            //         // }
            //     },
            // },
        },
        [iconEl]);
    },
};

</script>

<style lang="postcss">

.p-back-to-top-button {
  @apply font-bold inline-flex justify-center items-center cursor-pointer text-center border border-transparent;
  position: fixed;
  width: 3rem;
  height: 3rem;
  border-radius: 6.25rem;
  background: theme('colors.white');
  border: 1px solid theme('colors.gray.200');
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  color: theme('colors.gray.700');

  transition:
      color 0.15s ease-in-out,
      background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;

 &.topRight {
     top: 0;
     right: 0;
  }

   &.bottomRight {
      bottom: 0;
      right: 0;
   }

&[type="button"], &[type="reset"], &[type="submit"] {
                                      appearance: none;
                                    }

&:hover {
      background: theme('colors.blue.100');
      color: theme('colors.blue.500');
 }
}

</style>
