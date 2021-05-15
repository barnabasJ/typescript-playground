// @see https://eslint.org/docs/rules/ for a list of built in rules
// @see https://github.com/dustinspecker/awesome-eslint#code-quality for more rules and plugins
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:radar/recommended',
        'plugin:import/recommended', // @see https://github.com/benmosher/eslint-plugin-import
        'plugin:import/typescript', // @see https://github.com/benmosher/eslint-plugin-import
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier', 'radar'],
    rules: {
        'prettier/prettier': 'error',
        eqeqeq: 'error', // require use of `===` and `!==` @see https://eslint.org/docs/rules/eqeqeq
        'no-magic-numbers': [
            'error',
            { ignoreArrayIndexes: true, ignoreDefaultValues: true },
        ], // disallow magic numbers @see https://eslint.org/docs/rules/no-magic-numbers
        'no-multi-spaces': 'error', // disallow multiple spaces @see https://eslint.org/docs/rules/no-multi-spaces
        'no-implicit-coercion': 'error', // disallow shorthand type conversions @see https://eslint.org/docs/rules/no-implicit-coercion
        'multiline-comment-style': 'error', // enforce a particular style for multiline comments @see https://eslint.org/docs/rules/multiline-comment-style
        'multiline-ternary': 'error', // enforce newlines between operands of ternary expressions @see https://eslint.org/docs/rules/multiline-ternary
        'space-unary-ops': 'error', // enforce consistent spacing before and after unary opeartors @see https://eslint.org/docs/rules/space-unary-ops
        'import/order': 'error', // enforce order of import statements @see https://github.com/benmosher/eslint-plugin-import
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['ts', '.tsx'],
        },
    },
}
