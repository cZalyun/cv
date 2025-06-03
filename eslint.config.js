// Prettier support
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

// JSON support
import json from "@eslint/json";

// Markdown support
import markdown from "@eslint/markdown";

// CSS support
import css from "@eslint/css";

// TypeScript support
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

// Angular support (code + templates)
import angularPlugin from "@angular-eslint/eslint-plugin";
import angularTemplatePlugin from "@angular-eslint/eslint-plugin-template";
import angularTemplateParser from "@angular-eslint/template-parser";

// SonarJS – code-smell detection
import sonarjsPlugin from "eslint-plugin-sonarjs";

// Predefined globals sets (browser, node, etc.)
import globals from "globals";

// Helper: re-usable ignore patterns
const ignores = [
  "**/dist/**",
  "**/out-tsc/**",
  "**/node_modules/**",
  "**/*.d.ts",
  ".angular/**",
  ".history/**",
  ".vscode/**",
  ".husky/**",
  ".git/**",
];

export default [
  /* =============================================================
   * Global ignores
   * =========================================================== */
  {
    ignores,
  },

  /* =============================================================
   * TypeScript / Angular source files (strictest rules)
   * =========================================================== */
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.*.json"],
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: "latest",
        sourceType: "module",
        globals: {
          ...globals.browser,
          ...globals.node,
          ...globals.es2022,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@angular-eslint": angularPlugin,
      sonarjs: sonarjsPlugin,
      eslintPluginPrettierRecommended,
    },
    rules: {
      /* Strictest TypeScript rules */
      ...tsPlugin.configs.all.rules,

      /* Strictest Angular rules */
      ...angularPlugin.configs.all.rules,
      
      /* Customize Angular rules */
      "@angular-eslint/component-max-inline-declarations": [
        "error",
        {
          template: 100,
          styles: 100
        }
      ],
      "max-lines": [
        "error", 
        { 
          "max": 136,
          "skipBlankLines": false,
          "skipComments": false
        }
      ],
      "@typescript-eslint/class-methods-use-this": "off",
      
      ...sonarjsPlugin.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.html"],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      "@angular-eslint/template": angularTemplatePlugin,
    },
    rules: {
      ...angularTemplatePlugin.configs.all.rules,
    },
  },
  {
    files: ["**/*.json"],
    language: "json/json",
    plugins: {
      json,
    },
    rules: {
      "json/no-duplicate-keys": "error",
    },
  },
  {
    files: ["**/*.md"],
    plugins: {
      markdown,
    },
    language: "markdown/commonmark",
    rules: {
      "markdown/no-html": "error",
    },
  },
  {
    files: ["**/*.css"],
    plugins: {
      css,
    },
    language: "css/css",
    rules: {
      "css/no-duplicate-imports": "error",
    },
  },
  {
    ignores: ["**/*.html"],
    ...eslintPluginPrettierRecommended,
  },
];
