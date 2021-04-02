module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-useless-constructor': 'off',
  },
  overrides: [
    {
      files: ['src/**/*.test.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
      }
    }
  ]
};
