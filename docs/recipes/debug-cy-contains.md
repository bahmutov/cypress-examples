# Debug cy.contains

## Failing test

<!-- prettier-ignore-start -->

<!-- fiddle Failing test -->

```html hide
<div data-cy="info"  style="display:none;">
  <span data-user-id="user\:1"></span>
</div>
<div id="users">
  <div id="user:1">John  Doe</div>
</div>
<div id="students">
  <div id="user:1">Mary Sue</div>
</div>
```

Let's fetch the user ID and then find the required element. We know it should have text "John Doe", but for some reason, the next test fails to find anything ☹️

```js skip
const username = 'John  Doe'
cy.log('**fetching user id**')
cy.get('[data-cy=info]')
  .within(() => {
// grab the attribute value
cy.get('span').should('have.attr', 'data-user-id')
  .should('be.a', 'string')
  .then(id => {
    cy.contains('#' + id, username)
  })
})
```

There could be several problems, let's debug it.

## How to debug failing `cy.contains` command

- check if the selector has been [properly escaped](./escape-selector.md)
- try finding the elements by selector from the DevTools console using regular browser commands `$$(..selector..)`.
  - ⚠️ make sure to switch the context to "Your project"
  - does it find a single element or multiple elements?
- check if you are inside [cy.within](https://on.cypress.io/within) context, which limits your queries to part of the DOM
- check the HTML text on the page for multiple whitespace characters. They might cause problems for `cy.contains`

**Tip:** You can refactor code to avoid making queries from inside `cy.within` or temporarily escape it

Refactor the `cy.within` code to save the extracted value as an alias

```js skip
cy.within(() => {
  cy.wrap('user\\:1').as('id')
})
// outside the cy.within command
cy.get('@id').then((id) => {
  // make a normal query
})
```

Temporarily escape `cy.within` context:

```js skip
cy.within(() => {
  cy.root()
    .parent()
    .contains('#' + id, username)
})
```

## Solved test

```js
const username = 'John  Doe'
cy.log('**fetching user id**')
cy.get('[data-cy=info]')
  .within(() => {
    // grab the attribute value and save under an alias
    cy.get('span').should('have.attr', 'data-user-id').as('id')
  })
cy.get('@id')
  .should('be.a', 'string')
  .then(id => {
    // clean up the text to avoid multiple whitespace characters
    cy.contains('#' + id, username.replace(/\s+/, ' '))
  })
```

<!-- fiddle-end -->

<!-- prettier-ignore-end -->
