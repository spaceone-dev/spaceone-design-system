<script lang="ts">
import { DateTime as dt } from 'luxon';
import {DatetimeOptions} from "@/components/organisms/dynamic-field/type";

export default {
    name: 'PDynamicFieldDatetime',
    functional: true,
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
    render(h, { props, data }) {
        let result = '';
        const options: DatetimeOptions = props.options;
        if (props.data) {
            let time: dt;
            if (options.source_type === 'iso861') {
                if (options.source_format) {
                    time = dt.fromFormat(props.data, options.source_format);
                } else {
                    time = dt.fromISO(props.data);
                }
            } else if (options.source_format === 'seconds') {
                time = dt.fromSeconds(Number(props.data));
            } else {
                time = dt.fromISO(props.data);
            }

            time = time.setZone(options.timezone ? options.timezone : 'UTC');
            if (options.display_format) {
                result = time.toFormat(options.display_format);
            } else {
                result = time.toFormat('yyyy-LL-dd HH:mm:ss'); // 'yyyy-LL-dd HH:mm:ss ZZZZ' For display Timezone
                // result = time.toFormat('yyyy-LL-dd HH:mm:ss ZZZZ'); // 'yyyy-LL-dd HH:mm:ss ZZZZ' For display Timezone
            }
        }
        return h('span', data, result);
    },
};
</script>
