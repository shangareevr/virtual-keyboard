module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'max-len': ['error', {
      code: 200,
    }],
    'import/extensions': 'off',
    'linebreak-style': 0,
    ' global-require': 0,
    'стиль разрыва строки eslint': [0, 'ошибка', 'windows'],
  },
};
