import {coerceBooleanProperty} from '../util/coerce';
import {Constructor} from './constructor';

export interface CanDisable {
    disabled: boolean;
}

export function mixinDisabled<T extends Constructor<{}>>(base: T)
    : Constructor<CanDisable> & T {
    return class extends base {
        private _disabled: boolean = false;

        get disabled() {return this._disabled;};
        set disabled(value: any) {
            this._disabled = coerceBooleanProperty(value);
        }

        constructor(...args: any[]) {super(...args);}
    }
}
