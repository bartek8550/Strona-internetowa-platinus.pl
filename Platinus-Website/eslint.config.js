export default [
  {
    files: ["script.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        document: "readonly",
        window: "readonly",
        URLSearchParams: "readonly",
        FormData: "readonly",
        fetch: "readonly",
        Error: "readonly",
      },
    },
    rules: {
      "no-console": "error",
      "no-undef": "error",
      "no-unused-vars": "error",
    },
  },
  {
    files: ["build.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "error",
    },
  },
];
