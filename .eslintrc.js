module.exports = {
  extends: 'airbnb-base',
  env: {
    mocha: true,
    browser: true,
    'jest/globals': true,
  },
  plugins: ['jest'],
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': 0,
    'arrow-parens': 'off',
    indent: 'off',
    'operator-linebreak': 'off',
  },
};
