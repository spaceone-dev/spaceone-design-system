import { argTypes as searchArgTypes } from '@/inputs/search/search/story-helper';
import { argTypes as contextMenuArgTypes } from '@/inputs/context-menu/story-helper';
import { ArgTypes } from '@storybook/addons';

const extraArgTypes = {
    visibleMenu: {
        name: 'visibleMenu',
        type: { name: 'boolean' },
        description: 'Whether to show the autocomplete menu or not. Automatically determined if no value is given. `sync` props',
        defaultValue: undefined,
        table: {
            type: {
                summary: 'boolean',
            },
            category: 'props',
            defaultValue: {
                summary: 'undefined',
            },
        },
        control: {
            type: 'boolean',
        },
    },
    handler: {
        name: 'handler',
        type: { name: 'function' },
        description: 'Handler that returns auto-completion menu according to input value. If no value is given, the default handler is executed.',
        defaultValue: undefined,
        table: {
            type: {
                summary: 'function',
            },
            category: 'props',
            defaultValue: {
                summary: 'undefined',
            },
        },
        control: {
            type: 'object',
        },
    },
    disableHandler: {
        name: 'disableHandler',
        type: { name: 'boolean' },
        description: 'Whether to execute handler automatically or not.',
        defaultValue: false,
        table: {
            type: {
                summary: 'boolean',
            },
            category: 'props',
            defaultValue: {
                summary: 'false',
            },
        },
        control: {
            type: 'boolean',
        },
    },
    onHideMenu: {
        name: 'hide-menu',
        description: 'Emitted when the menu starts to hide.',
        defaultValue: null,
        table: {
            type: {
                summary: null,
            },
            category: 'events',
            defaultValue: {
                summary: null,
            },
        },
    },
    onShowMenu: {
        name: 'show-menu',
        description: 'Emitted when the menu starts to show.',
        defaultValue: null,
        table: {
            type: {
                summary: null,
            },
            category: 'events',
            defaultValue: {
                summary: null,
            },
        },
    },
    onFocusMenu: {
        name: 'focus-menu',
        description: 'Emitted when menu is focused.',
        defaultValue: null,
        table: {
            type: {
                summary: null,
            },
            category: 'events',
            defaultValue: {
                summary: null,
            },
        },
    },
    onSelectMenu: {
        name: 'select-menu',
        description: 'Emitted when menu item is selected.',
        defaultValue: null,
        table: {
            type: {
                summary: null,
            },
            category: 'events',
            defaultValue: {
                summary: null,
            },
        },
    },
};

const initSearchArgTypes = (): ArgTypes => {
    const argTypes: ArgTypes = {};
    Object.keys(searchArgTypes).forEach((k) => {
        const item = searchArgTypes[k];
        if (item.table?.category === 'slots') {
            argTypes[`search-${k}`] = { ...item, name: `search-${k}` };
        } else {
            argTypes[k] = item;
        }
    });
    return argTypes;
};

const initContextMenuArgTypes = (): ArgTypes => {
    const argTypes: ArgTypes = {
        menu: contextMenuArgTypes.menu,
        loading: contextMenuArgTypes.loading,
    };
    Object.keys(contextMenuArgTypes).forEach((k) => {
        const item = contextMenuArgTypes[k];
        if (item.table?.category === 'slots') {
            argTypes[`menu-${k}`] = { ...item, name: `menu-${k}` };
        }
    });
    return argTypes;
};

export const argTypes: ArgTypes = {
    ...initSearchArgTypes(),
    ...initContextMenuArgTypes(),
    ...extraArgTypes,
};
