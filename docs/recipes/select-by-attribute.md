# Select by attribute

See [jQuery selectors guide](https://api.jquery.com/category/selectors/)

## Select by the attribute presence

Watch the explanation for this example in the video [Select DOM Elements With An Attribute Present Or Absent](https://youtu.be/Yyy6plSk5W0).

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

<!-- fiddle Select by the attribute value -->

```html hide
<ul>
  <li data-priority="low">One</li>
  <li data-priority="medium">Two</li>
  <li>Three</li>
  <li data-priority="high">Four</li>
</ul>
```

```css hide
[data-priority='medium'] {
  font-weight: bolder;
}
```

```js
// find all LI elements that have
// the "data-priority" attribute with value "medium"
const priority = 'medium'
// because the value comes from the variable priority
// we use JavaScript template string.
// Tip: to be safe, put the value in double quotes
cy.get(`li[data-priority="${priority}"]`)
  .should('have.length', 1)
  .first()
  .should('have.text', 'Two')
```

<!-- fiddle-end -->
