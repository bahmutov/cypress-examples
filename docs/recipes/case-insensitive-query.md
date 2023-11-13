# Case-insensitive attribute selectors

Read [CSS case insensitive attribute selector](https://weekendprojects.dev/posts/css-case-insensitive-selector/).

## Static DOM

<!-- fiddle cy.get / Case-insensitive selectors -->

```html
<button class="btn-PRIMARY">Green</button>
<button class="btn-primary">Red</button>
```

🚨 Does not work, see [#25304](https://github.com/cypress-io/cypress/issues/25304)

```js skip
cy.get('button[class=btn-primary i]').should('have.length', 2)
```

✅ Works for static DOM by calling `Cypress.$` directly, passing the jQuery object to `cy.wrap` and chaining further assertions.

```js
cy.wrap(Cypress.$('button[class=btn-primary i]')).should(
  'have.length',
  2,
)
```

<!-- fiddle-end -->

## Dynamic DOM

Let's take a more complex example where the page might change. Calling `Cypress.$` once does not retry, thus we will never find the new elements. One solution is to make the `Cypress.$(...)` call retry-able: wrap the `Cypress` object and use the `cy.invoke` command (which does retry).

<!-- fiddle Dynamic dom and retrying -->

```html hide
<div id="buttons"></div>
<script>
  setTimeout(() => {
    document.getElementById('buttons').innerHTML = `
      <button class="btn-PRIMARY">Green</button>
      <button class="btn-primary">Red</button>
    `
  }, 1000)
</script>
```

```js
cy.wrap(Cypress)
  .invoke('$', 'button[class=btn-primary i]')
  .should('have.length', 2)
```

**Tip:** you can also use a separate assertion to wait until the page fully loads and then call `Cypress.$` inside a `cy.then` callback.

```js
cy.get('#buttons')
  .should('not.be.empty')
  .then(() => {
    // query the DOM after the page loads
    cy.wrap(Cypress.$('button[class=btn-primary i]')).should(
      'have.length',
      2,
    )
  })
```

<!-- fiddle-end -->
