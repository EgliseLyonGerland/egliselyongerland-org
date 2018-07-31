module.exports = {
  extends: "react-app",
  plugins: ["prettier"],
  globals: {
    __DEVELOPMENT__: true,
    __CLIENT__: true,
    __SERVER__: true,

    // Cypress globals
    Cypress: true,
    cy: true,
    context: true,
    it: true
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src"]
      }
    }
  },
  rules: {
    "prettier/prettier": "error",
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": ["warn", { aspects: ["invalidHref"] }]
  }
};
