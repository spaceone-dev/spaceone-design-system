<script lang="ts">
import _ from 'lodash';
import PDynamicField from '@/components/organisms/dynamic-field/PDynamicField.vue';
import { getBindClass } from '@/components/util/functional-helpers';
import { DynamicField, DynamicFieldProps, ListOptions } from '@/components/organisms/dynamic-field/type';


export default {
    name: 'PDynamicFieldList',
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
        extra: {
            type: Object,
            default: () => ({}),
        },
    },
    render(h, { props, data: compData }) {
        const listOptions: ListOptions = props.options || {};
        const childOptions: Omit<DynamicField, 'data'> = listOptions.item || { type: 'text' };
        let childrenData: any[] = [];

        const getValue = (data, paths: string[], results: DynamicFieldProps[]): DynamicFieldProps[] => {
            if (Array.isArray(data)) {
                data.forEach((v, idx) => {
                    getValue(data[idx], paths, results);
                });
            } else if (typeof data === 'object') {
                getValue(data[paths[0]], paths.slice(1), results);
            } else if (paths.length === 0 && data !== '' && data !== null && data !== undefined) {
                results.push(data);
            }

            return results;
        };
        if (listOptions.sub_key) {
            const subKey = listOptions.sub_key.split('.');
            childrenData = getValue(props.data, subKey, []);
        } else {
            childrenData = props.data;
        }
        let children: any[] = [];
        if (Array.isArray(childrenData)) {
            children = childrenData.map(data => h(PDynamicField, { props: { ...childOptions, data, extra: props.extra } }));
        }


        const delimiter = listOptions.delimiter || '<br>';
        let delimiterEl;
        if (delimiter === '<br>') {
            delimiterEl = h('br');
        } else {
            delimiterEl = h('span', delimiter);
        }

        if (children.length) {
            const dim = _.fill(Array(children.length - 1), delimiterEl);
            children = _.flatten(_.zip(children, dim));
        }

        return h('span', {
            ...compData,
            class: {
                ...getBindClass(compData.class),
                'dynamic-layout-list': true,
            },
        }, children);
    },
};
</script>

<style lang="postcss">
.dynamic-layout-list {
    line-height: 1.8;
}
</style>
