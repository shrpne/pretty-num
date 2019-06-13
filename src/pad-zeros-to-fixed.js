/**
 * Pad number string with zeros to fixed precision
 * Don't work with exponential notation, use `from-exponential` if necessary
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
    if (numString.toLowerCase().indexOf('e') !== -1) {
        return numString;
    }

    const decimalStart = numString.indexOf('.');
    const hasDot = decimalStart !== -1;
    const decimalEnd = numString.length;

    const countDecimals = hasDot ? decimalEnd - decimalStart - 1 : 0;
    const countZerosToPad = precision - countDecimals;
    let zeros = hasDot ? '' : '.';
    for (let i = 0; i < countZerosToPad; i += 1) {
        zeros += '0';
    }

    // insert zeros between number and exponential part
    return numString.substring(0, decimalEnd) + zeros + numString.substring(decimalEnd);
}
