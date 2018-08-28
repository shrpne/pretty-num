import padZerosToFixed from '../src/pad-zeros-to-fixed';

describe('padZerosToFixed()', () => {
    test('leave correct strings untouched', () => {
        expect(padZerosToFixed('12.000', 3)).toEqual('12.000');
        expect(padZerosToFixed('0.000', 3)).toEqual('0.000');
        expect(padZerosToFixed('12', 0)).toEqual('12');
        expect(padZerosToFixed('0', 0)).toEqual('0');
    });

    test('pad zeros', () => {
        expect(padZerosToFixed('12', 3)).toEqual('12.000');
        expect(padZerosToFixed('12.01', 3)).toEqual('12.010');
        expect(padZerosToFixed('0', 3)).toEqual('0.000');
        expect(padZerosToFixed('0.01', 3)).toEqual('0.010');
        expect(padZerosToFixed('0.', 3)).toEqual('0.000');
    });
});
