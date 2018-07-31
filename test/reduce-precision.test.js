import reducePrecision from '../src/reduce-precision';

describe('reducePrecision', () => {
    test('leave correct numbers untouched', () => {
        expect(reducePrecision(1234, 3)).toEqual('1234');
        expect(reducePrecision(12.0001, 3)).toEqual('12.0001');
        expect(reducePrecision(12.000123, 3)).toEqual('12.000123');
        expect(reducePrecision(0, 3)).toEqual('0');
        expect(reducePrecision(0.0001, 3)).toEqual('0.0001');
    });

    test('reduce precision', () => {
        expect(reducePrecision(12.123456, 3)).toEqual('12.123');
        expect(reducePrecision(12.000123456, 3)).toEqual('12.000123');
        expect(reducePrecision(0.123456, 3)).toEqual('0.123');
        expect(reducePrecision(0.000123456, 3)).toEqual('0.000123');
    });

    test('exponential', () => {
        expect(reducePrecision(1.123456e-80, 3)).toEqual('1.12e-80');
        expect(reducePrecision(0.123456e-80, 3)).toEqual('1.23e-81');
        expect(reducePrecision(1.123456e+80, 3)).toEqual('1.123456e+80');
        expect(reducePrecision(0.123456e+80, 3)).toEqual('1.23456e+79');
    });

    test('precision', () => {
        expect(reducePrecision(12.123456, 0)).toEqual('12');
        expect(reducePrecision(12.123456, false)).toEqual('12.123456');
        expect(reducePrecision(12.123456)).toEqual('12.123456');
        expect(reducePrecision(12.123456, 100)).toEqual('12.123456');
    });
});
