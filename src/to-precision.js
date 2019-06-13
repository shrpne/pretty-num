import stripZeros from './strip-zeros';
import padZerosToFixed from './pad-zeros-to-fixed';

export const PRECISION_REDUCE = 'reduce';
export const PRECISION_REDUCE_SIGNIFICANT = 'reduceSignificant';
export const PRECISION_FIXED = 'fixed';
export const PRECISION_INCREASE = 'increase';

/**
 * Reduce precision, accept rounding methods:
 * - 'reduce', 'default' - reduce precision to specified number of decimal digits, strip unnecessary ending zeros.
 * - 'reduceSignificant', 'significant' - reduce precision to specified number of significant decimal digits, strip unnecessary ending zeros.
 * - 'fixed' - reduce precision to specified number of decimal digits, pad with ending zeros.
 * - 'increase' - pad with ending zeros to increase precision to specified number of decimal digits.
 * Don't work with exponential notation, use `from-exponential` if necessary
 * @param {string|number} num
 * @param {number} [precision]
 * @param {Object} [options]
 * @param {'reduce'|'reduceSignificant'|'fixed'|'increase'} [options.rounding]
 * @return {string}
 */
export default function toPrecision(num, precision, options = {}) {
    num = num.toString();

    // leave exponential untouched
    if (num.toLowerCase().indexOf('e') !== -1) {
        return num;
    }

    if (!options.rounding) {
        options.rounding = PRECISION_REDUCE;
    }

    if (options.rounding === PRECISION_FIXED) {
        let result = _reducePrecision(num, precision, {
            rounding: PRECISION_REDUCE,
        });
        result = stripZeros(result, true);
        result = padZerosToFixed(result, precision);
        return result;
    } else if (options.rounding === PRECISION_INCREASE) {
        const result = stripZeros(num);
        return padZerosToFixed(result, precision);
    } else {
        return stripZeros(_reducePrecision(num, precision, options));
    }
}

/**
 * Reduce precision with `reduce` or `reduceSignificant` rounding, can produce ending dot or zeros
 * @param {string} numString
 * @param {number} precision
 * @param {'reduce'|'reduceSignificant'} rounding
 * @return {string}
 */
export function _reducePrecision(numString, precision, {rounding = PRECISION_REDUCE}) {
    // do not proceed falsy precision, except `0`
    if (!precision && precision !== 0) {
        return numString;
    }

    // if rounding type is `reduceSignificant` then start discount from zeros, ex. `.0000`, otherwise discount starting from dot `.`
    const discountStartRegex = rounding === PRECISION_REDUCE_SIGNIFICANT ? /\.0*/ : /\./;
    const discountStartMatch = numString.match(discountStartRegex);
    if (discountStartMatch) {
        precision = Number(precision);
        const discountStartIndex = discountStartMatch.index + discountStartMatch[0].length;
        return numString.substr(0, discountStartIndex + precision);
    }

    return numString;
}
