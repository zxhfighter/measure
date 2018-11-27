import { coerceBooleanProperty } from '../util/coerce';

/**
 * decorate input properties with get and set method, it does two things:
 *
 * - enable boolean input property shorthand
 * - enable listening input property change
 *
 * @param {boolean?} isBooleanProperty - whether the property is a boolean property like disabled
 * @param {boolean?} force force trigger property event(only when the event is defined)
 */
export function OnChange(isBooleanProperty?: boolean, force?: boolean): any {
    const sufix = 'Change';

    return function OnChangeHandler(target: any, propertyKey: string): void {
        const _key = `__${propertyKey}Value`;
        Object.defineProperty(target, propertyKey, {
            get(): any {
                return this[_key];
            },
            set(value: any): void {
                const prevValue = this[_key];
                this[_key] = isBooleanProperty ? coerceBooleanProperty(value) : value;

                if ((prevValue !== this[_key] || force) && this[propertyKey + sufix]) {
                    this[propertyKey + sufix].emit(this[_key]);
                }
            }
        });
    };
}
