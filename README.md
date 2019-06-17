# pretty-num

[![NPM Package](https://img.shields.io/npm/v/pretty-num.svg?style=flat-square)](https://www.npmjs.org/package/pretty-num)
[![Minified Size](https://img.shields.io/bundlephobia/min/pretty-num.svg?style=flat-square)](https://bundlephobia.com/result?p=pretty-num)
[![Build Status](https://img.shields.io/travis/com/shrpne/pretty-num/master.svg?style=flat-square)](https://travis-ci.com/shrpne/pretty-num)
[![Coverage Status](https://img.shields.io/coveralls/github/shrpne/pretty-num/master.svg?style=flat-square)](https://coveralls.io/github/shrpne/pretty-num?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/shrpne/pretty-num/blob/master/LICENSE)

Lightweight module to convert number to a pretty human readable string.

Includes:
- [from-exponential](https://github.com/shrpne/from-exponential) - remove exponential notation
- [thousands](https://github.com/scurker/thousands) - add thousands separators
- toPrecision - adjust precision of decimal part
- stripZeros - strip unnecessary leading and trailing zeros


## Install

```
npm install pretty-num
```


## Usage

```js
import prettyNum, {PRECISION_SETTING} from 'pretty-num';

prettyNum(12.123e-10); // => '0.0000000012123'
prettyNum(0.00123456, {precision: 3}); // => '0.001'
prettyNum(0.00123456, {precision: 3, precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT}); // => '0.00123'
prettyNum(12345678.12345, {thousandsSeparator: ' '}); // => '12 345 678.12345'
prettyNum('00123456789.12300e-2', {precision: 3, thousandsSeparator: ' '}); // => '1 234 567.891'
```

## Options

### `thousandsSeparator`
Defines the thousand grouping separator character

### `precision`
Number of decimal digits to keep when rounding. Pass falsey value to not change precision.

### `precisionSetting`
How to work with precision:

#### Reduce
`1`, `REDUCE` (default) - reduce precision to specified number of decimal digits, strip unnecessary ending zeros; 
```js
prettyNum(0.01023456, {precision: 3});
// => '0.01'
prettyNum(0.00001203456, {precision: 3});
// => '0'
```

#### Reduce significant
`2`, `REDUCE_SIGNIFICANT` - reduce precision to specified number of significant decimal digits, strip unnecessary ending zeros. Useful when rounding small values and they should not be rounded to 0
```js
prettyNum(0.01023456, {precision: 3, precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT});
// => '0.0102'
prettyNum(0.00001203456, {precision: 3, precisionSetting: PRECISION_SETTING.REDUCE_SIGNIFICANT});
// => '0.000012'
```  

#### Fixed
`3`, `FIXED` - set precision to specified number of decimal digits, pad with ending zeros if needed.
```js
prettyNum(0.01023456, {precision: 3, precisionSetting: PRECISION_SETTING.FIXED});
// => '0.010'
prettyNum(0.00001203456, {precision: 3, precisionSetting: PRECISION_SETTING.FIXED});
// => '0.000'
``` 

#### Increase
`4`, `INCREASE` - pad with ending zeros to increase precision to specified number of decimal digits.
```js
prettyNum(0.01, {precision: 4, precisionSetting: PRECISION_SETTING.INCREASE});
// => '0.0100'
prettyNum(12, {precision: 4, precisionSetting: PRECISION_SETTING.INCREASE});
// => '12.0000'
prettyNum(12.123456, {precision: 4, precisionSetting: PRECISION_SETTING.INCREASE});
// => '12.123456'
``` 


### `roundingMode`
Specifies a rounding behavior for numerical operations capable of discarding precision. Following rounding modes are supported:

- `1`, `UP` - Rounding mode to round away from zero.
- `2`, `DOWN` - Rounding mode to round towards zero.
- `3`, `CEIL` - Rounding mode to round towards positive infinity.
- `4`, `FLOOR` - Rounding mode to round towards negative infinity.
- `5`, `HALF_UP` - Rounding mode to round towards "nearest neighbor" unless both neighbors are equidistant, in which case round up.
- `6`, `HALF_DOWN` - Rounding mode to round towards "nearest neighbor" unless both neighbors are equidistant, in which case round down.
- `7`, `HALF_EVEN` - Rounding mode to round towards the "nearest neighbor" unless both neighbors are equidistant, in which case, round towards the even neighbor.

Extensive description of the modes can be found at [Rounding Modes](https://docs.oracle.com/javase/8/docs/api/java/math/RoundingMode.html)

```js
prettyNum(123.657, {precision: 1, roundingMode: ROUNDING_MODE.DOWN}); // => "123.6"
prettyNum(123.657, {precision: 2, roundingMode: ROUNDING_MODE.CEIL}); // => "123.66"
```


## Comparison

- This module: [![Minified Size](https://img.shields.io/bundlephobia/min/pretty-num.svg?style=flat-square&label=minified)](https://bundlephobia.com/result?p=pretty-num) [![Minified Size](https://img.shields.io/bundlephobia/minzip/pretty-num.svg?style=flat-square&label=gzipped)](https://bundlephobia.com/result?p=pretty-num)
- [`js-big-decimal`](https://github.com/royNiladri/js-big-decimal): [![Minified Size](https://img.shields.io/bundlephobia/min/js-big-decimal.svg?style=flat-square&label=minified)](https://bundlephobia.com/result?p=js-big-decimal) [![Minified Size](https://img.shields.io/bundlephobia/minzip/js-big-decimal.svg?style=flat-square&label=gzipped)](https://bundlephobia.com/result?p=js-big-decimal) Math operations are supported, `REDUCE_SIGNIFICANT`, `FIXED` and `INCREASE` `precisionSetting` are not supported
- [`big.js`](https://github.com/MikeMcl/big.js): [![Minified Size](https://img.shields.io/bundlephobia/min/big.js.svg?style=flat-square&label=minified)](https://bundlephobia.com/result?p=big.js) [![Minified Size](https://img.shields.io/bundlephobia/minzip/big.js.svg?style=flat-square&label=gzipped)](https://bundlephobia.com/result?p=big.js) Math operations are supported, some `precisionSetting` are not supported, `CEIL`, `FLOOR` and `HALF_DOWN` `roundingMode` are not supported.

- [`bignumber.js`](https://github.com/MikeMcl/bignumber.js): [![Minified Size](https://img.shields.io/bundlephobia/min/bignumber.js.svg?style=flat-square&label=minified)](https://bundlephobia.com/result?p=bignumber.js) [![Minified Size](https://img.shields.io/bundlephobia/minzip/bignumber.js.svg?style=flat-square&label=gzipped)](https://bundlephobia.com/result?p=bignumber.js) Math operations are supported, more rounding modes are supported, some `precisionSetting` are not supported.



## License

MIT License
