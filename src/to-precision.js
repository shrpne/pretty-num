import stripZeros from './strip-zeros';
import padZerosToFixed from './pad-zeros-to-fixed';

/**
 * @typedef {number} PRECISION_SETTING
 * */

/**
 * @enum {PRECISION_SETTING}
 */
export const PRECISION_SETTING = {
    REDUCE: 1,
    REDUCE_SIGNIFICANT: 2,
    FIXED: 3,
    INCREASE: 4,
};

/**
 * @typedef {number} ROUNDING_MODE
 * */

/**
 * @enum {ROUNDING_MODE}
 */
export const ROUNDING_MODE = {
    UP: 1,
    DOWN: 2,
    CEIL: 3,
    FLOOR: 4,
    HALF_UP: 5,
    HALF_DOWN: 6,
    HALF_EVEN: 7,
};

/**
 * Reduce precision, accept precision settings:
 * - 'reduce', 'default' - reduce precision to specified number of decimal digits, strip unnecessary ending zeros.
 * - 'reduceSignificant', 'significant' - reduce precision to specified number of significant decimal digits, strip unnecessary ending zeros.
 * - 'fixed' - reduce precision to specified number of decimal digits, pad with ending zeros.
 * - 'increase' - pad with ending zeros to increase precision to specified number of decimal digits.
 * Don't work with exponential notation, use `from-exponential` if necessary
 * @param {string|number} num
 * @param {number} [precision]
 * @param {Object} [options]
 * @param {PRECISION_SETTING} [options.precisionSetting]
 * @param {ROUNDING_MODE} [options.roundingMode
 * @return {string}
 */
export default function toPrecision(num, precision, options = {}) {
    num = num.toString();

    // leave exponential untouched
    if (num.toLowerCase().indexOf('e') !== -1) {
        return num;
    }

    if (!options.precisionSetting) {
        options.precisionSetting = PRECISION_SETTING.REDUCE;
    }

    if (options.precisionSetting === PRECISION_SETTING.FIXED) {
        let result = _reducePrecision(num, precision, {
            precisionSetting: PRECISION_SETTING.REDUCE,
            roundingMode: options.roundingMode,
        });
        result = stripZeros(result, true);
        result = padZerosToFixed(result, precision);
        return result;
    } else if (options.precisionSetting === PRECISION_SETTING.INCREASE) {
        const result = stripZeros(num);
        return padZerosToFixed(result, precision);
    } else {
        return stripZeros(_reducePrecision(num, precision, options));
    }
}

/**
 * Reduce precision with `reduce` or `reduceSignificant` precisionSetting, can produce ending dot or zeros
 * @param {string} numString
 * @param {number} precision
 * @param {PRECISION_SETTING} [precisionSetting]
 * @param {ROUNDING_MODE} [roundingMode]
 * @return {string}
 */
export function _reducePrecision(numString, precision, {precisionSetting = PRECISION_SETTING.REDUCE, roundingMode = ROUNDING_MODE.HALF_UP}) {
    // do not proceed falsy precision, except `0`
    if (!precision && precision !== 0) {
        return numString;
    }
    precision = Number(precision);

    const parts = numString.split('.');
    let partWhole = parts[0];
    const partDecimal = parts[1];

    // nothing to reduce
    if (!partDecimal) {
        return numString;
    }

    // save negation and remove from string
    let negation = false;
    if (partWhole[0] === '-') {
        negation = true;
        partWhole = partWhole.substring(1);
    }

    // remove dot from string (it's easier to work with single integer value), dot position will be restored from parts length
    numString = partWhole + partDecimal;

    // if precision setting is `reduceSignificant` then start discount from zeros, ex. `.0000`, otherwise discount starting from dot `.`
    if (precisionSetting === PRECISION_SETTING.REDUCE_SIGNIFICANT) {
        const discountStartMatch = partDecimal.match(/^0*/);
        if (discountStartMatch) {
            precision += discountStartMatch[0].length;
        }
    }

    // index from which to start erasing
    const discountStartIndex = partWhole.length + precision;
    // length of decimal part after erasing
    const discountedDecimalPartLength = Math.min(partDecimal.length, precision);

    // erased part
    const remainder = numString.substr(discountStartIndex);
    // string after erasing
    numString = numString.substr(0, discountStartIndex);

    // increment if needed by rounding mode
    if (remainder && greaterThanFive(remainder, numString, negation, roundingMode)) {
        numString = increment(numString);
    }

    // restore dot position from string end
    if (discountedDecimalPartLength) {
        const integerPartLength = numString.length - discountedDecimalPartLength;
        numString = `${numString.substr(0, integerPartLength)}.${numString.substr(integerPartLength)}`;
    }

    // restore negation
    return (negation ? '-' : '') + numString;
}


/**
 *
 * @param {string} part
 * @param {string} pre
 * @param {boolean} neg
 * @param {ROUNDING_MODE} mode
 * @return {boolean}
 */
function greaterThanFive(part, pre, neg, mode) {
    if (!part || part === new Array(part.length + 1).join('0')) return false;

    // #region UP, DOWN, CEILING, FLOOR
    if (mode === ROUNDING_MODE.DOWN || (!neg && mode === ROUNDING_MODE.FLOOR)
        || (neg && mode === ROUNDING_MODE.CEIL)) return false;

    if (mode === ROUNDING_MODE.UP || (neg && mode === ROUNDING_MODE.FLOOR)
        || (!neg && mode === ROUNDING_MODE.CEIL)) return true;
    // #endregion

    // case when part !== five
    const five = `5${new Array(part.length).join('0')}`;
    if (part > five) return true;
    else if (part < five) return false;

    // case when part === five
    switch (mode) {
    case ROUNDING_MODE.HALF_DOWN: return false;
    case ROUNDING_MODE.HALF_UP: return true;
    case ROUNDING_MODE.HALF_EVEN:
    default: return (parseInt(pre[pre.length - 1], 10) % 2 === 1);
    }
}

/**
 *
 * @param {string} part
 * @param {number} [value = 1]
 * @return {string}
 */
function increment(part, value = 1) {
    let str = '';
    // traverse string backward
    for (let i = part.length - 1; i >= 0; i -= 1) {
        let digit = parseInt(part[i], 10) + value;
        if (digit === 10) {
            value = 1;
            digit = 0;
        } else {
            value = 0;
        }
        str += digit;
    }
    if (value) {
        str += value;
    }

    return str.split('').reverse().join('');
}
