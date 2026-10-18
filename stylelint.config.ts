import type stylelint from 'stylelint'

export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-idiomatic-order',
  ],

  rules: {
    'no-descending-specificity': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    // sass context: @use + @import
    // https://github.com/stylelint/stylelint/issues/5133
    'no-invalid-position-at-import-rule': null,
    // BEM like selector
    // 'selector-class-pattern': '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)*(--[a-z0-9]([-]?[a-z0-9]+)*)?$',
    // use scss/function-no-unknown
    // @see https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/function-no-unknown/README.md
    'function-no-unknown': null,
    'scss/function-no-unknown': [
      true,
      {
        ignoreFunctions: ['percent', 'to-rem', 'to-em'],
      },
    ],
    'declaration-property-value-no-unknown': null, // prevent collision with sass functions
    'color-function-notation': null, // do not change rgba() to rgb()
    'no-duplicate-selectors': null, // The & selector is considering as duplicate. See https://github.com/stylelint/stylelint/issues/7893

    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment', 'blockless-after-same-name-blockless'],
        ignoreAtRules: ['else'],
      },
    ],
  },
  defaultSeverity: 'warning',
  ignoreFiles: [
    '.nuxt/**/*',
    '.output/**/*',
    'dist/**/*',
  ],
} satisfies stylelint.Config
