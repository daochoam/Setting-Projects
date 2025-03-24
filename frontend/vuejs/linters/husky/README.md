# Integrating Husky with Vue.js and ESLint

This guide explains step-by-step how to integrate Husky into a Vue.js project with ESLint.

## Prerequisites

1. A Vue.js project already set up.
2. Node.js and npm installed on your system.
3. ESLint configured in your project.

## Steps to Integrate Husky

### 1. Install Husky
Run the following command to install Husky as a development dependency:
```bash
npm install --save-dev husky lint-staged
```

### 2. Enable Git Hooks
Initialize Husky to enable Git hooks:
```bash
npx husky install
```

### 3. Add Husky to `package.json`
Add a script to your `package.json` to ensure Husky is set up after dependencies are installed:
```json
"scripts": {
  "prepare": "husky install"
}
```

### 4. Create a Pre-Commit Hook
Set up a pre-commit hook to run ESLint checks before committing:
```bash
npx husky add .husky/pre-commit "npm run lint"
```

### 5. Test the Integration
1. Make changes to your code.
2. Attempt to commit the changes:
   ```bash
   git add .
   git commit -m "Test commit"
   ```
   If there are ESLint errors, the commit will be blocked until the issues are resolved.

## Notes
- You can customize the pre-commit hook to include additional checks or scripts.
- Ensure your ESLint configuration is properly set up to avoid false positives.

By following these steps, you can ensure that your code adheres to the defined linting rules before every commit.