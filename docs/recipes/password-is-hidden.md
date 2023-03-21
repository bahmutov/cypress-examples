# Password Is Hidden

<!-- fiddle Password input is hidden -->

```html hide
<div class="form-row">
  <div class="form-group">
    <label for="password">Password</label>
    <input
      type="password"
      class="form-input"
      name="my-secret"
      id="my-secret"
      value=""
    />
  </div>
</div>
```

Confirm the browser [hides](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password) the entered characters by checking that the element is an `<input type="password">`. We can check the element using two different assertions.

```js
cy.get('#my-secret')
  .should('have.prop', 'nodeName', 'INPUT')
  .and('have.attr', 'type', 'password')
```

We could also include the node name and the password attribute in our query. We can also hide what we type into the input element, see [Keep passwords secret in E2E tests](https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/).

```js
cy.get('input#my-secret[type=password]').type('123!secret', {
  log: false,
})
```

<!-- fiddle-end -->
