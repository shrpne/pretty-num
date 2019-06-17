import fromExponential from 'from-exponential';
import thousands from 'thousands';
import toPrecision from './to-precision';


/**
 * @param {number|string} num
 * @param {number} [precision]
 * @param {PRECISION_SETTING} [precisionSetting]
 * @param {ROUNDING_MODE} [roundingMode]
 * @param {string} [thousandsSeparator]
 * @return {string}
 */
export default function prettyNum(num, {precision, precisionSetting, roundingMode, thousandsSeparator} = {}) {
    // remove exponential notation
    num = fromExponential(num);

    // reduce precision
    num = toPrecision(num, precision, {precisionSetting, roundingMode});

    if (thousandsSeparator) {
        num = thousands(num, thousandsSeparator);
    }

    return num;
}
