const globals = require('globals')
const { configs: jsConfigs } = require('@eslint/js')
const vuePlugin = require('eslint-plugin-vue')
const prettierPlugin = require('eslint-plugin-prettier')
const babelParser = require('@babel/eslint-parser')
const vueParser = require('vue-eslint-parser')

module.exports = [
  {
    files: ['src/**/*.{js,mjs,cjs}'],
    ignores: [
      'node_modules/',
      'public/',
      'package-lock.json',
      'package.json',
      '*.config.js',
      '*.config.cjs',
      '*.config.mjs'
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        requireConfigFile: false
      }
    },
    rules: {
      ...jsConfigs.recommended.rules,
      'no-unused-vars': 'off',
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
        parser: babelParser,
        requireConfigFile: false
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
          singleline: 4, // Max 4 attribute per line for single-line elements
          multiline: {
            max: 4 // Max 4 attribute per line for multi-line elements
          }
        }
      ],

      'vue/block-order': [
        'error',
        {
          order: [['docs', 'template', 'script'], 'style[scoped]']
        }
      ],
      // Enforce a specific order for attributes in Vue components
      'vue/attributes-order': [
        'error',
        {
          order: [
            'GLOBAL', // id
            'DEFINITION', // is
            'LIST_RENDERING', // v-for
            'CONDITIONALS', // v-if, v-else-if, v-else, v-show, v-cloak
            ['UNIQUE', 'SLOT'], // ref, key, v-slot
            'TWO_WAY_BINDING', // v-model
            'OTHER_ATTR', // props, class, style
            'OTHER_DIRECTIVES', // Other directives not covered above
            'RENDER_MODIFIERS', // v-once, v-pre, v-memo
            'CONTENT', // v-text, v-html
            'EVENTS' // v-on or @
          ],
          alphabetical: false // Optional: disable alphabetical sorting within groups
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
      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true
        }
      ]
    }
  }
]
