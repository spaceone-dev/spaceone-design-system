<script lang="ts">
import _ from 'lodash';
import PDynamicField from '@/components/organisms/dynamic-field/PDynamicField.vue';
import { DynamicField, EnumOptions } from '@/components/organisms/dynamic-field/type';

export default {
    name: 'PDynamicFieldEnum',
    functional: true,
    components: { PDynamicField },
    props: {
        options: {
            type: Object,
            default: () => ({}),
        },
        data: {
            type: [String, Object, Array, Boolean, Number],
            required: true,
        },
    },
    render(h, { props }) {
        // eslint-disable-next-line camelcase
        const enumOptions: EnumOptions = props.options;
        const option: Omit<DynamicField, 'data'> = _.get(
            enumOptions,
            [props.data],
            { type: 'text' },
        );
        return h(PDynamicField, { props: { ...option, data: props.data } });
    },
};
</script>
