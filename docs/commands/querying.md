# Querying

Examples of querying for DOM elements in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api) and read [Selecting Elements: Best Practices Guide](https://on.cypress.io/best-practices#Selecting-Elements)

## [cy.get()](https://on.cypress.io/get)

To query for the button, use the `cy.get()` command.

<!-- fiddle get button -->

```html
<div id="querying-example">
  <div class="well">
    <button id="query-btn" class="query-btn btn btn-primary">
      Button
    </button>
  </div>
</div>
```

```js
cy.get('#query-btn').should('contain', 'Button')

cy.get('.query-btn').should('contain', 'Button')

// Use CSS selectors just like jQuery
cy.get('#querying-example .well>button:first').should(
  'contain',
  'Button',
)
```

<!-- fiddle-end -->

To find elements by data attribute, query using the attribute selector.

<!-- fiddle get by data attribute -->

```html
<div data-test-id="test-example" class="example">
  Div with <code>data-test-id</code>
</div>
```

```js
cy.get('[data-test-id="test-example"]').should(
  'have.class',
  'example',
)
```

`cy.get()` yields a jQuery object, you can get its attribute by invoking the `.attr()` method.

```js
// find the element, confirm its attribute
cy.get('[data-test-id="test-example"]')
  .invoke('attr', 'data-test-id')
  .should('equal', 'test-example')

// or you can get an element's CSS property
cy.get('[data-test-id="test-example"]')
  .invoke('css', 'position')
  .should('equal', 'static')
```

Alternatively, chain assertions directly to the `cy.get()` call. See [assertions documentation](https://on.cypress.io/assertions).

```js
cy.get('[data-test-id="test-example"]')
  .should('have.attr', 'data-test-id', 'test-example')
  .and('have.css', 'position', 'static')
```

<!-- fiddle-end -->

## [cy.contains()](https://on.cypress.io/contains)

We can find elements by their content using `cy.contains()`

<!-- fiddle contains -->

```html
<div id="querying">
  <ul class="query-list">
    <li class="first">apples</li>
    <li class="second">oranges</li>
    <li class="third">bananas</li>
    <li class="fourth">more apples</li>
  </ul>
  <div class="query-button">
    <button class="btn btn-default">
      <span>Save Form</span>
    </button>
  </div>
</div>
```

```js
cy.get('.query-list')
  .contains('bananas')
  .should('have.class', 'third')

// we can pass a regexp to `.contains()`
cy.get('.query-list').contains(/^b\w+/).should('have.class', 'third')

cy.get('.query-list').contains('apples').should('have.class', 'first')

// passing a selector to contains will
// yield the selector containing the text
cy.get('div#querying')
  .contains('ul', 'oranges')
  .should('have.class', 'query-list')

cy.get('.query-button')
  .contains('Save Form')
  .should('have.class', 'btn')
```

<!-- fiddle-end -->

## [.within](https://on.cypress.io/within)

We can find elements within a specific DOM element `.within()`

<!-- fiddle form example -->

```html
<h6>Name input</h6>
<input
  type="text"
  id="inputName"
  class="form-control"
  placeholder="Name"
/>
<h6>Form</h6>
<form class="query-form">
  <input
    type="text"
    id="inputEmail"
    class="form-control"
    placeholder="Email"
  />
  <input
    type="text"
    id="inputPassword"
    class="form-control"
    placeholder="Password"
  />
</form>
```

```js
cy.get('.query-form').within(() => {
  cy.get('input:first').should('have.attr', 'placeholder', 'Email')
  cy.get('input:last').should('have.attr', 'placeholder', 'Password')
})
```

<!-- fiddle-end -->

## [cy.root()](https://on.cypress.io/root)

We can find the root DOM element `cy.root()`

<!-- fiddle.export root example -->

```html
<ul class="query-ul">
  <li>One</li>
  <li>Two</li>
  <li>Buckle my shoe</li>
</ul>
```

```js
// By default, root is the document
cy.root().should('match', 'html')

cy.get('.query-ul').within(() => {
  // In this within, the root is now the ul DOM element
  cy.root().should('have.class', 'query-ul')
})
```

<!-- fiddle-end -->

## [Best Practices: Selecting elements](https://on.cypress.io/best-practices#Selecting-Elements)

Prefer dedicated `data-cy` or `data-test` attributes to CSS class names and element IDs. See detailed discussion at [Best Practices: Selecting elements](https://on.cypress.io/best-practices#Selecting-Elements)

<!-- fiddle Selecting Elements -->

```html
<div id="best-practices">
  <button
    id="main"
    class="btn btn-large"
    name="submission"
    role="button"
    data-cy="submit"
  >
    Submit
  </button>
</div>
```

```js
cy.get('#best-practices').within(() => {
  // Worst - too generic, no context
  cy.get('button').click()

  // Bad. Coupled to styling. Highly subject to change.
  cy.get('.btn.btn-large').click()

  // Average. Coupled to the `name` attribute which has HTML semantics.
  cy.get('[name=submission]').click()

  // Better. But still coupled to styling or JS event listeners.
  cy.get('#main').click()

  // Slightly better. Uses an ID but also ensures the element
  // has an ARIA role attribute
  cy.get('#main[role=button]').click()

  // Much better. But still coupled to text content that may change.
  cy.contains('Submit').click()

  // Best. Insulated from all changes.
  cy.get('[data-cy=submit]').click()
})
```

<!-- fiddle-end -->
