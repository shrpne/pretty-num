## 0.3.0 - 2019-06-14
- **BREAKING** remove deprecated files and rounding methods
- **BREAKING** inner method `toPrecision` stop work with exponential notation
- **BREAKING** rename `rounding` option to `precisionSetting` and change it type from strings to enum numbers
- add `roundingMode` option

## 0.2.2 - 2018-12-13
- Fix backward compatibility: restore 'significant' rounding method name

## 0.2.1 - 2018-12-11
- Fix backward compatibility with v0.1.1: export consts from src/reduce-precision

## 0.2.0 - 2018-12-11
- Add `increase` rounding method 

## 0.1.1 - 2018-08-28
- Fixed usage without options [#1](https://github.com/shrpne/pretty-num/issues/1)

## 0.1.0 - 2018-08-28
- **BREAKING** changed default rounding type from `significant`
- Add `rounding` option, now rounding type can be specified: `default`, `significant`, `fixed` 
- Fixed ending zeros not stripped after rounding

## 0.0.1 - 2018-07-31
- Initial 
