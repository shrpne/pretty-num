/**
 * @param {string|number} num
 * @param {number} [precision]
 * @return {string}
 */
export default function reducePrecision(num, precision) {
    const numString = num.toString();

    // do not proceed false precision
    if (!precision && precision !== 0) {
        return numString;
    }

    // decimal exponential number
    if ((/e-/i).test(numString)) {
        return num.toPrecision(precision);
    }
    // integer exponential number
    if ((/e/i).test(numString)) {
        return numString;
    }


    const notMeaningfulFraction = numString.match(/\.0*/);
    if (notMeaningfulFraction) {
        precision = Number(precision);
        if (precision === 0) {
            return numString.substr(0, notMeaningfulFraction.index);
        } else {
            const MeaningfulFractionIndex = notMeaningfulFraction.index + notMeaningfulFraction[0].length;
            return numString.substr(0, MeaningfulFractionIndex + precision);
        }
    }

    return numString;
}
