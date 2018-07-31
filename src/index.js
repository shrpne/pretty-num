import fromExponential from 'from-exponential';
import thousands from 'thousands';
import stripZeros from './strip-zeros';
import reducePrecision from './reduce-precision';


/**
 * @param {number|string} num
 * @param {number} [precision]
 * @param {string} [thousandsSeparator]
 * @return {string}
 */
export default function prettyNum(num, {precision, thousandsSeparator}) {
    // strip zeros
    num = stripZeros(num);

    // remove exponential notation
    num = fromExponential(num);

    // reduce precision
    num = reducePrecision(num, precision);

    if (thousandsSeparator) {
        num = thousands(num, thousandsSeparator);
    }

    return num;
}
