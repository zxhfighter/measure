import { Injectable } from '@angular/core';

@Injectable()

export class Hand {
    initPos: number;
}

export class Info {
    initPos: number;
    endPos: number;
}

export class Scope {
    [index: number]: Hand;
}

export type CoreValue = number[] | number;
