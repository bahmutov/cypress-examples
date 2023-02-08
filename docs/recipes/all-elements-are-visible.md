# Visible elements

📺 Watch this recipe explained at [How To Check Visibility Of Many Elements](https://youtu.be/puCZGCeUb5k).

## At least one is visible

The built-in `.should('be.visible')` assertion passes if _any_ of the elements are visible.

<!-- fiddle Any elements are visible -->

```html
<ul id="items">
  <li>One</li>
  <li style="display:none">Two</li>
  <li>Three</li>
</ul>
```

```js
// PASSES even when 1 out of 3 elements is invisible
cy.get('#items li').should('be.visible')
```

On the other hand, the assertion `.should('not.be.visible')` requires _all_ elements to be invisible

```js skip
// FAILS because 2 out of 3 elements ARE visible
cy.get('#items li').and('not.be.visible')
```

<!-- fiddle-end -->

## Check visibility of every element

<!-- fiddle All elements should be visible -->

```html
<ul id="items">
  <li>One</li>
  <li style="display:none">Two</li>
  <li>Three</li>
</ul>
```

Let's compute visibility of every element using built-in [Cypress.dom.isVisible](https://on.cypress.io/dom) method:

```js skip
// FAILS because the middle element has visibility false
cy.get('#items li')
  .then(($el) => Cypress._.map($el, Cypress.dom.isVisible))
  .should('deep.equal', [true, true, true])
```

```js
// let's confirm each element's visibility
cy.get('#items li')
  .then(($el) => Cypress._.map($el, Cypress.dom.isVisible))
  .should('deep.equal', [true, false, true])
```

<!-- fiddle-end -->

## With retries using cypress-map

Unfortunately, because of `cy.then` command, the above snippet does not retry. A better solution would be to use Cypress queries. For example, you could use [cypress-map](https://github.com/bahmutov/cypress-map)

<!-- fiddle All elements become visible using cypress-map -->

```html
<ul id="items">
  <li>One</li>
  <li style="display:none">Two</li>
  <li>Three</li>
</ul>
<script>
  setTimeout(() => {
    document
      .querySelector('#items li:nth-child(2)')
      .setAttribute('style', '')
  }, 1500)
</script>
```

```js
cy.get('#items li')
  .map(Cypress.dom.isVisible)
  .should('deep.equal', [true, true, true])
```

<!-- fiddle-end -->

## Using cypress-map and chai-each plugins

To simplify check that each item in the visibility array is `true`, you can use the Chai plugin [chai-each]()

<!-- fiddle All elements become visible with chai-each -->

```html
<ul id="items">
  <li>One</li>
  <li style="display:none">Two</li>
  <li>Three</li>
</ul>
<script>
  setTimeout(() => {
    document
      .querySelector('#items li:nth-child(2)')
      .setAttribute('style', '')
  }, 1500)
</script>
```

In your support file, load and register the `chai-each` plugin

```js skip
// https://www.chaijs.com/plugins/chai-each/
chai.use(require('chai-each'))
```

Use the `each.equal` assertion to make sure that every element of the visibility array is `true`.

```js
cy.get('#items li')
  .map(Cypress.dom.isVisible)
  .should('each.equal', true)
```

<!-- fiddle-end -->
