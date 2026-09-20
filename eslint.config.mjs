import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'app',

  vue: true,
  typescript: true,

  formatters: true,

  ignores: [
    '.pnpm-store/**',
    '**/migrations/*',
  ],

  rules: {
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 2,
      },
      multiline: {
        max: 1,
      },
    }],

    'ts/no-redeclare': 'off',
    'no-console': 'warn',
    'antfu/no-top-level-await': 'off',
    'node/prefer-global/process': 'off',
    'node/no-process-env': 'error',

    // 'perfectionist/sort-imports': 'error',
  },
})
