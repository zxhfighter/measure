import * as gulpRunSequence from 'run-sequence';

export function sequenceTask(...args: any[]) {
    return (done: any) => {
        gulpRunSequence(
            ...args,
            done
        );
    };
}
