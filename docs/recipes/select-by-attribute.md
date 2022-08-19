# Select by attribute

See [jQuery selectors guide](https://api.jquery.com/category/selectors/)

## Select by the attribute presence

<!-- fiddle Select by the attribute presence -->

```html hide
<ul>
  <li data-priority>One</li>
  <li data-priority>Two</li>
  <li>Three</li>
  <li data-priority="last">Four</li>
</ul>
```

```css hide
[data-priority] {
  font-weight: bolder;
}
```

```js
// find all LI elements that have
// the "data-priority" attribute
cy.get('li[data-priority]').should('have.length', 3)
```

**Tip:** to select the elements _without an attribute_, use [cy.not](https://on.cypress.io/not) command

```js
// find all LI elements that do not have
// the "data-priority" attribute
cy.get('li')
  .not('[data-priority]')
  .should('have.length', 1)
  .and('have.text', 'Three')
```

<!-- fiddle-end -->

## Select by the attribute value
