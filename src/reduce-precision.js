import stripZeros from './strip-zeros';
import padZerosToFixed from './pad-zeros-to-fixed';

export const ROUNDING_DEFAULT = 'default';
export const ROUNDING_SIGNIFICANT = 'significant';
export const ROUNDING_FIXED = 'fixed';

/**
 * Reduce precision, accept `default`, `significant` or `fixed` rounding
 * @param {string|number} num
 * @param {number} [precision]
 * @param {Object} [options]
 * @param {'default'|'significant'|'fixed'} [options.rounding]
 * @return {string}
 */
export default function reducePrecision(num, precision, options = {}) {
    if (!options.rounding) {
        options.rounding = ROUNDING_DEFAULT;
    }

    if (options.rounding !== ROUNDING_FIXED) {
        return stripZeros(_reducePrecision(num, precision, options));
    } else {
        let result = _reducePrecision(num, precision, {
            rounding: ROUNDING_DEFAULT,
        });
        result = stripZeros(result, true);
        result = padZerosToFixed(result, precision);
        return result;
    }
}

/**
 * Reduce precision with `default` or `significant` rounding, can produce ending zeros
 * @param {string|number} num
 * @param {number} precision
 * @param {'default'|'significant'} rounding
 * @return {string}
 */
export function _reducePrecision(num, precision, {rounding}) {
    const numString = num.toString();

    // do not proceed falsey precision
    if (!precision && precision !== 0) {
        return numString;
    }

    // decimal exponential number
    if ((/e-/i).test(numString)) {
        if (rounding === ROUNDING_SIGNIFICANT) {
            return num.toPrecision(precision);
        } else {
            return num.toFixed(precision);
        }
    }
    // integer exponential number
    if ((/e/i).test(numString)) {
        return numString;
    }

    // if rounding type is `significant` then discounting zeros, ex. `.0000`, otherwise discount starting from dot `.`
    const discountedFractionRegex = rounding === ROUNDING_SIGNIFICANT ? /\.0*/ : /\./;
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
