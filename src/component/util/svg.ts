export const polarToCartesian = (
    centerX: number, centerY: number,
    radius: number, angleInDegrees: number
): any => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

export const describeArc = (
    x: number, y: number, radius: number,
    startAngle: number, endAngle: number, onlyM = false
): any => {

    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
    const d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, arcSweep, 0, end.x, end.y
    ].join(' ');

    return onlyM ? {x: start.x, y: start.y} : d;
};
