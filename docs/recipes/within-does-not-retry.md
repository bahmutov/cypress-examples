# cy.within Command Does Not Retry

📺 Watch this recipe explained in the video [Cy Within Command Does Not Retry](https://youtu.be/Emvz1PDRl3M).

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

<!-- fiddle Retry before the cy.within -->

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

## Outer element is replaced after a click

Here is another example that has flake due to the outer element being replaced. The test clicks a button inside the element, and the entire element is replaced.

📺 watch this example explained in the video [Split The cy.within Block](https://youtu.be/0axmFrUzNc0).

<!-- fiddle Split the cy.within block -->

```html hide
<div id="main">
  <div id="shipping">
    <button id="load">Load shipping info</button>
  </div>
</div>
<script>
  document
    .getElementById('load')
    .addEventListener('click', () => {
      setTimeout(() => {
        document.getElementById('main').innerHTML = `
          <div id="shipping">
            <div class="shipped">Shipped 1 day ago</div>
          </div>
        `
      }, 1000)
    })
</script>
```

First, let's try putting everything into a single `cy.within` block. The code below will time out and fail, even though you can see the "Shipped 1 day ago" text appearing.

```js skip
// 🚨 DOES NOT WORK
// since it never "sees" the new "#shipping" element
cy.get('#shipping')
  .should('be.visible')
  .within(() => {
    cy.contains('button', 'Load shipping').click()
    cy.contains('.shipped', 'Shipped')
  })
```

The problem is the `.should('be.visible')` assertion that "fixes" the element to the initial reference due to the bug [#25134](https://github.com/cypress-io/cypress/issues/25134). It does not allow `cy.get` to retry finding the new `#shipping` element that the application put into the document.

**Solution 1:** remove the `be.visible` assertion. Then `cy.get` + `cy.within` can retry (I know, I know, the docs say `cy.within` does not retry, but seems its parent queries _do retry_ in practice).

```js skip
// solution 1: remove the assertion
// to let cy.get + cy.within to retry
cy.get('#shipping').within(() => {
  cy.contains('button', 'Load shipping').click()
  cy.contains('.shipped', 'Shipped')
})
```

**Solution 2:** split the `cy.within` to the commands before the action and after.

```js
// solution 2: split the cy.within block
cy.get('#shipping')
  .should('be.visible')
  .within(() => {
    cy.contains('button', 'Load shipping').click()
  })
// assert the shipped message in a separate query
cy.get('#shipping').contains('.shipped', 'Shipped')
```

<!-- fiddle-end -->
