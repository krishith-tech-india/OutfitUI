module.exports = {
  root: true, // Indicates this is the root ESLint configuration file

  // Specifies the environments where the code will run
  env: {
    browser: true, // Enables browser globals like `window` and `document`
    es2020: true, // Sets the ECMAScript version to ES2020
  },

  // Extends various ESLint configurations and plugins for different rules
  extends: [
    "eslint:recommended", // Base ESLint recommended rules
    "plugin:react/recommended", // Recommended rules for React
    "plugin:@typescript-eslint/recommended-type-checked", // Recommended rules for TypeScript
    "plugin:@typescript-eslint/recommended-requiring-type-checking", // Additional rules that require type checking
    "plugin:prettier/recommended", // Disables ESLint formatting rules that conflict with Prettier
    "plugin:import/errors", // Plugin for import/export syntax errors
    "plugin:import/warnings", // Plugin for import/export syntax warnings
    "plugin:import/typescript", // Plugin for TypeScript-specific import/export rules
  ],

  // Directories and files to ignore when linting
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts"],

  // Parser options for TypeScript files and JSX support
  parserOptions: {
    project: "./tsconfig.json", // Specifies the TypeScript project configuration file
    ecmaFeatures: {
      jsx: true, // Enables JSX parsing
    },
    ecmaVersion: 12, // Sets the ECMAScript version to ES2021
    sourceType: "module", // Allows the use of imports and exports,
    tsconfigRootDir: __dirname,
  },

  // Specifies the parser for TypeScript files
  parser: "@typescript-eslint/parser",

  // Plugins to extend ESLint's functionality
  plugins: [
    "react-refresh", // Plugin for React fast refresh (if used)
    "@typescript-eslint", // TypeScript specific ESLint rules
    "prettier", // Integration with Prettier
    "import", // Plugin for import/export syntax
  ],

  // Custom ESLint rules configuration
  rules: {
    "prettier/prettier": ["error", {}, { usePrettierrc: true }], // Reports Prettier errors as ESLint errors
    "import/extensions": "off", // Disables import file extension checking
    "import/default": "off", // Disables default import/export syntax checking
    "@typescript-eslint/await-thenable": "error", // Reports incorrect usage of `await`
    "@typescript-eslint/explicit-module-boundary-types": "off", // Allows implicit return types in functions
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Allows unused variables prefixed with `_`
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/react-in-jsx-scope": "off", // Allows omitting React import in JSX files
    "react/prop-types": "off", // Disables prop-types validation (useful for TypeScript)
    "import/order": [
      "error",
      {
        // Enforces a consistent import order
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"], // Specifies import group order
        alphabetize: { order: "asc", caseInsensitive: true }, // Alphabetizes import names
      },
    ],
    "import/default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "import/newline-after-import": "error", // Requires newline after imports
    "import/no-unresolved": "error", // Reports unresolved import paths
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }], // Allows dev dependencies in development files
    "no-console": ["warn", { allow: ["warn", "error"] }], // Warns against console.log usage
    "no-debugger": "warn", // Warns against debugger statements
    "consistent-return": "error", // Requires consistent return statements
    curly: "error", // Requires curly braces for control statements
    eqeqeq: "error", // Requires strict equality checks (=== and !==)
    "no-eval": "error", // Disallows eval() usage
    "no-implied-eval": "error", // Disallows implied eval()
    "no-return-await": "error", // Requires async functions to always return await expressions
    "no-throw-literal": "error", // Requires throw statements to throw Error objects
    "no-unused-expressions": "error", // Reports unused expressions
    "no-useless-return": "error", // Reports unnecessary return statements
  },

  // Settings for external libraries and frameworks
  settings: {
    react: {
      version: "detect", // Automatically detects the installed React version
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"], // Specifies TypeScript file extensions for imports
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // Always tries to resolve types under `@types` directories
        project: "./tsconfig.json", // Specifies the TypeScript project configuration file path
      },
    },
  },
};
