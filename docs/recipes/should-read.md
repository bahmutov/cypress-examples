# Should read assertion

This assertion comes from the [cypress-map](https://github.com/bahmutov/cypress-map) plugin. It is useful for checking the text content of list of elements against strings or regular expressions.

<!-- fiddle Should read -->

```html
<ul id="todos">
  <li>Write code</li>
  <li>Add tests</li>
  <li>Pay $10 fine</li>
</ul>
```

Let's confirm the exact text of the first LI element:

```js
cy.get('li').first().should('have.text', 'Write code')
```

We can confirm partial text using `cy.contains`

```js
cy.contains('li', 'Add').should('have.text', 'Add tests')
```

To confirm multiple _exact_ text matches, you can use the `should read` custom assertion from the `cypress-map` plugin

```js
cy.get('li').should('read', [
  'Write code',
  'Add tests',
  'Pay $10 fine',
])
```

You can use either exact text matches or match against regular expressions. For example, if we do not know the precise fine amount, we could use:

```js
cy.get('li').should('read', [
  'Write code',
  'Add tests',
  /^Pay \$\d+ fine$/,
])
```

<!-- fiddle-end -->
