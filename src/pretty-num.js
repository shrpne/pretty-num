import fromExponential from 'from-exponential';
import thousands from 'thousands';
import toPrecision from './to-precision';

/**
 * @param {number|string} num
 * @param {number} [precision]
 * @param {PRECISION_SETTING} [precisionSetting]
 * @param {ROUNDING_MODE} [roundingMode]
 * @param {string} [thousandsSeparator]
 * @param {string} [decimalSeparator]
 * @param {boolean} [separateOneDigit = true]
 * @return {string}
 */
export default function prettyNum(num, {precision, precisionSetting, roundingMode, thousandsSeparator, decimalSeparator, separateOneDigit = true} = {}) {
    // remove exponential notation
    num = fromExponential(num);

    // reduce precision
    num = toPrecision(num, precision, {precisionSetting, roundingMode});

    // skip separation if `!separateOneDigit && num < 10000`
    if (thousandsSeparator && (separateOneDigit || num >= 10000)) {
        num = thousands(num, thousandsSeparator);
    }

    if (decimalSeparator && decimalSeparator !== '.') {
        num = num.replace('.', decimalSeparator);
    }

    return num;
}
