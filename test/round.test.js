import round from '../src/round';

describe('round', () => {
    test('3 fraction digits', () => {
        expect(round(12, 3)).toEqual(12);
        expect(round(12.123456, 3)).toEqual(12.123);
        expect(round(12.123e-10, 3)).toEqual(0);
    });
    test('0 fraction digits', () => {
        expect(round(12.123456, 0)).toEqual(12);
    });
    test('negative fraction digits', () => {
        expect(() => round(12.123456, -1)).toThrow();
        expect(() => round(12.123456, -5)).toThrow();
    });
});
