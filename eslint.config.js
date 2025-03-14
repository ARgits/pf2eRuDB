import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import stylistic from "@stylistic/eslint-plugin"

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"], plugins: { "@stylistic": stylistic } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.{vue,ts,js}"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    rules: {
      "@stylistic/block-spacing": "error",

      "@stylistic/no-multi-spaces": ["error", { ignoreEOLComments: false }],
      "@stylistic/indent": ["error", 2, {
        "SwitchCase": 2,
        "VariableDeclarator": "first",
        "FunctionDeclaration": { parameters: "first", body: 1 },
        "FunctionExpression": { parameters: "first", body: 1 },
        "MemberExpression": 2,
        "CallExpression": { "arguments": "first" },
        "flatTernaryExpressions": true,
        "offsetTernaryExpressions": true,
        "ObjectExpression": "first"
      }],
      "@stylistic/newline-per-chained-call": ["error", { "ignoreChainWithDepth": 2 }],
      "@stylistic/multiline-ternary": ["error", "always-multiline"],
      "@stylistic/operator-linebreak": ["error", "after"],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/lines-around-comment": ["error", { "beforeBlockComment": true, "beforeLineComment": true }],
      "@stylistic/object-curly-newline": ["error", { "multiline": true }],
      "@typescript-eslint/no-unused-vars": ["error", {
        "args": "all",
        "argsIgnorePattern": "^_",
        "caughtErrors": "all",
        "caughtErrorsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }],
      "vue/no-unused-vars": ["error", { "ignorePattern": "^_" }],

    }
  },
];