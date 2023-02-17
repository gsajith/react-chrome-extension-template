module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:react-hooks/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json']
  },
  plugins: [
    'react'
  ],
  rules: {
    '@typescript-eslint/no-floating-promises': 'warn',
    semi: [2, 'always'],
    '@typescript-eslint/semi': ['off']
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
