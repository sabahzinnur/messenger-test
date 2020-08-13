module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': [
      'error',
      'always'
    ],
    'comma-dangle': ['error', {
      'arrays': 'ignore',
      'objects': 'ignore',
      "imports": "never",
      "exports": "never",
      "functions": "ignore"
    }],
    "space-before-function-paren": ["error", {
      "anonymous": "ignore",
      "named": "ignore",
      "asyncArrow": "always"
    }],
    'object-curly-spacing': ["error", "never"]
  },
};
