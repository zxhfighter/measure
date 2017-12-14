import { Injectable } from '@angular/core';

/**
 * input default config
 */
@Injectable()
export class Hand {
    initPos: number;
    active: boolean;
}

export class Info {
    initPos: number;
    endPos: number;
}

export class Scope {
    [index: number]: Hand;
}

export type CoreValue = number[] | number;
