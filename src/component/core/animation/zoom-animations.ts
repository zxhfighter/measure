import {
    animate,
    state,
    style,
    transition,
    trigger,
    keyframes,
    AnimationTriggerMetadata,
} from '@angular/animations';

export const zoomAnimation: AnimationTriggerMetadata = trigger('zoomAnimation', [
    state('void', style({ opacity: 0 })),
    state('true', style({ opacity: 1 })),
    state('false', style({ opacity: 0 })),

    transition('* => true',
        animate('5000ms', keyframes([
            style({ opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)', offset: 0 }),
            style({ opacity: 1, offset: 0.5 }),
            style({ opacity: 1, offset: 1.0 })
        ])
    )),
    transition('* => false',
        animate('5000ms', keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)', offset: 0.5 })
        ])
    ))
]);

