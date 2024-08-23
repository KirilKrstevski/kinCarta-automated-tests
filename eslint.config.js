const globals = require("globals");
const pluginJs = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const playwright = require("eslint-plugin-playwright");

module.exports = [
  {
    ignores: ["eslint.config.js"],
  },
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      sourceType: "script",
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["tests/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    files: ["tests/**/*.ts"],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs.recommended.rules,
      "playwright/no-focused-test": "error",
      "playwright/missing-playwright-await": "error",
      "playwright/no-commented-out-tests": "error",
      "playwright/no-useless-await": "error",
      "playwright/no-page-pause": "error",
      "playwright/no-skipped-test": "off",
      "playwright/no-networkidle": "off",
    },
  },
];
