/**
 * a base item type with at least a name and a value
 * 
 * @interface BaseItem
 */
export interface BaseItem {
    name: string;
    value: number | string;
    selected?: boolean;
    disabled?: boolean;
    [key: string]: any;
}
