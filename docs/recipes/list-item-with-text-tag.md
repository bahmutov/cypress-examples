# List item with text tag

<!-- fiddle List item has span with text -->

```html
<ul>
  <li>Apples</li>
  <li>
    Bananas
    <span class="badge badge-primary">selected</span>
  </li>
  <li>Pears</li>
  <li>
    Tomatoes
    <span class="badge badge-secondary">out of stock</span>
  </li>
</ul>
```

First, lets practice the `:has` selector. Let's find the `li` items with `span` elements inside

```js
cy.get('li:has(span)').should('have.length', 2)
```

Let's find 'li' elements with child elements with class 'badge-primary' inside

```js
cy.get('li:has(span.badge-primary)').should('have.length', 1)
```

Let's find badge with "out of stock" text using `:contains` selector

```js
cy.get('.badge:contains("out of stock")')
  .parent()
  .should('include.text', 'Tomatoes')
```

Let's combine `:has` and `:contains` selectors and find `li` elements that have `span` elements inside with text "selected"

```js
cy.get('li:has(span:contains("selected"))').should(
  'include.text',
  'Bananas',
)
```

<!-- fiddle-end -->
