import stripZeros from '../src/strip-zeros';

describe('stripZeros', () => {
    test('leave numbers untouched', () => {
        expect(stripZeros(12)).toEqual(12);
        expect(stripZeros(12.0001)).toEqual(12.0001);
        expect(stripZeros(12.00010000)).toEqual(12.0001);
        expect(stripZeros(0)).toEqual(0);
        expect(stripZeros(0.0001)).toEqual(0.0001);
        expect(stripZeros(1.123e-20)).toEqual(1.123e-20);
    });

    test('leave correct strings untouched', () => {
        expect(stripZeros('12.0001')).toEqual('12.0001');
        expect(stripZeros('12')).toEqual('12');
        expect(stripZeros('0.0001')).toEqual('0.0001');
        expect(stripZeros('0')).toEqual('0');
        expect(stripZeros('1.123e-20')).toEqual('1.123e-20');
    });

    test('strip zeros after dot', () => {
        expect(stripZeros('12.00010000')).toEqual('12.0001');
        expect(stripZeros('12.00000000')).toEqual('12');
        expect(stripZeros('0.00010000')).toEqual('0.0001');
        expect(stripZeros('0.00000000')).toEqual('0');
    });

    test('strip zeros before dot', () => {
        expect(stripZeros('00.00000000')).toEqual('0');
        expect(stripZeros('0012')).toEqual('12');
    });

    test('strip zeros in exponential notation', () => {
        expect(stripZeros('001.12300000000e-20')).toEqual('1.123e-20');
    });

    test('strip both', () => {
        expect(stripZeros('0012.00010000')).toEqual('12.0001');
    });
});
