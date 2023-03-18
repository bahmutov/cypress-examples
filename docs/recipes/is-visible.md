# Element Is Visible

In every example, the button appears on the page only after 1.5 seconds. How would the test confirm the button becomes visible?

## Assertion be.visible

You can use the built-in [Chai-jQuery assertion](https://github.com/chaijs/chai-jquery) `be.visible`

<!-- fiddle element should be visible -->

```html hide
<button id="a-button" style="display:none">Click me</button>
<script>
  setTimeout(() => {
    document.getElementById('a-button').style.display = 'initial'
  }, 1500)
</script>
```

```js
cy.get('#a-button').should('be.visible')
```

<!-- fiddle-end -->

## Assertion callback

You can use `should(callback)` and call the `Cypress.dom.isVisible` utility function to check the element's visibility.

<!-- fiddle element should satisfy the assertion callback -->

```html hide
<button id="a-button" style="display:none">Click me</button>
<script>
  setTimeout(() => {
    document.getElementById('a-button').style.display = 'initial'
  }, 1500)
</script>
```

```js
cy.get('#a-button').should(($el) => {
  // note that the Command Log does not show much information
  // for thrown errors while it retries
  if (!Cypress.dom.isVisible($el)) {
    throw new Error('Element is hidden')
  }
})
```

<!-- fiddle-end -->

## Should satisfy assertion

A better variant is to use the `Cypress.dom.isVisible` predicate function with Chai assertion `satisfy`

<!-- fiddle element should satisfy visibility predicate -->

```html hide
<button id="a-button" style="display:none">Click me</button>
<script>
  setTimeout(() => {
    document.getElementById('a-button').style.display = 'initial'
  }, 1500)
</script>
```

```js
cy.get('#a-button').should('satisfy', Cypress.dom.isVisible)
```

<!-- fiddle-end -->

## Click waits for the element to become visible

Commands like `cy.click` automatically wait for the element to become visible, no assertions necessary.

<!-- fiddle click waits for the element to become visible -->

```html hide
<button id="a-button" style="display:none">Click me</button>
<script>
  setTimeout(() => {
    document.getElementById('a-button').style.display = 'initial'
  }, 1500)
</script>
```

```js
cy.get('#a-button').click()
```

<!-- fiddle-end -->
