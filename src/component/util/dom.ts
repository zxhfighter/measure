/**
 * add `className` to the dom element
 * @param {HTMLElement} dom - dom element
 * @param {string} className - class name
 */
export function addClass(dom: HTMLElement, className: string) {
    let originClassName = dom.className;
    if (!originClassName.includes(className)) {
        originClassName += ` ${className}`;
    }
    dom.className = originClassName;
}
