import toPrecision, {PRECISION_REDUCE_SIGNIFICANT, PRECISION_FIXED, PRECISION_INCREASE} from '../src/to-precision';

describe('toPrecision()', () => {
    test('leave correct numbers untouched', () => {
        expect(toPrecision(1234, 3)).toEqual('1234');
        expect(toPrecision(12.001, 3)).toEqual('12.001');
        expect(toPrecision(12.123, 3)).toEqual('12.123');
        expect(toPrecision(0, 3)).toEqual('0');
        expect(toPrecision(0.001, 3)).toEqual('0.001');
    });

    test('leave correct numbers untouched: significant rounding', () => {
        expect(toPrecision(1234, 3, {rounding: PRECISION_REDUCE_SIGNIFICANT})).toEqual('1234');
        expect(toPrecision(12.0001, 3, {rounding: PRECISION_REDUCE_SIGNIFICANT})).toEqual('12.0001');
        expect(toPrecision(12.000123, 3, {rounding: PRECISION_REDUCE_SIGNIFICANT})).toEqual('12.000123');
        expect(toPrecision(0, 3, {rounding: PRECISION_REDUCE_SIGNIFICANT})).toEqual('0');
        expect(toPrecision(0.0001, 3, {rounding: PRECISION_REDUCE_SIGNIFICANT})).toEqual('0.0001');
    });

    test('leave correct numbers untouched: fixed rounding', () => {
        expect(toPrecision(1234.000, 3, {rounding: PRECISION_FIXED})).toEqual('1234.000');
        expect(toPrecision(12.001, 3, {rounding: PRECISION_FIXED})).toEqual('12.001');
        expect(toPrecision(12.123, 3, {rounding: PRECISION_FIXED})).toEqual('12.123');
        expect(toPrecision(0.000, 3, {rounding: PRECISION_FIXED})).toEqual('0.000');
        expect(toPrecision(0.001, 3, {rounding: PRECISION_FIXED})).toEqual('0.001');
        expect(toPrecision(12.010, 3, {rounding: PRECISION_FIXED})).toEqual('12.010');
        expect(toPrecision(0.000, 3, {rounding: PRECISION_FIXED})).toEqual('0.000');
    });

    test('leave correct numbers untouched: increase rounding', () => {
        expect(toPrecision(1234.000, 3, {rounding: PRECISION_INCREASE})).toEqual('1234.000');
        expect(toPrecision(12.001, 3, {rounding: PRECISION_INCREASE})).toEqual('12.001');
        expect(toPrecision(12.123, 3, {rounding: PRECISION_INCREASE})).toEqual('12.123');
        expect(toPrecision(0.000, 3, {rounding: PRECISION_INCREASE})).toEqual('0.000');
        expect(toPrecision(0.001, 3, {rounding: PRECISION_INCREASE})).toEqual('0.001');
        expect(toPrecision(12.010, 3, {rounding: PRECISION_INCREASE})).toEqual('12.010');
        expect(toPrecision(0.000, 3, {rounding: PRECISION_INCREASE})).toEqual('0.000');
    });

    test('to precision', () => {
        expect(toPrecision(12.123456, 3)).toEqual('12.123');
        expect(toPrecision(12.000123456, 3)).toEqual('12');
        expect(toPrecision(12.120456, 3)).toEqual('12.12');
        expect(toPrecision(0.123456, 3)).toEqual('0.123');
        expect(toPrecision(0.120123456, 3)).toEqual('0.12');

        expect(toPrecision(12.123456, 3, {rounding: PRECISION_REDUCE_SIGNIFICANT})).toEqual('12.123');
        expect(toPrecision(12.000123456, 3, {rounding: PRECISION_REDUCE_SIGNIFICANT})).toEqual('12.000123');
        expect(toPrecision(12.000120456, 3, {rounding: PRECISION_REDUCE_SIGNIFICANT})).toEqual('12.00012');
        expect(toPrecision(0.123456, 3, {rounding: PRECISION_REDUCE_SIGNIFICANT})).toEqual('0.123');
        expect(toPrecision(0.000123456, 3, {rounding: PRECISION_REDUCE_SIGNIFICANT})).toEqual('0.000123');

        expect(toPrecision(12.123456, 3, {rounding: PRECISION_FIXED})).toEqual('12.123');
        expect(toPrecision(12.000123456, 3, {rounding: PRECISION_FIXED})).toEqual('12.000');
        expect(toPrecision(0.123456, 3, {rounding: PRECISION_FIXED})).toEqual('0.123');
        expect(toPrecision(0.000123456, 3, {rounding: PRECISION_FIXED})).toEqual('0.000');

        expect(toPrecision(12.12, 4, {rounding: PRECISION_INCREASE})).toEqual('12.1200');
        expect(toPrecision(12.001, 4, {rounding: PRECISION_INCREASE})).toEqual('12.0010');
        expect(toPrecision(0.12, 4, {rounding: PRECISION_INCREASE})).toEqual('0.1200');
        expect(toPrecision(0.001, 4, {rounding: PRECISION_INCREASE})).toEqual('0.0010');
    });

    test('exponential: should leave value untouched', () => {
        expect(toPrecision(1.123456e-80, 3)).toEqual('1.123456e-80');
        expect(toPrecision(0.123456e-80, 3)).toEqual('1.23456e-81');
        expect(toPrecision(1.123456e+80, 3)).toEqual('1.123456e+80');
        expect(toPrecision(0.123456e+80, 3)).toEqual('1.23456e+79');

        expect(toPrecision(1.123456e-80, 3, {rounding: PRECISION_REDUCE_SIGNIFICANT})).toEqual('1.123456e-80');
        expect(toPrecision(0.123456e-80, 3, {rounding: PRECISION_REDUCE_SIGNIFICANT})).toEqual('1.23456e-81');
        expect(toPrecision(1.123456e+80, 3, {rounding: PRECISION_REDUCE_SIGNIFICANT})).toEqual('1.123456e+80');
        expect(toPrecision(0.123456e+80, 3, {rounding: PRECISION_REDUCE_SIGNIFICANT})).toEqual('1.23456e+79');

        expect(toPrecision(1.123456e-80, 3, {rounding: PRECISION_FIXED})).toEqual('1.123456e-80');
        expect(toPrecision(0.123456e-80, 3, {rounding: PRECISION_FIXED})).toEqual('1.23456e-81');
        expect(toPrecision(1.123456e+80, 3, {rounding: PRECISION_FIXED})).toEqual('1.123456e+80');
        expect(toPrecision(0.123456e+80, 3, {rounding: PRECISION_FIXED})).toEqual('1.23456e+79');

        expect(toPrecision(1.123456e-80, 4, {rounding: PRECISION_INCREASE})).toEqual('1.123456e-80');
        expect(toPrecision(0.123456e-80, 4, {rounding: PRECISION_INCREASE})).toEqual('1.23456e-81');
        expect(toPrecision(1.123456e+80, 4, {rounding: PRECISION_INCREASE})).toEqual('1.123456e+80');
        expect(toPrecision(0.123456e+80, 4, {rounding: PRECISION_INCREASE})).toEqual('1.23456e+79');

        expect(toPrecision(1.123456e-80, 84, {rounding: PRECISION_INCREASE})).toEqual('1.123456e-80');
        expect(toPrecision(0.123456e-80, 84, {rounding: PRECISION_INCREASE})).toEqual('1.23456e-81');
        expect(toPrecision(1.123456e+80, 84, {rounding: PRECISION_INCREASE})).toEqual('1.123456e+80');
        expect(toPrecision(0.123456e+80, 84, {rounding: PRECISION_INCREASE})).toEqual('1.23456e+79');
    });

    test('precision argument', () => {
        expect(toPrecision(12.123456, 0)).toEqual('12');
        expect(toPrecision(12.00123456, 0, {rounding: PRECISION_REDUCE_SIGNIFICANT})).toEqual('12');
        expect(toPrecision(12.123456, false)).toEqual('12.123456');
        expect(toPrecision(12.123456)).toEqual('12.123456');
        expect(toPrecision(12.123456, 100)).toEqual('12.123456');
    });
});
