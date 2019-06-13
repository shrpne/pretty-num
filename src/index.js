import fromExponential from 'from-exponential';
import thousands from 'thousands';
import toPrecision from './to-precision';


/**
 * @param {number|string} num
 * @param {number} [precision]
 * @param {string} [rounding]
 * @param {string} [thousandsSeparator]
 * @return {string}
 */
export default function prettyNum(num, {precision, rounding, thousandsSeparator} = {}) {
    // remove exponential notation
    num = fromExponential(num);

    // reduce precision
    num = toPrecision(num, precision, {rounding});

    if (thousandsSeparator) {
        num = thousands(num, thousandsSeparator);
    }

    return num;
}
