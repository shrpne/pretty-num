import prettyNum from '../src';
import {ROUNDING_SIGNIFICANT, ROUNDING_FIXED} from '../src/reduce-precision';

describe('prettyNum()', () => {
    test('exponential', () => {
        expect(prettyNum(1.123e-10, {precision: 3})).toEqual('0');
        expect(prettyNum(12.123e-10, {precision: 3})).toEqual('0');
        expect(prettyNum(123.123e-10, {precision: 3})).toEqual('0');
        expect(prettyNum('123.123e+4', {precision: 3})).toEqual('1231230');

        expect(prettyNum(1.123e-10, {precision: 3, rounding: ROUNDING_SIGNIFICANT})).toEqual('0.000000000112');
        expect(prettyNum(12.123e-10, {precision: 3, rounding: ROUNDING_SIGNIFICANT})).toEqual('0.00000000121');
        expect(prettyNum(123.123e-10, {precision: 3, rounding: ROUNDING_SIGNIFICANT})).toEqual('0.0000000123');
        expect(prettyNum('123.123e+4', {precision: 3, rounding: ROUNDING_SIGNIFICANT})).toEqual('1231230');

        expect(prettyNum(1.123e-10, {precision: 3, rounding: ROUNDING_FIXED})).toEqual('0.000');
        expect(prettyNum(12.123e-10, {precision: 3, rounding: ROUNDING_FIXED})).toEqual('0.000');
        expect(prettyNum(123.123e-10, {precision: 3, rounding: ROUNDING_FIXED})).toEqual('0.000');
        expect(prettyNum('123.123e+4', {precision: 3, rounding: ROUNDING_FIXED})).toEqual('1231230.000');
    });

    test('not exponential', () => {
        expect(prettyNum(0.00123456, {precision: 3})).toEqual('0.001');
        expect(prettyNum('00000.001234560000000000000', {precision: 3})).toEqual('0.001');
        expect(prettyNum('00000.001204560000000000000', {precision: 3})).toEqual('0.001');

        expect(prettyNum(0.00123456, {precision: 3, rounding: ROUNDING_SIGNIFICANT})).toEqual('0.00123');
        expect(prettyNum('00000.001234560000000000000', {precision: 3, rounding: ROUNDING_SIGNIFICANT})).toEqual('0.00123');
        expect(prettyNum('00000.001204560000000000000', {precision: 3, rounding: ROUNDING_SIGNIFICANT})).toEqual('0.0012');

        expect(prettyNum(0.00123456, {precision: 3, rounding: ROUNDING_FIXED})).toEqual('0.001');
        expect(prettyNum('00000.001234560000000000000', {precision: 3, rounding: ROUNDING_FIXED})).toEqual('0.001');
        expect(prettyNum('00000.001204560000000000000', {precision: 3, rounding: ROUNDING_FIXED})).toEqual('0.001');
        expect(prettyNum('00000', {precision: 3, rounding: ROUNDING_FIXED})).toEqual('0.000');
    });

    test('thousands', () => {
        expect(prettyNum(12345678.12345, {thousandsSeparator: ' '})).toEqual('12 345 678.12345');
        expect(prettyNum('0000012345678.12345000000', {thousandsSeparator: ' '})).toEqual('12 345 678.12345');
    });

    test('all together', () => {
        expect(prettyNum('00000123456789.12345678912345678900000e10', {thousandsSeparator: ' '})).toEqual('1 234 567 891 234 567 891.23456789');
        expect(prettyNum('00000123456789.12345678912345678900000e10', {precision: 3, thousandsSeparator: ' '})).toEqual('1 234 567 891 234 567 891.234');
        expect(prettyNum('00123456789.12300e-2', {precision: 3, thousandsSeparator: ' '})).toEqual('1 234 567.891');
    });
});
