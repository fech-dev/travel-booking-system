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
    'vue/multi-word-component-names': 'off'
  }
}
