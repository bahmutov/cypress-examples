# Find All Buttons Without `data-cy` attribute

📺 Watch this recipe explained in the video [Find Elements Without An Attribute](https://youtu.be/52KW-t2wWaE).

<!-- fiddle Find all buttons without data-cy attribute -->

```html
<button id="click1" data-cy="one">Click me</button>
<button id="click2">Save</button>
<button id="click3">Reload</button>
```

We can list all buttons that have the `data-cy` attribute.

```js
cy.get('button[data-cy]')
  // only a single "Click me" button has "data-cy"
  .map('innerText')
  .should('deep.equal', ['Click me'])
```

Let's find all buttons on the page that _do not have_ the `data-cy` attribute. Maybe these buttons are not covered by the E2E tests.

```js
cy.get('button:not([data-cy])')
  .should('have.length', 2)
  // confirm the found buttons
  // using cypress-map query command "cy.mapInvoke"
  .mapInvoke('getAttribute', 'id')
  .should('deep.equal', ['click2', 'click3'])
```

<!-- fiddle-end -->
