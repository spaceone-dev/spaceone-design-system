<template>
    <span class="p-radio"
          :class="{
              selected: isSelected,
              disabled, errored
          }"
          @click.stop.prevent="onClick"
          v-on="$listeners"
    >
        <slot name="radio-left" />
        <input type="radio">
        <slot :slot-scope="$props" name="icon" :icon-name="iconName">
            <p-i :class="computedIconClass" width="1.25rem" height="1.25rem"
                 :color="isSelected ? undefined : 'inherit transparent'"
                 :name="iconName"
            />
        </slot>
        <span v-if="$scopedSlots.default" :class="computedClass" @click.stop="onClick">
            <slot name="default" />
        </span>
    </span>
</template>

<script>
import { ref, computed } from '@vue/composition-api';
import PI from '@/components/atoms/icons/PI.vue';

export default {
  name: 'PRadio',
  events: ['change'],
  components: { PI },
  model: {
    prop: 'selected',
    event: 'change',
  },
  props: {
    selected: [Boolean, String, Number, Object, Array],
    value: {
      type: [Boolean, String, Number, Object, Array],
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errored: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const isSelected = computed(() => props.selected === props.value);

    const onClick = () => {
      if (!isSelected.value) {
        if (typeof props.selected === 'object') {
          if (props.selected instanceof Array) emit('change', [...props.value], isSelected.value);
          else emit('change', { ...props.value }, isSelected.value);
        } else emit('change', props.value, isSelected.value);
      }
    };
    const computedClass = computed(() => {
      if (props.disabled) return 'disabled';
      if (props.errored) return 'errored';
      return 'text';
    });
    const computedIconClass = computed(() => {
      if (props.disabled) return 'disabled';
      if (props.errored) return 'errored';
      return 'radio-icon';
    });
    const iconName = computed(() => {
      if (props.disabled) return 'ic_radio--disabled';
      if (isSelected.value) return 'ic_radio--checked';
      return 'ic_radio';
    });
    return {
      isSelected,
      iconName,
      computedClass,
      computedIconClass,
      onClick,
    };
  },
};
</script>

<style lang="postcss">
.p-radio {

    &:hover {
        .text {
            @apply text-blue-500;
        }
        .radio-icon {
            @apply text-gray-900;
        }
    }

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    span {
        @apply text-gray-900 cursor-pointer;
        font-weight: 400;
        font-size: 14px;
    }

    .disabled {
        @apply text-gray-400;
        cursor: not-allowed;
    }

    .errored {
        @apply text-red-500 cursor-pointer;
    }

    .radio-icon {
        @apply text-gray-400 cursor-pointer;
    }
}
</style>
