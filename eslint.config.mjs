import prettier from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends('plugin:@typescript-eslint/recommended', 'prettier'),
    {
        plugins: {
            prettier
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2018,
            sourceType: 'module'
        },

        rules: {
            'prettier/prettier': 'error',

            'padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: '*',
                    next: 'block-like'
                },
                {
                    blankLine: 'always',
                    prev: 'block-like',
                    next: '*'
                },
                {
                    blankLine: 'always',
                    prev: '*',
                    next: 'if'
                },
                {
                    blankLine: 'always',
                    prev: 'if',
                    next: '*'
                }
            ]
        }
    }
];
