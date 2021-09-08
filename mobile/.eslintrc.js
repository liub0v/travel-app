module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended",
  "plugin:react/recommended",
  "plugin:react-native/all",
  "plugin:import/warnings",
  "plugin:import/errors",
  "plugin:react-hooks/recommended"],
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
};
