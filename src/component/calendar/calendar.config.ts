import { Injectable } from '@angular/core';

/**
 * calendar config
 */
@Injectable()
export class CalendarConfig {

    /**
     * Validate that startDate is not after endDate
     * @param startDate
     * @param endDate
     * @returns true if valid, false otherwise
     */
    validateRange(startDate: Date, endDate: Date): boolean {
        return startDate <= endDate;
    }
}
