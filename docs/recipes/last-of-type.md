# Last of type CSS selector

See [:last-of-type](https://developer.mozilla.org/en-US/docs/Web/CSS/:last-of-type) documentation and examples.

📺 Watch this recipe explained in the video [last-of-type And first-of-type CSS Selectors Examples](https://youtu.be/6KmpQjBduY8).

<!-- fiddle Last of type -->

```html
<dl>
  <dt>Vegetables:</dt>
  <dd>1. Tomatoes</dd>
  <dd>2. Cucumbers</dd>
  <dd>3. Mushrooms</dd>
  <dt>Fruits:</dt>
  <dd>4. Apples</dd>
  <dd>5. Mangos</dd>
  <dd>6. Pears</dd>
  <dd>7. Oranges</dd>
</dl>
```

```css hide
dt {
  font-weight: bold;
}

dd {
  margin: 3px;
}

dd:last-of-type {
  border: 2px solid red;
}
```

Let's get the last `<dd>` element on the page.

```js
cy.get('dd:last-of-type')
  .should('have.css', 'border')
  // yields the CSS value, something like
  // "2px solid rgb(...)"
  // confirm it is a solid border
  .should('include', 'solid')
```

Let's get the last `<dt>` element inside the `<dl>` element

```js
cy.get('dl dt:last-of-type').should('have.text', 'Fruits:')
```

The CSS selector `:first-of-type` is the opposite of `:last-of-type`. Let's select the first `<dt>` element

```js
cy.get('dl dt:first-of-type').should('have.text', 'Vegetables:')
```

<!-- fiddle-end -->
