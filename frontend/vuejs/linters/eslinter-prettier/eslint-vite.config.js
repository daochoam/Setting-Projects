import pkg from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'
import vuePlugin from 'eslint-plugin-vue'
import globals from 'globals'
import vueParser from 'vue-eslint-parser'

const { configs: jsConfigs } = pkg

export default [
  {
    files: ['src/**/*.{js,mjs,cjs}'],
    ignores: [
      'node_modules/',
      'public/',
      'dist/',
      'build/',
      'coverage/',
      '.gitignore',
      '*.config.js',
      '*.config.cjs',
      '*.config.mjs'
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.eslint.json'
      }
    },
    rules: {
      ...jsConfigs.recommended.rules,
      'no-undef': 'warn',
      'no-unused-vars': 'warn',
      'css-modules/no-undef-class': 'warn',
      'css-modules/no-undef-property': 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        parser: tsParser
      }
    },
    plugins: {
      vue: vuePlugin,
      prettier: prettierPlugin
    },
    rules: {
      ...vuePlugin.configs['essential'].rules,
      ...prettierPlugin.configs.recommended.rules,
      'no-inline-comments': 'error',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 4,
          multiline: { max: 1 }
        }
      ],
      'vue/attributes-order': [
        'error',
        {
          order: [
            'GLOBAL',
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            ['UNIQUE', 'SLOT'],
            'TWO_WAY_BINDING',
            'OTHER_ATTR',
            'OTHER_DIRECTIVES',
            'RENDER_MODIFIERS',
            'CONTENT',
            'EVENTS'
          ],
          alphabetical: false
        }
      ],
      'vue/order-in-components': [
        'error',
        {
          order: [
            'el',
            'name',
            'key',
            'parent',
            'functional',
            ['delimiters', 'comments'],
            ['components', 'directives', 'filters'],
            'extends',
            'mixins',
            ['provide', 'inject'],
            'ROUTER_GUARDS',
            'layout',
            'middleware',
            'validate',
            'scrollToTop',
            'transition',
            'loading',
            'inheritAttrs',
            'model',
            ['props', 'propsData'],
            'emits',
            'slots',
            'expose',
            'setup',
            'asyncData',
            'data',
            'fetch',
            'head',
            'computed',
            'watch',
            'watchQuery',
            'LIFECYCLE_HOOKS',
            'methods',
            ['template', 'render'],
            'renderError'
          ]
        }
      ],
      'prettier/prettier': ['error', {}, { usePrettierrc: true }]
    }
  }
]
