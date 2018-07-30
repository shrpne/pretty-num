/**
 * @param {string|number} num
 * @param {number} precision
 * @return {string}
 */
export default function reducePrecision(num, precision) {
    const numString = num.toString();

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
        const MeaningfulFractionIndex = notMeaningfulFraction.index + notMeaningfulFraction[0].length;
        return numString.substr(0, MeaningfulFractionIndex + precision);
    }

    return numString;
}
