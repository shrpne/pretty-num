/**
 * Pad number string with zeros to fixed precision
 * @param {string} numString
 * @param {number} precision
 * @return {string}
 */
export default function padZerosToFixed(numString, precision) {
    if (!(precision > 0)) {
        return numString;
    }

    if (typeof numString !== 'string') {
        numString = numString.toString();
    }

    // leave exponential untouched
    // @TODO throw on exponential, suggest to use `from-exponential`
    if (numString.toLowerCase().indexOf('e') !== -1) {
        return numString;
    }

    const exponentialPosition = numString.toLowerCase().indexOf('e');
    const notExponential = exponentialPosition === -1;

    const decimalStart = numString.indexOf('.');
    const hasDot = decimalStart !== -1;
    const decimalEnd = notExponential ? numString.length : exponentialPosition;

    const countDecimals = hasDot ? decimalEnd - decimalStart - 1 : 0;
    const countZerosToPad = precision - countDecimals;
    let zeros = hasDot ? '' : '.';
    for (let i = 0; i < countZerosToPad; i += 1) {
        zeros += '0';
    }

    // insert zeros between number and exponential part
    return numString.substring(0, decimalEnd) + zeros + numString.substring(decimalEnd);
}
