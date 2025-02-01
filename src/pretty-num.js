import fromExponential from 'from-exponential';
import thousands from 'thousands';
import toPrecision from './to-precision.js';

/**
 * @import {PRECISION_SETTING} from './to-precision.js';
 * @import {ROUNDING_MODE} from './to-precision.js';
 */

/**
 * @param {number|string} value
 * @param {object} [options]
 * @param {number} [options.precision]
 * @param {PRECISION_SETTING} [options.precisionSetting = PRECISION_SETTING.REDUCE]
 * @param {ROUNDING_MODE} [options.roundingMode = ROUNDING_MODE.HALF_EVEN]
 * @param {string} [options.thousandsSeparator]
 * @param {string} [options.decimalSeparator = '.']
 * @param {boolean} [options.separateOneDigit = true]
 * @return {string}
 */
export default function prettyNum(value, {precision, precisionSetting, roundingMode, thousandsSeparator, decimalSeparator, separateOneDigit = true} = {}) {
    // remove exponential notation
    let num = fromExponential(value);

    // reduce precision
    num = toPrecision(num, precision, {precisionSetting, roundingMode});

    // skip separation if `!separateOneDigit && num < 10000`
    if (thousandsSeparator && (separateOneDigit || Number(num) >= 10000)) {
        num = thousands(num, thousandsSeparator);
    }

    if (decimalSeparator && decimalSeparator !== '.') {
        num = num.replace('.', decimalSeparator);
    }

    return num;
}
