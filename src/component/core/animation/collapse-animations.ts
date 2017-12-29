
import {
    animate,
    state,
    style,
    transition,
    trigger,
    keyframes,
    AnimationTriggerMetadata,
} from '@angular/animations';

export const collapseAnimation: AnimationTriggerMetadata = trigger('collapseAnimation', [
    state('inactive', style({
        opacity: '0',
        height: 0
    })),
    state('active', style({
        opacity: '1',
        height: '*'
    })),
    transition('inactive => active', animate('150ms ease-in')),
    transition('active => inactive', animate('150ms ease-out'))
]);



