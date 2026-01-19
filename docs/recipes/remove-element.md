# Remove Element

<!-- fiddle Remove the found element -->

📺 Watch this recipe in the video [Remove The Found Element](https://youtu.be/IhGHb7PV3XY).

```html
<div id="make">
  Honda Civic
  <span class="picked">(3 out of 4)</span>
</div>
```

```css hide
.picked {
  font-size: smaller;
  font-weight: lighter;
}
```

To remove the `span.picked` from the page, we can use the jQuery [`remove`](https://api.jquery.com/remove/) method. Cypress querying commands yield jQuery objects, thus we can use [cy.invoke](https://on.cypress.io/invoke) to call the `remove` method immediately.

```js
cy.get('.picked').invoke('remove')
// confirm the element was removed
// by checking the parent's element text
// Note: cannot use "have.text" assertion
// since the HTML element has newlines and other
// whitespace characters
cy.get('#make')
  .invoke('text')
  .invoke('trim')
  .should('equal', 'Honda Civic')
```

<!-- fiddle-end -->

## Remove the middle element

<!-- fiddle Remove the middle element -->

```html
<ol id="pets">
  <li>Dog</li>
  <li>Shark</li>
  <li>Cat</li>
</ol>
```

Let's remove the middle element (index 1 if using the [cy.eq](https://on.cypress.io/eq) command with 3 elements).

```js
cy.get('#pets li')
  .should('have.length', 3)
  .eq(1)
  .invoke('remove')
// confirm the right element was removed
// using the "read" assertion from cypress-map plugin
cy.get('#pets li').should('read', ['Dog', 'Cat'])
```

<!-- fiddle-end -->
