# Get text script

<!-- fiddle Get text script -->

You can embed the data for test to use using `<script type='text/plain'>...</script>` tags. These tags will not be rended by the page (unless you set their style to be visible), but they are easy to query using the standard CSS selectors.

```html
<script type="text/plain" id="name">
  Joe
</script>
```

```js
cy.get('#name[type="text/plain"]').should('include.text', 'Joe')
```

<!-- fiddle-end -->
