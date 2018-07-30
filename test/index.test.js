import prettyNum from '../src/index';

describe('prettyNum', () => {
    test('exponential', () => {
        expect(prettyNum(1.123e-10, 3)).toEqual('0.000000000112');
        expect(prettyNum(12.123e-10, 3)).toEqual('0.00000000121');
        expect(prettyNum(123.123e-10, 3)).toEqual('0.0000000123');
        expect(prettyNum(123.123e+4, 3)).toEqual('1231230');
    });

    test('exponential', () => {
        expect(prettyNum(0.00123456, 3)).toEqual('0.00123');
    });
});
