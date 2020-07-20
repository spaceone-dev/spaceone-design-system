import { toString } from 'lodash';

/** @function
 * @name selectToCopyToClipboard
 * @description copy given text to clipboard
 * @param {String} text
 * */
export const selectToCopyToClipboard = (t) => {
    const textArea = document.createElement('textarea');
    textArea.value = t;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('Copy');
    textArea.remove();
};

export const copyAnyData = (value) => {
    if (Array.isArray(value)) {
        selectToCopyToClipboard(toString(value));
    } else if (typeof value === 'object') {
        selectToCopyToClipboard(JSON.stringify(value));
    } else selectToCopyToClipboard(value || '');
};
