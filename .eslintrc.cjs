module.exports = {
    'ignorePatterns': ['**/*.cjs'],
    'env': {
        'browser': true,
        'node': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:tailwindcss/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        'tailwindcss',
        '@typescript-eslint'
    ],
    'rules': {
        'tailwindcss/no-custom-classname':['off'],
        'indent': ['error', 2],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'jsx-quotes': ['error', 'prefer-single'],
        'semi': ['error', 'never'],
        'no-unused-vars': [2, { 'args': 'none' }],
        'comma-dangle': ['error'],
        'key-spacing': [2, {
          'singleLine': {
            'beforeColon': false,
            'afterColon': true
          },
          'multiLine': {
            'beforeColon': false,
            'afterColon': true,
            'align': 'colon'
          }
        }],
        'keyword-spacing': [
          'error', {
            'before': true,
            'after': true
          }
        ],
        'prefer-template': ['error'],
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'always'],
        'computed-property-spacing': ['error', 'always'],
        'comma-spacing': ['error', { 'before': false, 'after': true }],
        'space-in-parens': ['error', 'never']
      }
}
