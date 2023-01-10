# prefers-color-scheme

<!-- fiddle prefers-color-scheme -->

Read the blog post [Emulate Media In Cypress Tests](https://glebbahmutov.com/blog/cypress-emulate-media/).

```html
<style>
  @media (prefers-color-scheme: dark) {
    .text {
      background: yellow;
      color: #d0d;
      font-weight: bold;
    }
  }

  @media (prefers-color-scheme: light) {
    .text {
      background: white;
      color: #555;
    }
  }
</style>
<div class="text">A quick brown fox...</div>
```

```js
cy.wrap(
  Cypress.automation('remote:debugger:protocol', {
    command: 'Emulation.setEmulatedMedia',
    params: {
      media: 'page',
      features: [
        {
          name: 'prefers-color-scheme',
          value: 'dark',
        },
      ],
    },
  }),
)
cy.get('.text')
  .then(($el) => window.getComputedStyle($el[0]).backgroundColor)
  .should('be.a', 'string')
  .and('equal', 'rgb(255, 255, 0)') // yellow!
  .wait(1000)
cy.log('**back to the light color scheme**').then(() =>
  Cypress.automation('remote:debugger:protocol', {
    command: 'Emulation.setEmulatedMedia',
    params: {
      media: 'page',
      features: [
        {
          name: 'prefers-color-scheme',
          value: 'light',
        },
      ],
    },
  }),
)
cy.get('.text')
  .then(($el) => window.getComputedStyle($el[0]).backgroundColor)
  .should('be.a', 'string')
  .and('equal', 'rgb(255, 255, 255)') // white!
```

See [`prefers-color-scheme` documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) and the [Chrome DevTools protocol Emulation](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/).

<!-- fiddle-end -->
