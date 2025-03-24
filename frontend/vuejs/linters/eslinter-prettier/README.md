# Vue.js Project

This is a Vue.js project.

## Installation

Run the following command to install ESLint and related dependencies:

```bash
npm install --save-dev eslint prettier globals eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue eslint-plugin-css-modules  @babel/core @babel/eslint-parser @babel/preset-env @eslint/js @vue/cli-plugin-babel
```

## Scripts

Add the following lines to the `scripts` section in your `package.json`:

```json
"scripts": {
  "format": "prettier --write '**/*.{js,vue,json,css,md}'",
  "lint": "eslint '**/*.{js,vue,json,css,md}'",
  "lint:fix": "eslint '**/*.{js,vue,json,css,md}' --fix --ignore-pattern .gitignore"
}
```

## Prettier Configuration

Create a `.prettierrc` file in the root of your project and add the following content:

```json
{
  "printWidth": 100,
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "htmlWhitespaceSensitivity": "ignore",
  "vueIndentScriptAndStyle": true
}
```

Create a `.prettierignore` file in the root of your project and add the following content:

```
node_modules
dist
public
coverage
.env
.env.local
.env.test.local
.env.development.local
.env.production.local
```

## Usage

- `npm run lint`: Lint files.
- `npm run lint:fix`: Lint and fix files.
- `npm run format`: Format code using Prettier.
