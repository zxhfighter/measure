/**
 * Date-fns utilities.
 */

import { zhCN } from 'date-fns/esm/locale';
import {
    format, startOfWeek, endOfWeek, startOfDay, eachDayOfInterval
} from 'date-fns';

export type WeekStarts = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** weekdays */
export enum Weekday {
    Sunday,
    Monday,
    Tuesday,
    Wensday,
    Thursday,
    Friday,
    Saturday
}

/**
 * get week day names, such as '日'，'一'， '二'，'六'
 */
export function getDayNames(weekStartsOn: Weekday): string[] {
    return getCurrentWeekArray(new Date(), weekStartsOn)
        .map((day: Date) => format(day, 'EEEEE', { locale: zhCN }));
}

/*
 * get current date's week start date and end date
 */
export function getCurrentWeekArray(day: Date, weekStartsOn: Weekday): Date[] {
    return eachDayOfInterval(
        { start: startOfWeek(day, { weekStartsOn }), end: endOfWeek(day, { weekStartsOn })},
        { step: 1 }
    );
}

/**
 * reset hours/minutes/seconds/milliseconds to zero
 */
export function resetTime(day: Date): Date {
    return startOfDay(day);
}

/**
 * Return the start of a week for the given date. The result will be in the local timezone.
 */
export function getStartOfWeek(day: Date): Date {
    return startOfWeek(day, { weekStartsOn: 1 });
}

/**
 * clone date, return a brand new reference
 */
export function cloneDate(day: Date): Date {
    return new Date(day);
}
