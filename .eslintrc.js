module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-essential',
      '@vue/typescript/recommended',
    ],
    parserOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      'vue/no-multiple-template-root': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      // 添加或修改其他规则
    },
  }