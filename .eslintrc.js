module.exports = {
  extends: ['react-app', 'prettier'],
  plugins: ['@emotion'],
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 8,
  },
  rules: {
    '@emotion/pkg-renaming': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          '**/*.spec.js',
          '**/stories/**/*.js',
          '**/*.stories.js',
          '**/setupProxy.js',
        ],
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-one-expression-per-line': 0,
    'react/no-did-update-set-state': 0,
    'react/sort-comp': [
      2,
      {
        order: [
          'static-methods',
          'instance-variables',
          'lifecycle',
          'everything-else',
          'render',
        ],
      },
    ],
    'jsx-a11y/href-no-hash': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-underscore-dangle': ['error', { allow: ['_token'] }],
    camelcase: [2, { ignoreDestructuring: true }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'import/no-named-as-default': 'off',
    'import/no-cycle': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: [
          'node_modules',
          'src', // replace with your app-module-path directory
        ],
      },
    },
  },
}
