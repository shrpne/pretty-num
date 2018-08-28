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
- reducePrecision - reduce precision of a meaningful decimal part
- stripZeros - strip unnecessary leading and trailing zeros


## Install

```
npm install pretty-num
```


## Usage

```js
import prettyNum from 'pretty-num';

prettyNum(12.123e-10); // => '0.0000000012123'
prettyNum(0.00123456, {precision: 3}); // => '0.00123'
prettyNum(12345678.12345, {thousandsSeparator: ' '}); // => '12 345 678.12345'
prettyNum('00123456789.12300e-2', {precision: 3, thousandsSeparator: ' '}); // => '1 234 567.891'
```

### Options

#### thousandsSeparator
Defines the thousand grouping separator character

#### precision
Number of decimal digits to keep when rounding. Pass falsey value to not change precision.

#### rounding
Rounding type
- `'default'` - reduce precision to specified number of decimal digits, strip unnecessary ending zeros. 

```js
prettyNum(0.01023456, {precision: 3});
// => '0.01'
prettyNum(0.00001203456, {precision: 3});
// => '0'
```

- `'significant'` - reduce precision to specified number of significant decimal digits, strip unnecessary ending zeros. Useful when rounding small values and they should not be rounded to 0
```js
prettyNum(0.01023456, {precision: 3, rounding: 'significant'});
// => '0.0102'
prettyNum(0.00001203456, {precision: 3, rounding: 'significant'});
// => '0.000012'
```  

- `'fixed'` - reduce precision to specified number of decimal digits, pad with ending zeros.
```js
prettyNum(0.01023456, {precision: 3, rounding: 'significant'});
// => '0.010'
prettyNum(0.00001203456, {precision: 3, rounding: 'fixed'});
// => '0.000'
``` 



## License

MIT License
