module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',

    parserOptions: {
        project: ['./tsconfig.json'],
    },

    plugins: [
        '@typescript-eslint',
    ],

    extends: [
        'airbnb-typescript',
    ],

    rules: {
        "react/prop-types": 0,
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/no-unused-vars": 0

    }
};