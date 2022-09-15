# Escape Selector

<!-- fiddle Escape selector -->

Imagine the element's ID has a character that has a special meaning, like `:`. How do you select this element?

```html
<div id="person:age">42</div>
```

You need to escape the `:` character. You add a single backslash `\` character, but it JavaScript the backslash needs to be escaped too :) Thus you use double backslash `\\` before the colon (or some other special characters).

```js
cy.get('#person\\:age').should('have.text', '42')
```

**Tip:** jQuery has the [.escapeSelector()](https://api.jquery.com/jQuery.escapeSelector/) method to do the heavy lifting for you.

```js
cy.get('#' + Cypress.$.escapeSelector('person:age')).should(
  'have.text',
  '42',
)
```

Watch this example recipe in the video [Escape The Selector](https://youtu.be/oFUuI2jTWjk).

<!-- fiddle-end -->
