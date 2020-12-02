/* eslint-disable camelcase */
import PJsonSchemaForm from '@/components/organisms/forms/json-schema-form/PJsonSchemaForm.vue';
import PButton from '@/components/atoms/buttons/PButton.vue';
import {
    toRefs, reactive,
} from '@vue/composition-api';
// import { JsonSchemaObjectType } from '@/components/util/type';

export default {
    title: 'organisms/forms/json-schema-form',
    component: PJsonSchemaForm,
};
const defaultSchema = {
    type: 'object',
    properties: {
        required_string: {
            title: 'string (required, minLength=4)',
            type: 'string',
            default: 'default string',
            minLength: 4,
        },
        not_required_string: {
            title: 'string (not-required, placeholder)',
            type: 'string',
            examples: ['type string'],
        },
        //
        required_number: {
            title: 'number (required, minimum=1, maximum=3)',
            type: 'number',
            minimum: 1,
            maximum: 3,
            default: 1,
        },
        required_integer: {
            title: 'integer (required, minimum=0, maximum=5)',
            type: 'integer',
            minimum: 0,
            maximum: 5,
            default: 1,
        },
        // required_array: {
        //     title: 'array (required)',
        //     type: 'array',
        // },
        //
        // boolean_field: {
        //     title: 'I am boolean type',
        //     type: 'boolean',
        // },
        // required_enum_string: {
        //     title: 'string (required, enum)',
        //     type: 'string',
        //     enum: ['choice A', 'choice B', 'choice C'],
        // },
        // required_enum_number: {
        //     title: 'string (required, enum)',
        //     type: 'number',
        //     enum: [1, 2, 3, 4, 5],
        // },
        // number_array: {
        //     title: 'I am Array(Number) Type',
        //     type: 'array',
        //     examples: ['type number'],
        //     items: {
        //         type: 'number',
        //     },
        // },
    },
    required: ['required_string', 'required_number', 'required_integer'],
};

export const defaultCase = () => ({
    components: { PJsonSchemaForm, PButton },
    template: `
    <div style="width: 50rem">
        <p-json-schema-form :model.sync="model" 
                            :schema="schema" 
                            :is-valid.sync="isValid"
        />
        <pre>{{ model }}</pre>
    </div>
  `,
    setup(props, context) {
        const state = reactive({
            schema: defaultSchema,
            model: {},
            isValid: false,
        });
        return {
            ...toRefs(state),
        };
    },
});

export const customSchemaForm = () => ({
    components: { PJsonSchemaForm, PButton },
    template: `
    <div>
        <p-json-schema-form :model.sync="model"
                            :schema="schema"
                            :is-valid.sync="isValid"
                            :show-validation-errors="showValidationErrors"
        />
        <p-button style-type="primary" @click="validate()"> Validate!</p-button>
        <pre>{{ model }}</pre>
        <div>
            <p>is valid {{ isValid }}</p>
            <p>show validation errors: {{ showValidationErrors }}</p>
        </div>
    </div>
  `,
    setup() {
        const state = reactive({
            schema: defaultSchema,
            model: {},
            isValid: false,
            showValidationErrors: false,
        });
        const validate = () => {
            state.showValidationErrors = true;
        };
        return {
            ...toRefs(state),
            validate,
        };
    },
});

