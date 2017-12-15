import {Injectable} from '@angular/core';

@Injectable()
export class SelectConfig {
    value?: number|null;
    label: string;
    children?: any[];
}

export class OptionsStyles {
    left?: string;
    top?: string;
    bottom?: string;
}
