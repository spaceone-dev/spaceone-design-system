import {computed, getCurrentInstance, ref, Ref} from '@vue/composition-api';

export const makeByPassListeners = (listeners: Record<string, Function | Function[]>, name: string, ...args: any[]) => {
    // @ts-ignore
    if (Array.isArray(listeners[name])) listeners[name].forEach(f => f(...args));
    // @ts-ignore
    else if (typeof listeners[name] === 'function') listeners[name](...args);
};


/**
 * make proxy computed that same name as props
 * @param name
 * @param props
 * @param emit
 * @return {Ref<*>}
 */
export const makeProxy = <T extends any>(name: string, props: any, emit: any): Ref<T> => computed({
    get: () => props[name],
    set: (val) => {
        if (emit) {
            emit(`update:${name}`, val);
        } else {
            emit(val);
        }
    },
});


/**
 * 여러 엘리먼트에서 마우스 오버 여부 추적에 필요한 함수 모음
 * @param disabled
 * @return {{onMouseOut: onMouseOut, isMouseOver: Ref<HasDefined<S> extends true ? S : RefValue<T>>, onMouseOver: onMouseOver}}
 */
export const mouseOverState = (disabled?: boolean) => {
    const disable = disabled || false;
    const isMouseOver = ref(false);
    const onMouseOver = () => {
        if (!disable && !isMouseOver.value) {
            isMouseOver.value = true;
        }
    };
    const onMouseOut = () => {
        if (!disable && isMouseOver.value) {
            isMouseOver.value = false;
        }
    };
    return {
        isMouseOver,
        onMouseOver,
        onMouseOut,
    };
};
