/**
 * Round `value` to `fractionDigitNumber` digits after dot
 * @param {number} value
 * @param {number} fractionDigitNumber - number of fraction digits after dot
 * @return {number}
 */
export default function round(value, fractionDigitNumber) {
    if (fractionDigitNumber < 0) {
        throw new Error('Number of fraction digits should be positive');
    }
    const tenPower = 10 ** fractionDigitNumber;
    return Math.round(value * tenPower) / tenPower;
}
