/**
 * @overload
 * @param {string} num
 * @param {boolean} [keepEnding]
 * @return {string}
 */
/**
 * @overload
 * @param {number} num
 * @param {boolean} [keepEnding]
 * @return {number}
 */

/**
 * Strip unnecessary last zeros after dot
 * @param {string|number} num
 * @param {boolean} [keepEnding] - not strip ending zeros
 * @return {string|number}
 */
export default function stripZeros(num, keepEnding) {
    if (typeof num === 'string') {
        if (!keepEnding && num.indexOf('.') !== -1) {
            // eslint-disable-next-line unicorn/no-negated-condition
            if (!/[eE]/.test(num)) {
                // strip ending zeros
                num = num.replace(/\.?0*$/, '');
            } else {
                // strip ending zeros in exponential notation
                num = num.replace(/\.?0*(?=[eE])/, '');
            }
        }
        // strip leading zeros
        num = num.replace(/^0+(?!\.)(?!$)/, '');
    }
    return num;
}
