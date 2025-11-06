module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'react-app',
    'react-app/jest',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // React específicas
    'react/react-in-jsx-scope': 'off', // React 17+ não precisa importar React
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-closing-tag-location': 'error',

    // React Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Gerais
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-alert': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-trailing-spaces': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],

    // Importações básicas
    'import/no-duplicates': 'error',
    'import/newline-after-import': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['src/react-app-env.d.ts', 'src/reportWebVitals.ts'],
      rules: {
        'quotes': 'off',
        'import/newline-after-import': 'off',
      },
    },
  ],
};
