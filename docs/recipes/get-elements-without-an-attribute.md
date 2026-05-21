# Get All Elements Without An Attribute

<!-- fiddle Get all elements without "priority" attribute -->

```html
<ul>
  <li data-priority>One</li>
  <li data-priority>Two</li>
  <li>Three</li>
  <li data-priority="last">Four</li>
</ul>
```

First, let us find all elements with "data-priority" attribute present

```js
cy.get('ul li[data-priority]').should('read', [
  'One',
  'Two',
  'Four',
])
```

We can find all elements _without_ "data-priority" attribute either using jQuery selector `:not` or Cypress child query command [cy.not](https://on.cypress.io/not)

```js
// find all elements without "data-priority" attribute present
// using jQuery selector :not
cy.get('ul li:not([data-priority])').should('read', ['Three'])
// find all elements without "data-priority" attribute present
// by first finding all LI elements then using "cy.not" to filter
// the ones with the attribute present
cy.get('ul li').not('[data-priority]').should('read', ['Three'])
```

<!-- fiddle-end -->
