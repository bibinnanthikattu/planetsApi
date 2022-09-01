const { off } = require("process");

module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    env: {
        node:true
    },
    overrides: [
        {
            files: ['*.ts'],
            rules: {
                "no-undef":"off",

            }
            
        },
        {
            files: ['*.test.ts'],
            env: {
                node: true,
                jest: true,
                prettier:true
            }
        }
    ],
    rules: {
        "@typescript-eslint/ban-ts-comment":"off"
    }
  };