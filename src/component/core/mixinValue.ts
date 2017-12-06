import { Constructor } from './constructor';

export interface CanValue {
    value: any;
}

export function mixinValue<T extends Constructor<{}>>(base: T)
    : Constructor<CanValue> & T {
    return class extends base {
        private _value: any;

        get value() { return this._value; }
        set value(value: any) {
            if (value) {
                this._value = value;
            }
        }

        constructor(...args: any[]) { super(...args); }
    };
}
