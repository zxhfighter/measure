import {coerceBooleanProperty} from '../util/coerce';

/**
 * decorate input properties whit get and set method
 *
 * @param {boolean?} isBooleanProperty - whether the property is a boolean property like disabled
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

                if ((prevValue !== value || force) && this[propertyKey + sufix]) {
                    this[propertyKey + sufix].emit(value);
                }
            }
        });
    };
}
