import { Injectable } from '@angular/core';
import { Scope } from './slider.config';
import { CoreValue } from './slider.config';
@Injectable()
export class SliderService {
    /**
     * 根据输入值计算tracker的width
     * @param value input value
     */
    getWidthFromValue(value: CoreValue, min: number, max: number): number {
        let trackerMin = value[0] ? value[0] : min;
        let trackerMax = value[1] ? value[1] : value;
        return (trackerMax - trackerMin) / (max - min) * 100;
    }

    /**
     * get the offset of an element relative to the document (Reference from jquery's offset())
     * @param elem HTMLElement ref
     */
    getElementOffset(elem: HTMLElement): { top: number, left: number } {
        // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
        // Support: IE <=11 only
        // Running getBoundingClientRect on a
        // disconnected node in IE throws an error
        if (!elem.getClientRects().length) {
            return { top: 0, left: 0 };
        }
        // Get document-relative position by adding viewport scroll to viewport-relative gBCR
        const rect = elem.getBoundingClientRect();
        const win = elem.ownerDocument.defaultView;
        return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
        };
    }

}
