# Debug cy.get and cy.contains commands

If the `cy.get` and `cy.contains` command fail to find an element, and you think "it is right there, why don't you see it?!!" this recipe is for you. There could be several problems, and this recipe tries to cover the ones I see most often. First a bit of summary advice on how to debug a failing `cy.get`, `cy.find`, and `cy.contains` commands:

- check if the selector has been [properly escaped](./escape-selector.md)
- try finding the elements by selector from the DevTools console using regular browser commands `$$(..selector..)`
  - ⚠️ make sure to switch the context to "Your project"
  - does it find a single element or multiple elements?
- check if you are inside [cy.within](https://on.cypress.io/within) context, which limits your queries to part of the DOM
- check the HTML text on the page for multiple whitespace characters. They might cause problems for `cy.contains`
- check if the HTML text is in the right case. Sometimes the text in the DOM is one case, and the displayed case is controlled by the CSS

## Special characters in the selector

### The problem

<!-- fiddle The selector should be escaped -->

```html hide
<div data-cy="info" style="display:none;">
  <span data-user-id="user#123"></span>
</div>
<div id="users">
  <div id="user#123">John Doe</div>
</div>
<div id="students">
  <div id="user#456">Mary Sue</div>
</div>
```

The test code fragment fails to find the element, even though it exists.

```js skip
// 🚨 DOES NOT WORK
cy.get('[data-cy=info] span')
  // grab the attribute value
  .should('have.attr', 'data-user-id')
  .should('be.a', 'string')
  .then((id) => {
    cy.get('#' + id)
  })
```

### The solution

The problem is the selector having `#` character. We need to scape special characters in CSS selectors like spaces, `#`, and `:`. Luckily, jQuery includes a good method for this.

```js
// ✅ CORRECT TEST
cy.get('[data-cy=info] span')
  // grab the attribute value
  .should('have.attr', 'data-user-id')
  .then(Cypress.$.escapeSelector)
  .should('be.a', 'string')
  .then((id) => {
    cy.get('#' + id).should('have.text', 'John Doe')
  })
```

<!-- fiddle-end -->

## Accidental cy.within context

### The problem

<!-- fiddle Accidental cy.within context -->

```html hide
<div class="main">
  <div data-cy="info" style="display:none;">
    <span data-user-id="user1"></span>
  </div>
  <div id="users">
    <div id="user1">John Doe</div>
  </div>
  <div id="students">
    <div id="user2">Mary Sue</div>
  </div>
</div>
```

Let's fetch the user ID and then find the required element. We know it should have text "John Doe", but for some reason, the next test fails to find anything ☹️

```js skip
// 🚨 DOES NOT WORK
cy.get('[data-cy=info]').within(() => {
  // grab the attribute value
  cy.get('span')
    .should('have.attr', 'data-user-id')
    .should('be.a', 'string')
    .then((id) => {
      cy.get('#' + id)
    })
})
```

### The solution

Notice that we are using the ID we get from the `data-cy=info` `cy.within` _context_. The search the `cy.get` executes does not start at the top of the document, but instead is limited to the subject of the `cy.within` element. There are two main solutions for this problem.

1. Temporarily escape the `cy.within` context and use `cy.parent().find(selector)` combination.

```js
// ✅ CORRECT TEST (escape cy.within)
cy.get('[data-cy=info]').within(() => {
  // grab the attribute value
  cy.get('span')
    .should('have.attr', 'data-user-id')
    .should('be.a', 'string')
    .then((id) => {
      cy.root().parent().find('#user1')
    })
})
```

2. You can refactor the code to move `cy.get` outside the `cy.within`. You have already seen an example above of using a local closure variable + `.then(callback)` to make the query _after_ the `cy.within` command. You can also use an alias to save the extracted ID and access it later using `cy.get(alias).then(value => ...)` syntax.

```js
// ✅ CORRECT TEST (save under an alias)
cy.get('[data-cy=info]').within(() => {
  // grab the attribute value
  cy.get('span')
    .should('have.attr', 'data-user-id')
    .should('be.a', 'string')
    .as('id')
})
// get the saved value from the alias
cy.get('@id').then((id) => {
  cy.root().parent().find('#user1')
})
```

<!-- fiddle-end -->

## Multiple values

### The problem

Imagine we are trying to find the user that we see on the page and want to confirm the text we see. Somehow we don't get the item...

<!-- fiddle Multiple values matching the selector -->

```html
<div id="users">
  <div class="person" style="display:none">John Doe</div>
</div>
<div id="students">
  <div class="person">Mary Sue</div>
</div>
```

```js skip
// 🚨 DOES NOT WORK
// finds 2 elements
cy.get('.person').should('have.text', 'Mary Sue')
```

### The solution

We want to match what we see and take a special care to avoid hidden elements on the page. Use the pseudo selector `:visible` to limit the query.

```js
// ✅ CORRECT TEST
cy.get('.person:visible').should('have.text', 'Mary Sue')
// alternative, use `cy.filter separate step
cy.get('.person')
  .filter(':visible')
  .should('have.text', 'Mary Sue')
```

**Warning:** inserting `be.visible` assertion into the code does NOT work, since Cypress considers the list of elements visible even if just one element is visible, see the recipe [Visible elements](./all-elements-are-visible.md)

```js skip
// 🚨 DOES NOT WORK
// considers the jQuery object visible
// even if just one element is visible
cy.get('.person')
  .should('be.visible')
  .should('have.text', 'Mary Sue')
```

<!-- fiddle-end -->

## HTML Whitespace

<!-- prettier-ignore-start -->

<!-- fiddle HTML Whitespace -->

### The problem

Notice the HTML markup has 2 spaces between words "John" and "Doe". The browser renders it as a single space.

```html
<div id="user1">John  Doe</div>
```

If we use the username _exactly_ like the HTML source (for example, we might grab the username from the network intercept spy), then we will try to find a string with 2 spaces and will fail.

```js skip
// 🚨 DOES NOT WORK
const username = 'John  Doe'
cy.contains('#user1', username)
```

### The solution

We need to replace multiple whitespace characters with a single one.

```js
// ✅ CORRECT TEST
const username = 'John  Doe'
cy.contains('#user1', username.replace(/\s+/, ' '))
```

**Note:** the assertion "have.text" will work with the original text, since it automatically collapses the whitespace.

```js
cy.get('#user1').should('have.text', username)
// extract the text and match the regular expression
  .invoke('text')
  .and('match', new RegExp('^' + username + '$'))
```

<!-- fiddle-end -->

<!-- prettier-ignore-end -->

## CSS text transform

### The problem

<!-- fiddle CSS text transform -->

```html hide
<style>
  .user {
    text-transform: capitalize;
  }
</style>
<div class="user">john doe</div>
```

```js skip
// 🚨 DOES NOT WORK
cy.contains('.user', 'John Doe')
```

If you inspect the HTML for the element, you will notice that the user is all lowercase `<div class="user">john doe</div>`, and the capital letters are rendered using CSS styles, which `cy.contains` does not know about.

### The solution

Use the original text to find the element.

```js
// ✅ CORRECT TEST
cy.contains('.user', 'john doe')
  // confirm the CSS property
  .should('have.css', 'text-transform', 'capitalize')
```

<!-- fiddle-end -->
