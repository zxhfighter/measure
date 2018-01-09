/**
 * create an uuid string
 *
 * @param len - uuid string length
 * @return {string} uuid string
 */
export const uuid = (len: number = 6) => {
    return Math.random().toString(16).slice(2, 2 + len);
};
