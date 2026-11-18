import antfu from '@antfu/eslint-config'
import antiTrojanSource from 'eslint-plugin-anti-trojan-source'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import security from 'eslint-plugin-security-node'

export default antfu({
  type: 'app',

  vue: true,
  typescript: true,

  formatters: true,

  plugins: {
    'better-tailwindcss': betterTailwindcss,
    'security-node': security,
    'anti-trojan-source': antiTrojanSource,
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
    'pnpm/yaml-enforce-settings': 'off',

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

    ...security.configs.recommended.rules,
    ...antiTrojanSource.configs.recommended.rules,
    // 'perfectionist/sort-imports': 'error',
  },
}, {
  // shared/ runs on both client and server: it must not depend on either side
  files: ['shared/**'],
  rules: {
    'no-restricted-imports': ['error', {
      patterns: [{
        group: ['~/*', '~~/app/*', '#build/*', '~~/server/*', '**/server/**', '~~/config/*', '**/config/*'],
        message: 'shared/ must not import from app/, server/ or config/.',
      }],
    }],
  },
}, {
  // app/ is bundled for the browser: no database connection, no server env
  files: ['app/**'],
  rules: {
    'no-restricted-imports': ['error', {
      patterns: [{
        group: ['~~/server/db/*', '**/server/db/**', '~~/config/*', '**/config/*'],
        message: 'app/ must not import the database client or server env. Use #shared/* for schemas.',
      }],
    }],
  },
})
