import stripZeros from './strip-zeros';
import reducePrecision from './reduce-precision';
import fromExponential from './from-exponential';

/**
 * @param {number|string} num
 * @param {number} [precision]
 * @return {string}
 */
export default function prettyNum(num, precision) {
    num = stripZeros(num);
    const eParts = String(num).split(/[eE]/);

    if (eParts.length === 2) {
        num = fromExponential(num);
    }

    return reducePrecision(num, precision);
}
