// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  // parser: 'babel-eslint',
  // parserOptions: {
  //   sourceType: 'module'
  // },
  env: {
    browser: true,
    jest: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'airbnb-base',
  plugins: [
    'jest',
    'security',
    'unicorn',
  ],
  // add your custom rules here
  rules: {
    'indent': ["error", 4],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': 0,
    // disable length limit
    'max-len': 0,
    // allow `new Buffer()`
    'no-buffer-constructor': 0,
    // allow assigning to function parameter
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-else-return': 0,
    "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    'no-use-before-define' : 0,
    'object-curly-newline': 0,
    'import/prefer-default-export': 1,
  },
  overrides: [
    {
      files: ['src/**/*'],
      extends: [
        'plugin:security/recommended',
        'plugin:unicorn/recommended',
      ],
      rules: {
        'security/detect-object-injection': 0,
        'unicorn/better-regex': 0,
        // full path import is per spec
        'unicorn/import-index': 0,
        // IE11 support needed
        'unicorn/prefer-includes': 0,
        'unicorn/prefer-ternary': 0,
        // allow lowercase hex number
        'unicorn/number-literal-case': 0,
        'unicorn/prefer-optional-catch-binding': 0,
        'unicorn/prevent-abbreviations': ['error', {
          replacements: {
            'num': false,
            'str': false,
          },
          // whitelist: {
          //   'prettyNum': true,
          // }
        }],
      },
    },
    {
      files: ['test/**/*'],
      extends: [
        'plugin:jest/recommended',
      ],
      rules: {
        'no-unused-vars': 0,
        'import/extensions': 0,
      }
    },
  ]
};
