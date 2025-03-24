# Vue.js Project

This is a Vue.js project.

## Installation

Run the following command to install ESLint and related dependencies:

```bash
npm install --save-dev eslint prettier globals eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-prettier eslint-plugin-css-modules 
```

## Scripts

## TypeScript Configuration

Create a `tsconfig.json` file in the root of your project and add the following content if it does not exist. If it already exists, ensure it includes the following configuration:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.js","src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "exclude": ["node_modules", "dist"]
}
```

This configuration ensures TypeScript works seamlessly with Vue.js and supports modern JavaScript features.

Add the following lines to the `scripts` section in your `package.json`:

```json
"scripts": {
  "format": "prettier --write src",
  "lint": "eslint --ext .ts,.js,.vue src",
  "lint:fix": "eslint --ext .ts,.js,.vue src --fix"
}
```

## ESLint TypeScript Configuration

Create a `tsconfig.eslint.json` file in the root of your project and add the following content:

```json

{
  "extends": "./tsconfig.json",
  "include": [
    "src/**/*.js",
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "src/**/*.d.ts"
  ],
  "exclude": ["node_modules", "dist"]
}
```

This configuration is specifically tailored for ESLint to ensure it only processes the necessary files.

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
