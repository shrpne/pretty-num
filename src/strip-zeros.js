/**
 * Strip unnecessary last zeros after dot
 * @param num
 * @return {string|number}
 */
export default function stripZeros(num) {
    if (typeof num === 'string') {
        // strip ending zeros
        if (num.indexOf('.') !== -1) {
            num = num.replace(/\.?0+$/, '');
        }
        // strip leading zeros
        num = num.replace(/^0+(?!\.)(?!$)/, '');
    }
    return num;
}
