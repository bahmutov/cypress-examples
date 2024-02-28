# Element Detaches

## Application detaches an element

Imagine the element is removed from the DOM after some time. We can confirm this happens by using the `should satisfy` assertion with the built-in Cypress predicate function `Cypress.dom.isDetached`

<!-- fiddle Retry until the element is detached -->

```html hide
<div id="name">Santo</div>
<script>
  setTimeout(() => {
    document.getElementById('name').remove()
  }, 1000)
</script>
```

```js
cy.contains('#name', 'Santo').should(
  'satisfy',
  Cypress.dom.isDetached,
)
```

There is also `Cypress.dom.isAttached` that we can use

```js
cy.contains('#name', 'Santo').should(
  'not.satisfy',
  Cypress.dom.isAttached,
)
```

**Tip:** there are lots of small utility functions inside `Cypress.dom` object.

<!-- fiddle-end -->

## Cypress action leads to detached element

Let's say we want to click on a button, which will cause the element to be refreshed. The old element will be removed. How can we check it from our test?

<!-- fiddle Click and confirm detached -->

```html hide
<div id="main-section">
  <div id="name">Santo</div>
</div>
<button id="click">Click to process</button>
<script>
  document
    .getElementById('click')
    .addEventListener('click', () => {
      setTimeout(() => {
        document.getElementById('name').remove()
        document.getElementById('main-section').innerHTML =
          '<div id="name">Anna</div>'
      }, 1000)
    })
</script>
```

We cannot grab the element _after_ the click. It might be too late

```js skip
// 🚨 INCORRECT, JUST FOR DEMO
cy.contains('Click to process').click()
cy.get('#name').should('satisfy', Cypress.dom.isDetached)
```

Instead, we need to prepare the element reference _before_ we click. Then we click and retry checking the element using `.should(callback)` syntax.

```js
// grab the initial element to prepare
cy.get('#name').then(($el) => {
  cy.contains('Click to process').click()
  // confirm the old element is gone
  cy.wrap(null).should(() => {
    expect($el[0], 'element is gone').to.satisfy(
      Cypress.dom.isDetached,
    )
  })
  // the new element should be quickly there
  cy.contains('#name', 'Anna', { timeout: 0 })
})
```

<!-- fiddle-end -->
