import { Injectable } from '@angular/core';

@Injectable()
export class SelectConfig {
    value?: any;
    label: string;
    children?: any[];
}

export class OptionsStyles {
    left?: string;
    top?: string;
    bottom?: string;
}
