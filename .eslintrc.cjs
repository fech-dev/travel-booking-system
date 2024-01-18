/** @type { import('eslint').ESLint.ConfigData } */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],

  rules: {
    'import/no-named-as-default-member': 'off'
  }
}
