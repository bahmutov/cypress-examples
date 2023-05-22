# Bootstrap Version

<!-- fiddle Bootstrap 4 or 5 -->
<!-- fiddle-markup
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
-->

Imagine we are upgrading from Bootstrap v4 to Bootstrap v5. Some pages might be moved over, and our test should support both. Let's say we want to look at the page, see the Bootstrap's version, and depending on the number use different selectors. We can grab the version from JavaScript code like `window.bootstrap.button.VERSION` string, which will be something like "4.5.3" or "5.1.0"

```html
<button type="button" class="btn btn-lg btn-block btn-warning">
  Save
</button>
```

For example, the Bootstrap v5 has removed the button class `btn-block`, thus we cannot use it to select the "Save" button above.

```js
cy.window()
  .its('bootstrap.Button.VERSION')
  .invoke('startsWith', '4')
  .then((bootstrap4) => {
    if (bootstrap4) {
      cy.log('**Bootstrap 4**')
      cy.contains('button.btn-block', 'Save')
    } else {
      cy.log('**Bootstrap 5**')
      cy.contains('button', 'Save')
    }
  })
```

**Note:** a better strategy would be to use HTML attributes that do not change and do not depend on the styling library. See [Cypress best practices for selecting elements guide](https://on.cypress.io/best-practices#Selecting-Elements).

<!-- fiddle-end -->
