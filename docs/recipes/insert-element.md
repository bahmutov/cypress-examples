# Insert An Element

<!-- fiddle Insert element as the last child -->

📺 Watch this example in the video [Append An Element](https://youtu.be/ZO2qwDJWJRc).

To insert an element as the last child, use the jQuery method [append](https://api.jquery.com/append/)

```html
<ol id="pets">
  <li>Dog</li>
  <li>Tarantula</li>
</ol>
```

```js
cy.get('#pets').invoke('append', '<li>Cat</li>')
// confirm there are 3 list items
// using the "read" assertion from the cypress-map plugin
cy.get('#pets li').should('read', ['Dog', 'Tarantula', 'Cat'])
```

<!-- fiddle-end -->

## Insert in the middle

<!-- fiddle Insert element in the middle of the list -->

```html
<ol id="pets">
  <li>Dog</li>
  <li>Tarantula</li>
</ol>
```

In this case, we can use jQuery method [after](https://api.jquery.com/after/) to insert a new element after the first element.

```js
cy.get('#pets li')
  .should('have.length', 2)
  .first()
  .invoke('after', '<li>Cat</li>')
// confirm there are 3 list items
// using the "read" assertion from the cypress-map plugin
cy.get('#pets li').should('read', ['Dog', 'Cat', 'Tarantula'])
```

<!-- fiddle-end -->
