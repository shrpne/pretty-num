import stripZeros from './strip-zeros';
import padZerosToFixed from './pad-zeros-to-fixed';

export const PRECISION_REDUCE = 'reduce';
export const PRECISION_REDUCE_ALIAS = 'default';
export const PRECISION_REDUCE_SIGNIFICANT = 'reduceSignificant';
export const PRECISION_REDUCE_SIGNIFICANT_ALIAS = 'reduceSignificant';
export const PRECISION_FIXED = 'fixed';
export const PRECISION_INCREASE = 'increase';

// deprecate
export const ROUNDING_DEFAULT = PRECISION_REDUCE_ALIAS;
export const ROUNDING_SIGNIFICANT = PRECISION_REDUCE_SIGNIFICANT_ALIAS;
export const ROUNDING_FIXED = PRECISION_FIXED;

/**
 * Reduce precision, accept rounding methods:
 * - 'reduce', 'default' - reduce precision to specified number of decimal digits, strip unnecessary ending zeros.
 * - 'reduceSignificant', 'significant' - reduce precision to specified number of significant decimal digits, strip unnecessary ending zeros.
 * - 'fixed' - reduce precision to specified number of decimal digits, pad with ending zeros.
 * - 'increase' - pad with ending zeros to increase precision to specified number of decimal digits.
 * @param {string|number} num
 * @param {number} [precision]
 * @param {Object} [options]
 * @param {'reduce'|'reduceSignificant'|'fixed'|'increase'} [options.rounding]
 * @return {string}
 */
export default function toPrecision(num, precision, options = {}) {
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
 * Reduce precision with `reduce` or `reduceSignificant` rounding, can produce ending zeros
 * @param {string|number} num
 * @param {number} precision
 * @param {'reduce'|'reduceSignificant'} rounding
 * @return {string}
 */
export function _reducePrecision(num, precision, {rounding}) {
    const numString = num.toString();

    // do not proceed falsey precision, except `0`
    if (!precision && precision !== 0) {
        return numString;
    }

    // @TODO throw on exponential, suggest to use `from-exponential`
    // decimal exponential number
    if ((/e-/i).test(numString)) {
        if (rounding === PRECISION_REDUCE_SIGNIFICANT || rounding === PRECISION_REDUCE_SIGNIFICANT_ALIAS) {
            return num.toPrecision(precision);
        } else {
            return num.toFixed(precision);
        }
    }
    // integer exponential number
    if ((/e/i).test(numString)) {
        return numString;
    }

    // if rounding type is `reduceSignificant` then discounting zeros, ex. `.0000`, otherwise discount starting from dot `.`
    const discountedFractionRegex = (rounding === PRECISION_REDUCE_SIGNIFICANT || rounding === PRECISION_REDUCE_SIGNIFICANT_ALIAS) ? /\.0*/ : /\./;
    const discountedFraction = numString.match(discountedFractionRegex);
    if (discountedFraction) {
        precision = Number(precision);
        if (precision === 0) {
            // discount including dot
            return numString.substr(0, discountedFraction.index);
        } else {
            const significantFractionIndex = discountedFraction.index + discountedFraction[0].length;
            return numString.substr(0, significantFractionIndex + precision);
        }
    }

    return numString;
}
