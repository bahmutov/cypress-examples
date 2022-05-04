# Non-breaking space

Dealing with `&nbsp;` character aka [Non-breaking space](https://en.wikipedia.org/wiki/Non-breaking_space).

## Via cy.contains

When using [cy.contains](https://on.cypress.io/contains) command Cypress automatically converts the `&nbsp;` entity into space character. Thus `cy.contains` finds element that include `&nbsp;`.

<!-- fiddle Without whitespace -->

```html
<div data-testid="testattr">
  <div><span>GBP 0.50</span></div>
</div>
```

```js
// both commands work
cy.contains('[data-testid=testattr]', 'GBP 0.50').should(
  'be.visible',
)
cy.get('[data-testid=testattr]')
  .filter(':contains("GBP 0.50")')
  .should('have.length', 1)
```

<!-- fiddle-end -->

## Asserting text

But if the HTML contains the whitespace special character `&nbsp;` then checking elements by text is tricky. See [#9530](https://github.com/cypress-io/cypress/issues/9530) for example. This is because [.filter](https://on.cypress.io/filter) uses jQuery [:contains selector](https://api.jquery.com/contains-selector/) which uses literal text match.

<!-- fiddle With whitespace / cy.contains works -->

```html
<div data-testid="testattr">
  <div><span>GBP&nbsp;0.50</span></div>
</div>
```

```js
cy.contains('[data-testid=testattr]', 'GBP 0.50').should(
  'be.visible',
)
```

<!-- fiddle-end -->

<!-- fiddle With whitespace / use Unicode in .filter -->

```html
<div data-testid="testattr">
  <div><span>GBP&nbsp;0.50</span></div>
</div>
```

```js
// we can filter by text before the &nbsp;
cy.get('[data-testid=testattr]')
  .filter(':contains("GBP")')
  .should('have.length', 1)

cy.get('[data-testid=testattr]')
  // the following filter DOES NOT WORK
  // .filter(':contains("GBP 0.50")')
  // the following filter DOES NOT WORK
  // .filter(':contains("GBP&nbsp;0.50")')
  // but the Unicode representation of non-breaking space character works
  .filter(':contains("GBP\u00a00.50")')
  .should('have.length', 1)
```

<!-- fiddle-end -->

<!-- fiddle With whitespace / use Unicode in .should have.text -->

```html
<div data-testid="testattr">
  <div><span>GBP&nbsp;0.50</span></div>
</div>
```

```js
cy.get('[data-testid=testattr]')
  .find('span')
  .should('have.text', 'GBP\u00a00.50')
```

<!-- fiddle-end -->

### Be careful with newlines and white space

<!-- prettier-ignore-start -->

<!-- fiddle With whitespace / using should(callback) -->

```html
<div id="network-message">
  Warning: this message has multiple spaces

  and empty lines
</div>
```

```js
const message = `
  Warning: this message has multiple spaces

  and empty lines
`
```

```js skip
// 🚨 INCORRECT, this will fail, demo only
// the newlines and empty lanes break the comparison
cy.contains('#network-message', message)
```

```js
// ✅ use "should(callback)" function to get the full text
// and compare it ourselves without whitespace removal
// as it is done by the cy.contains command
cy.get('#network-message').should($el => {
  const text = $el.text()
  expect(text, 'the original text').to.equal(message)
})
```

<!-- fiddle-end -->
<!-- prettier-ignore-end -->

## Filtering using `cy.filter`

Just checking how `.filter(:contains)` works

<!-- fiddle .filter :contains -->

```html
<ul>
  <li>Home</li>
  <li>Services</li>
  <li>Advanced Services</li>
  <li>Pricing</li>
  <li>Contact</li>
</ul>
```

```js
cy.get('li')
  .filter(':contains("Services")')
  .should('have.length', 2)
```

<!-- fiddle-end -->
