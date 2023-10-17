# cy.within Command Does Not Retry

## Inner elements are replaced

<!-- fiddle cy.contains retries and finds the elements within the parent -->

```html hide
<div id="main">
  <div id="shipping">
    <div>Loading...</div>
  </div>
</div>
<script>
  setTimeout(() => {
    document.getElementById('shipping').innerHTML = `
      <div>
        <div><strong>Cost</strong></div>
        <div id="cost">$2.99</div>
      </div>
    `
  }, 1000)
</script>
```

```js
cy.get('#shipping')
  .should('be.visible')
  .within(() => {
    cy.contains('#cost', '$2.99')
  })
```

<!-- fiddle-end -->

## Outer element is replaced

<!-- fiddle.skip cy.contains fails from the stale parent inside cy.within -->

```html hide
<div id="main">
  <div id="shipping">
    <div>Loading...</div>
  </div>
</div>
<script>
  setTimeout(() => {
    document.getElementById('main').innerHTML = `
      <div id="shipping">
        <div><strong>Cost</strong></div>
        <div id="cost">$2.99</div>
      </div>
    `
  }, 1000)
</script>
```

The same code fails.

```js
cy.get('#shipping')
  .should('be.visible')
  .within(() => {
    cy.contains('#cost', '$2.99')
  })
```

The `cy.get('#shipping').within()` locks the commands inside to search a _stale_ element that was replaced by the app. The entire `#shipping` HTML node has been detached from the document and replaced, while Cypress keeps trying to find the new content in the old one.

<!-- fiddle-end -->

## Outer element is replaced - solution

To solve the problem with the parent element and `cy.within`, first confirm the application has finished rendering. Then use `cy.within` to work with the contents inside a stable element.

<!-- fiddle Split cy.within -->

```html hide
<div id="main">
  <div id="shipping">
    <div>Loading...</div>
  </div>
</div>
<script>
  setTimeout(() => {
    document.getElementById('main').innerHTML = `
      <div id="shipping">
        <div><strong>Cost</strong></div>
        <div id="cost">$2.99</div>
      </div>
    `
  }, 1000)
</script>
```

First, confirm the element has finished loading. For example, you can look for the "cost" element inside.

```js
cy.get('#shipping').find('#cost')
```

Now we know the element has been re-rendered and it is safe to use `cy.within`

```js
cy.get('#shipping')
  .should('be.visible')
  .within(() => {
    cy.contains('#cost', '$2.99')
  })
```

<!-- fiddle-end -->
