import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
  },
  plugins: {
    react,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    // React 17+
    "react/react-in-jsx-scope": "off",

    // Hooks
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // Calidad
    "no-unused-vars": "warn",
    "no-console": "warn",

    // Vite / React refresh
    "react-refresh/only-export-components": "warn",

    // No usamos prop-types
    "react/prop-types": "off"
  }
  }
];