/**
 * Coerces a data-bound value (typically a string) to a boolean.
 *
 * @returns boolean
 */
export function coerceBooleanProperty(value: any): boolean {
    if (typeof value === 'boolean') {
        return value;
    }

    return value != null && `${value}` !== 'false';
}
