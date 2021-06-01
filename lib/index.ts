/* eslint @typescript-eslint/explicit-module-boundary-types: [off] */
/* eslint @typescript-eslint/no-explicit-any: [off] */
/* eslint @typescript-eslint/ban-types: [off] */
export declare type Message =
    string | ((self: any, key: string) => string | undefined);
/**
 * Designates a class method as experimental.
 *
 * @param message experimental text
 * @returns experimental class method
 */
export function experimental(message?: Message): Function;
/**
 * @ignore
 */
export function experimental(
    target: any, key: string, dtor?: PropertyDescriptor): void;
/**
 * @ignore
 */
export function experimental(
    arg0: Message | any, arg1?: string, arg2?: PropertyDescriptor
): Function | void {
    if (typeof arg0 === 'string'
     || typeof arg0 === 'function' && !arg2?.value && !arg2?.get && !arg2?.set
     || typeof arg0 === 'undefined'
    ) {
        return _experimental(arg0);
    }
    _experimental(undefined)(
        arg0 as any, arg1 as string, arg2
    );
}
interface ExperimentalFunction extends Function {
    __experimental__: Function
}
function _experimental(
    message?: Message
) {
    const warn = {} as Record<string, Record<string, boolean>>;
    return function (
        target: any, key: string, dtor?: PropertyDescriptor
    ) {
        const wrap = (
            method: Function, callback: (w: ExperimentalFunction) => void
        ) => {
            const wrapped = function (this: any, ...args: any[]) {
                const name = this.name ?? this.constructor?.name ?? '';
                if (warn[name] === undefined) {
                    warn[name] = {};
                }
                if (warn[name][key] === undefined) {
                    if (typeof message === 'function') {
                        const text = message(this, key);
                        if (typeof text === 'string') {
                            console.warn(`[EXPERIMENTAL] ${name}.${key}: ${text}`);
                        }
                    } else if (typeof message === 'string') {
                        console.warn(`[EXPERIMENTAL] ${name}.${key}: ${message}`);
                    } else {
                        console.warn(`[EXPERIMENTAL] ${name}.${key}`);
                    }
                    warn[name][key] = false;
                }
                return method.apply(this, args);
            };
            wrapped.__experimental__ = method;
            callback(wrapped as ExperimentalFunction);
        };
        if (dtor) {
            if (typeof dtor.value === 'function') {
                wrap(dtor.value, (wrapped) => {
                    dtor.value = wrapped;
                });
            } else {
                if (typeof dtor.get === 'function') {
                    wrap(dtor.get, (wrapped) => {
                        dtor.get = wrapped as any;
                    });
                }
                if (typeof dtor.set === 'function') {
                    wrap(dtor.set, (wrapped) => {
                        dtor.set = wrapped as any;
                    });
                }
            }
        } else {
            wrap(target[key], (wrapped) => {
                target[key] = wrapped;
            });
        }
    };
}
/**
 * @returns original method **unbound** to the original instance.
 */
export function original<T extends Function>(
    method: T
) {
    const m = method as Function as ExperimentalFunction;
    if (typeof m.__experimental__ === 'function') {
        return m.__experimental__ as T;
    } else {
        return method;
    }
}
export default experimental;
