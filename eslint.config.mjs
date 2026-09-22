import antfu from '@antfu/eslint-config'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'

export default antfu({
  type: 'app',

  vue: true,
  typescript: true,

  formatters: true,

  plugins: {
    'better-tailwindcss': betterTailwindcss,
  },
  settings: {
    'better-tailwindcss': {
      entryPoint: './app/assets/styles/tailwind.css',
    },
  },
  ignores: [
    '.pnpm-store/**',
    '**/migrations/*',
  ],

  rules: {
    'better-tailwindcss/enforce-consistent-class-order': 'warn',
    'better-tailwindcss/no-unnecessary-whitespace': 'warn',
    'better-tailwindcss/no-conflicting-classes': 'error',

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
