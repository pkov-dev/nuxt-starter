# Styles

- **SCSS** is the main tool: BEM classes, `clamp`, adaptive values.
- **Tailwind** with the `t:` prefix is for quick utilities (`t:sr-only`) and shadcn-vue components.

## SCSS beats utilities

Tailwind puts utilities into `@layer utilities`. SCSS has no layer, and unlayered styles win over any layer.

- A `t:` utility will not override a property set by a BEM class on the same element. This is intended.
- Global styles (`button:focus-visible` etc.) also override utilities inside shadcn components.
  Check this when adding a component.
