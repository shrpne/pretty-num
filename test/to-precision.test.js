import toPrecision, {ROUNDING_MODE, PRECISION_SETTING} from '../src/to-precision';

describe('toPrecision()', () => {
    test('leave correct numbers untouched', () => {
        expect(toPrecision(1234, 3)).toEqual('1234');
        expect(toPrecision(12.001, 3)).toEqual('12.001');
        expect(toPrecision(12.123, 3)).toEqual('12.123');
        expect(toPrecision(0, 3)).toEqual('0');
        expect(toPrecision(0.001, 3)).toEqual('0.001');
    });

    test('leave correct numbers untouched: significant precisionSetting', () => {
        expect(toPrecision(1234, 3, {precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT})).toEqual('1234');
        expect(toPrecision(12.0001, 3, {precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT})).toEqual('12.0001');
        expect(toPrecision(12.000123, 3, {precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT})).toEqual('12.000123');
        expect(toPrecision(0, 3, {precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT})).toEqual('0');
        expect(toPrecision(0.0001, 3, {precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT})).toEqual('0.0001');
    });

    test('leave correct numbers untouched: fixed precisionSetting', () => {
        expect(toPrecision(1234.000, 3, {precisionSetting: PRECISION_SETTING.FIXED})).toEqual('1234.000');
        expect(toPrecision(12.001, 3, {precisionSetting: PRECISION_SETTING.FIXED})).toEqual('12.001');
        expect(toPrecision(12.123, 3, {precisionSetting: PRECISION_SETTING.FIXED})).toEqual('12.123');
        expect(toPrecision(0.000, 3, {precisionSetting: PRECISION_SETTING.FIXED})).toEqual('0.000');
        expect(toPrecision(0.001, 3, {precisionSetting: PRECISION_SETTING.FIXED})).toEqual('0.001');
        expect(toPrecision(12.010, 3, {precisionSetting: PRECISION_SETTING.FIXED})).toEqual('12.010');
        expect(toPrecision(0.000, 3, {precisionSetting: PRECISION_SETTING.FIXED})).toEqual('0.000');
    });

    test('leave correct numbers untouched: increase precisionSetting', () => {
        expect(toPrecision(1234.000, 3, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('1234.000');
        expect(toPrecision(12.001, 3, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('12.001');
        expect(toPrecision(12.123, 3, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('12.123');
        expect(toPrecision(0.000, 3, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('0.000');
        expect(toPrecision(0.001, 3, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('0.001');
        expect(toPrecision(12.010, 3, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('12.010');
        expect(toPrecision(0.000, 3, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('0.000');
    });

    test('to precision', () => {
        expect(toPrecision(12.123456, 3)).toEqual('12.123');
        expect(toPrecision(12.000123456, 3)).toEqual('12');
        expect(toPrecision(12.120456, 3)).toEqual('12.12');
        expect(toPrecision(0.123456, 3)).toEqual('0.123');
        expect(toPrecision(0.120123456, 3)).toEqual('0.12');

        expect(toPrecision(12.123456, 3, {precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT})).toEqual('12.123');
        expect(toPrecision(12.000123456, 3, {precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT})).toEqual('12.000123');
        expect(toPrecision(12.000120456, 3, {precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT})).toEqual('12.00012');
        expect(toPrecision(0.123456, 3, {precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT})).toEqual('0.123');
        expect(toPrecision(0.000123456, 3, {precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT})).toEqual('0.000123');

        expect(toPrecision(12.123456, 3, {precisionSetting: PRECISION_SETTING.FIXED})).toEqual('12.123');
        expect(toPrecision(12.000123456, 3, {precisionSetting: PRECISION_SETTING.FIXED})).toEqual('12.000');
        expect(toPrecision(0.123456, 3, {precisionSetting: PRECISION_SETTING.FIXED})).toEqual('0.123');
        expect(toPrecision(0.000123456, 3, {precisionSetting: PRECISION_SETTING.FIXED})).toEqual('0.000');

        expect(toPrecision(12.12, 4, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('12.1200');
        expect(toPrecision(12.001, 4, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('12.0010');
        expect(toPrecision(0.12, 4, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('0.1200');
        expect(toPrecision(0.001, 4, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('0.0010');
    });

    test('exponential: should leave value untouched', () => {
        expect(toPrecision(1.123456e-80, 3)).toEqual('1.123456e-80');
        expect(toPrecision(0.123456e-80, 3)).toEqual('1.23456e-81');
        expect(toPrecision(1.123456e+80, 3)).toEqual('1.123456e+80');
        expect(toPrecision(0.123456e+80, 3)).toEqual('1.23456e+79');

        expect(toPrecision(1.123456e-80, 3, {precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT})).toEqual('1.123456e-80');
        expect(toPrecision(0.123456e-80, 3, {precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT})).toEqual('1.23456e-81');
        expect(toPrecision(1.123456e+80, 3, {precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT})).toEqual('1.123456e+80');
        expect(toPrecision(0.123456e+80, 3, {precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT})).toEqual('1.23456e+79');

        expect(toPrecision(1.123456e-80, 3, {precisionSetting: PRECISION_SETTING.FIXED})).toEqual('1.123456e-80');
        expect(toPrecision(0.123456e-80, 3, {precisionSetting: PRECISION_SETTING.FIXED})).toEqual('1.23456e-81');
        expect(toPrecision(1.123456e+80, 3, {precisionSetting: PRECISION_SETTING.FIXED})).toEqual('1.123456e+80');
        expect(toPrecision(0.123456e+80, 3, {precisionSetting: PRECISION_SETTING.FIXED})).toEqual('1.23456e+79');

        expect(toPrecision(1.123456e-80, 4, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('1.123456e-80');
        expect(toPrecision(0.123456e-80, 4, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('1.23456e-81');
        expect(toPrecision(1.123456e+80, 4, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('1.123456e+80');
        expect(toPrecision(0.123456e+80, 4, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('1.23456e+79');

        expect(toPrecision(1.123456e-80, 84, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('1.123456e-80');
        expect(toPrecision(0.123456e-80, 84, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('1.23456e-81');
        expect(toPrecision(1.123456e+80, 84, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('1.123456e+80');
        expect(toPrecision(0.123456e+80, 84, {precisionSetting: PRECISION_SETTING.INCREASE})).toEqual('1.23456e+79');
    });

    test('precision argument', () => {
        expect(toPrecision(12.123456, 0)).toEqual('12');
        expect(toPrecision(12.00123456, 0, {precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT})).toEqual('12');
        expect(toPrecision(12.123456, false)).toEqual('12.123456');
        expect(toPrecision(12.123456)).toEqual('12.123456');
        expect(toPrecision(12.123456, 100)).toEqual('12.123456');
    });
});

/** from js-big-decimal @see https://github.com/royNiladri/js-big-decimal/blob/master/src/round.spec.ts */
describe('round', () => {
    it('should return integer unchanged', () => {
        expect(toPrecision(123456)).toBe('123456');
    });

    it('should return integer without padded zeros if second argument is non-zero and first is integer', () => {
        expect(toPrecision(123456, 2)).toBe('123456');
    });
    it('should return float without padded zeros if second argument is non-zero and first is floating', () => {
        expect(toPrecision(12345.6, 2)).toBe('12345.6');
        expect(toPrecision('044909.987', 5)).toBe('44909.987');
    });
    it('should return float rounded appropriately if second argument is non-zero and first is floating', () => {
        expect(toPrecision('96227983951.7293581', 5)).toBe('96227983951.72936');
    });
    // it("should round(87.45, -1) = 90", function () {
    //     expect(toPrecision('87.45', -1)).toBe('90');
    // })
    // it("should round(84.45, -1) = 80", function () {
    //     expect(toPrecision('84.45', -1)).toBe('80');
    // })
    // it("should round(87.45, -2) = 0", function () {
    //     expect(toPrecision('87.45', -2)).toBe('0');
    // })
    // it("should round(87.45, -3) = 0", function () {
    //     expect(toPrecision('87.45', -3)).toBe('0');
    // })
    // it("should round(87, -1) = 90", function () {
    //     expect(toPrecision('87', -1)).toBe('90');
    // })
    // it("should round(82, -1) = 80", function () {
    //     expect(toPrecision('82', -1)).toBe('80');
    // })

    describe('test rounding mode UP', () => {
        it('should round(5.5, 0, UP) = 6', () => {
            expect(toPrecision('5.5', 0, {roundingMode: ROUNDING_MODE.UP})).toBe('6');
        });
        it('should round(2.6, 0, UP) = 3', () => {
            expect(toPrecision('2.6', 0, {roundingMode: ROUNDING_MODE.UP})).toBe('3');
        });
        it('should round(1.1, 0, UP) = 2', () => {
            expect(toPrecision('1.1', 0, {roundingMode: ROUNDING_MODE.UP})).toBe('2');
        });
        it('should round(1.0, 0, UP) = 1', () => {
            expect(toPrecision('1.0', 0, {roundingMode: ROUNDING_MODE.UP})).toBe('1');
        });
        it('should round(1, 0, UP) = 1', () => {
            expect(toPrecision('1', 0, {roundingMode: ROUNDING_MODE.UP})).toBe('1');
        });
        it('should round(-1.0, 0, UP) = -1', () => {
            expect(toPrecision('-1.0', 0, {roundingMode: ROUNDING_MODE.UP})).toBe('-1');
        });
        it('should round(-1.1, 0, UP) = -2', () => {
            expect(toPrecision('-1.1', 0, {roundingMode: ROUNDING_MODE.UP})).toBe('-2');
        });
        it('should round(-1.6, 0, UP) = -2', () => {
            expect(toPrecision('-1.6', 0, {roundingMode: ROUNDING_MODE.UP})).toBe('-2');
        });
        it('should round(-2.5, 0, UP) = -3', () => {
            expect(toPrecision('-2.5', 0, {roundingMode: ROUNDING_MODE.UP})).toBe('-3');
        });
    });

    describe('test rounding mode DOWN', () => {
        it('should round(5.5, 0, DOWN) = 5', () => {
            expect(toPrecision('5.5', 0, {roundingMode: ROUNDING_MODE.DOWN})).toBe('5');
        });
        it('should round(2.6, 0, DOWN) = 2', () => {
            expect(toPrecision('2.6', 0, {roundingMode: ROUNDING_MODE.DOWN})).toBe('2');
        });
        it('should round(1.1, 0, DOWN) = 1', () => {
            expect(toPrecision('1.1', 0, {roundingMode: ROUNDING_MODE.DOWN})).toBe('1');
        });
        it('should round(1.0, 0, DOWN) = 1', () => {
            expect(toPrecision('1.0', 0, {roundingMode: ROUNDING_MODE.DOWN})).toBe('1');
        });
        it('should round(1, 0, DOWN) = 1', () => {
            expect(toPrecision('1', 0, {roundingMode: ROUNDING_MODE.DOWN})).toBe('1');
        });
        it('should round(-1.0, 0, DOWN) = -1', () => {
            expect(toPrecision('-1.0', 0, {roundingMode: ROUNDING_MODE.DOWN})).toBe('-1');
        });
        it('should round(-1.1, 0, DOWN) = -1', () => {
            expect(toPrecision('-1.1', 0, {roundingMode: ROUNDING_MODE.DOWN})).toBe('-1');
        });
        it('should round(-1.6, 0, DOWN) = -1', () => {
            expect(toPrecision('-1.6', 0, {roundingMode: ROUNDING_MODE.DOWN})).toBe('-1');
        });
        it('should round(-2.5, 0, DOWN) = -2', () => {
            expect(toPrecision('-2.5', 0, {roundingMode: ROUNDING_MODE.DOWN})).toBe('-2');
        });
    });

    describe('test rounding mode CEILING', () => {
        it('should round(5.5, 0, CEILING) = 6', () => {
            expect(toPrecision('5.5', 0, {roundingMode: ROUNDING_MODE.CEIL})).toBe('6');
        });
        it('should round(2.6, 0, CEILING) = 3', () => {
            expect(toPrecision('2.6', 0, {roundingMode: ROUNDING_MODE.CEIL})).toBe('3');
        });
        it('should round(1.1, 0, CEILING) = 2', () => {
            expect(toPrecision('1.1', 0, {roundingMode: ROUNDING_MODE.CEIL})).toBe('2');
        });
        it('should round(1.01, 0, CEILING) = 2', () => {
            expect(toPrecision('1.01', 0, {roundingMode: ROUNDING_MODE.CEIL})).toBe('2');
        });
        it('should round(0.000000000000000001, 2, CEILING) = 0.01', () => {
            expect(toPrecision('0.000000000000000001', 2, {roundingMode: ROUNDING_MODE.CEIL})).toBe('0.01');
        });
        // it('should round(1e-18, 2, CEILING) = 0.01', () => {
        //     expect(toPrecision(1e-18, 2, {roundingMode: ROUNDING_MODE.CEIL})).toBe('0.01');
        // });
        it('should round(1.0, 0, CEILING) = 1', () => {
            expect(toPrecision('1.0', 0, {roundingMode: ROUNDING_MODE.CEIL})).toBe('1');
        });
        it('should round(1, 0, CEILING) = 1', () => {
            expect(toPrecision('1', 0, {roundingMode: ROUNDING_MODE.CEIL})).toBe('1');
        });
        it('should round(-1.0, 0, CEILING) = -1', () => {
            expect(toPrecision('-1.0', 0, {roundingMode: ROUNDING_MODE.CEIL})).toBe('-1');
        });
        it('should round(-1.1, 0, CEILING) = -1', () => {
            expect(toPrecision('-1.1', 0, {roundingMode: ROUNDING_MODE.CEIL})).toBe('-1');
        });
        it('should round(-1.6, 0, CEILING) = -1', () => {
            expect(toPrecision('-1.6', 0, {roundingMode: ROUNDING_MODE.CEIL})).toBe('-1');
        });
        it('should round(-2.5, 0, CEILING) = -2', () => {
            expect(toPrecision('-2.5', 0, {roundingMode: ROUNDING_MODE.CEIL})).toBe('-2');
        });
    });

    describe('test rounding mode FLOOR', () => {
        it('should round(5.5, 0, FLOOR) = 5', () => {
            expect(toPrecision('5.5', 0, {roundingMode: ROUNDING_MODE.FLOOR})).toBe('5');
        });
        it('should round(2.6, 0, FLOOR) = 2', () => {
            expect(toPrecision('2.6', 0, {roundingMode: ROUNDING_MODE.FLOOR})).toBe('2');
        });
        it('should round(1.1, 0, FLOOR) = 1', () => {
            expect(toPrecision('1.1', 0, {roundingMode: ROUNDING_MODE.FLOOR})).toBe('1');
        });
        it('should round(1.0, 0, FLOOR) = 1', () => {
            expect(toPrecision('1.0', 0, {roundingMode: ROUNDING_MODE.FLOOR})).toBe('1');
        });
        it('should round(1, 0, FLOOR) = 1', () => {
            expect(toPrecision('1', 0, {roundingMode: ROUNDING_MODE.FLOOR})).toBe('1');
        });
        it('should round(-1.0, 0, FLOOR) = -1', () => {
            expect(toPrecision('-1.0', 0, {roundingMode: ROUNDING_MODE.FLOOR})).toBe('-1');
        });
        it('should round(-1.1, 0, FLOOR) = -2', () => {
            expect(toPrecision('-1.1', 0, {roundingMode: ROUNDING_MODE.FLOOR})).toBe('-2');
        });
        it('should round(-1.6, 0, FLOOR) = -2', () => {
            expect(toPrecision('-1.6', 0, {roundingMode: ROUNDING_MODE.FLOOR})).toBe('-2');
        });
        it('should round(-2.5, 0, FLOOR) = -3', () => {
            expect(toPrecision('-2.5', 0, {roundingMode: ROUNDING_MODE.FLOOR})).toBe('-3');
        });
    });

    describe('test rounding mode HALF_UP', () => {
        it('should round(5.5, 0, HALF_UP) = 6', () => {
            expect(toPrecision('5.5', 0, {roundingMode: ROUNDING_MODE.HALF_UP})).toBe('6');
        });
        it('should round(6.5, 0, HALF_UP) = 7', () => {
            expect(toPrecision('6.5', 0, {roundingMode: ROUNDING_MODE.HALF_UP})).toBe('7');
        });
        it('should round(2.6, 0, HALF_UP) = 3', () => {
            expect(toPrecision('2.6', 0, {roundingMode: ROUNDING_MODE.HALF_UP})).toBe('3');
        });
        it('should round(1.1, 0, HALF_UP) = 1', () => {
            expect(toPrecision('1.1', 0, {roundingMode: ROUNDING_MODE.HALF_UP})).toBe('1');
        });
        it('should round(1.0, 0, HALF_UP) = 1', () => {
            expect(toPrecision('1.0', 0, {roundingMode: ROUNDING_MODE.HALF_UP})).toBe('1');
        });
        it('should round(1, 0, HALF_UP) = 1', () => {
            expect(toPrecision('1', 0, {roundingMode: ROUNDING_MODE.HALF_UP})).toBe('1');
        });
        it('should round(-1.0, 0, HALF_UP) = -1', () => {
            expect(toPrecision('-1.0', 0, {roundingMode: ROUNDING_MODE.HALF_UP})).toBe('-1');
        });
        it('should round(-1.1, 0, HALF_UP) = -1', () => {
            expect(toPrecision('-1.1', 0, {roundingMode: ROUNDING_MODE.HALF_UP})).toBe('-1');
        });
        it('should round(-1.6, 0, HALF_UP) = -2', () => {
            expect(toPrecision('-1.6', 0, {roundingMode: ROUNDING_MODE.HALF_UP})).toBe('-2');
        });
        it('should round(-2.5, 0, HALF_UP) = -3', () => {
            expect(toPrecision('-2.5', 0, {roundingMode: ROUNDING_MODE.HALF_UP})).toBe('-3');
        });
        it('should round(-3.5, 0, HALF_UP) = -4', () => {
            expect(toPrecision('-3.5', 0, {roundingMode: ROUNDING_MODE.HALF_UP})).toBe('-4');
        });
    });

    describe('test rounding mode HALF_DOWN', () => {
        it('should round(5.5, 0, HALF_DOWN) = 5', () => {
            expect(toPrecision('5.5', 0, {roundingMode: ROUNDING_MODE.HALF_DOWN})).toBe('5');
        });
        it('should round(6.5, 0, HALF_DOWN) = 6', () => {
            expect(toPrecision('6.5', 0, {roundingMode: ROUNDING_MODE.HALF_DOWN})).toBe('6');
        });
        it('should round(2.6, 0, HALF_DOWN) = 3', () => {
            expect(toPrecision('2.6', 0, {roundingMode: ROUNDING_MODE.HALF_DOWN})).toBe('3');
        });
        it('should round(1.1, 0, HALF_DOWN) = 1', () => {
            expect(toPrecision('1.1', 0, {roundingMode: ROUNDING_MODE.HALF_DOWN})).toBe('1');
        });
        it('should round(1.0, 0, HALF_DOWN) = 1', () => {
            expect(toPrecision('1.0', 0, {roundingMode: ROUNDING_MODE.HALF_DOWN})).toBe('1');
        });
        it('should round(1, 0, HALF_DOWN) = 1', () => {
            expect(toPrecision('1', 0, {roundingMode: ROUNDING_MODE.HALF_DOWN})).toBe('1');
        });
        it('should round(-1.0, 0, HALF_DOWN) = -1', () => {
            expect(toPrecision('-1.0', 0, {roundingMode: ROUNDING_MODE.HALF_DOWN})).toBe('-1');
        });
        it('should round(-1.1, 0, HALF_DOWN) = -1', () => {
            expect(toPrecision('-1.1', 0, {roundingMode: ROUNDING_MODE.HALF_DOWN})).toBe('-1');
        });
        it('should round(-1.6, 0, HALF_DOWN) = -2', () => {
            expect(toPrecision('-1.6', 0, {roundingMode: ROUNDING_MODE.HALF_DOWN})).toBe('-2');
        });
        it('should round(-2.5, 0, HALF_DOWN) = -2', () => {
            expect(toPrecision('-2.5', 0, {roundingMode: ROUNDING_MODE.HALF_DOWN})).toBe('-2');
        });
        it('should round(-3.5, 0, HALF_DOWN) = -3', () => {
            expect(toPrecision('-3.5', 0, {roundingMode: ROUNDING_MODE.HALF_DOWN})).toBe('-3');
        });
    });

    describe('test rounding mode HALF_EVEN', () => {
        it('should round(5.5, 0) = 6', () => {
            expect(toPrecision('5.5', 0, {roundingMode: ROUNDING_MODE.HALF_EVEN})).toBe('6');
        });
        it('should round(6.5, 0) = 6', () => {
            expect(toPrecision('6.5', 0, {roundingMode: ROUNDING_MODE.HALF_EVEN})).toBe('6');
        });
        it('should round(2.6, 0) = 3', () => {
            expect(toPrecision('2.6', 0, {roundingMode: ROUNDING_MODE.HALF_EVEN})).toBe('3');
        });
        it('should round(1.1, 0) = 1', () => {
            expect(toPrecision('1.1', 0, {roundingMode: ROUNDING_MODE.HALF_EVEN})).toBe('1');
        });
        it('should round(1.0, 0) = 1', () => {
            expect(toPrecision('1.0', 0, {roundingMode: ROUNDING_MODE.HALF_EVEN})).toBe('1');
        });
        it('should round(1, 0) = 1', () => {
            expect(toPrecision('1', 0, {roundingMode: ROUNDING_MODE.HALF_EVEN})).toBe('1');
        });
        it('should round(-1.0, 0) = -1', () => {
            expect(toPrecision('-1.0', 0, {roundingMode: ROUNDING_MODE.HALF_EVEN})).toBe('-1');
        });
        it('should round(-1.1, 0) = -1', () => {
            expect(toPrecision('-1.1', 0, {roundingMode: ROUNDING_MODE.HALF_EVEN})).toBe('-1');
        });
        it('should round(-1.6, 0) = -2', () => {
            expect(toPrecision('-1.6', 0, {roundingMode: ROUNDING_MODE.HALF_EVEN})).toBe('-2');
        });
        it('should round(-2.5, 0) = -2', () => {
            expect(toPrecision('-2.5', 0, {roundingMode: ROUNDING_MODE.HALF_EVEN})).toBe('-2');
        });
        it('should round(-3.5, 0) = -4', () => {
            expect(toPrecision('-3.5', 0, {roundingMode: ROUNDING_MODE.HALF_EVEN})).toBe('-4');
        });
    });
});
