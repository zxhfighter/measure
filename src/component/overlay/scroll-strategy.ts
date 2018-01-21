import { Injectable, Optional, SkipSelf, NgZone, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { auditTime } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { of as observableOf } from 'rxjs/observable/of';

/** Time in ms to throttle the resize events by default. */
export const DEFAULT_RESIZE_TIME = 20;

/**
 * Simple utility for getting the bounds of the browser viewport.
 * @docs-private
 */
@Injectable()
export class ViewportRuler implements OnDestroy {

    /** Cached document client rectangle. */
    private _documentRect?: ClientRect;

    /** Stream of viewport change events. */
    private _change: Observable<Event>;

    /** Subscription to streams that invalidate the cached viewport dimensions. */
    private _invalidateCache: Subscription;

    constructor(ngZone: NgZone) {
        this._change = ngZone.runOutsideAngular(() => {
            return merge<Event>(fromEvent(window, 'resize'), fromEvent(window.document, 'scroll'));
        });
        this._invalidateCache = this.change().subscribe(() => this._cacheViewportGeometry());
    }

    /** Caches the latest client rectangle of the document element. */
    _cacheViewportGeometry() {
        this._documentRect = document.documentElement.getBoundingClientRect();
    }

    ngOnDestroy() {
        this._invalidateCache.unsubscribe();
    }

    /**
     * Returns a stream that emits whenever the size of the viewport changes.
     * @param throttle Time in milliseconds to throttle the stream.
     * @return { Subscription }
     */
    change(throttleTime: number = DEFAULT_RESIZE_TIME): Observable<Event> {
        return throttleTime > 0 ? this._change.pipe(auditTime(throttleTime)) : this._change;
    }
}
