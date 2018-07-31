/**
 * Strip unnecessary last zeros after dot
 * @param num
 * @return {string|number}
 */
export default function stripZeros(num) {
    if (typeof num === 'string') {
        if (num.indexOf('.') !== -1) {
            if (!/[eE]/.test(num)) {
                // strip ending zeros
                num = num.replace(/\.?0+$/, '');
            } else {
                // strip ending zeros in exponential notation
                num = num.replace(/\.?0+(?=[eE])/, '');
            }
        }
        // strip leading zeros
        num = num.replace(/^0+(?!\.)(?!$)/, '');
    }
    return num;
}
