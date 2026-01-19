# Insert An Element

<!-- fiddle Insert element as the last child -->

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
