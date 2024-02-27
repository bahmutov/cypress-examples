# Element Detaches

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
