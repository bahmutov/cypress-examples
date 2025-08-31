# The Difference Between `cy.find` and `cy.filter`

The [cy.find](https://on.cypress.io/find) query command finds the descendents of the current subject, while the [cy.filter](https://on.cypress.io/filter) filters the _current_ elements and returns a new list.

<!-- fiddle cy.find vs cy.filter -->

```html
<ul id="fruits">
  <li>
    <span class="name">Pears</span> <span class="new">New</span>
  </li>
  <li>
    <span class="name">Apples</span>
  </li>
  <li>
    <span class="name">Kiwi</span>
  </li>
  <li>
    <span class="name">Grapes</span> <span class="new">New</span>
  </li>
</ul>
```

```css hide
.new {
  background-color: blue;
  border-radius: 5px;
  padding: 5px;
  color: white;
  font-weight: bold;
  font-size: small;
}
```

Let's first grab all fruits `LI` elements and then find the fruits that are new. We can try solving this problem usig the `cy.find` command first.

```js
cy.get('#fruits li')
  // if we use the cy.find command
  // it gives us the "New" labels
  .find('.new')
  // check the labels by looking at the text content
  .should('read', ['New', 'New'])
```

Note: the "should read" assertion from [cypress-map](https://github.com/bahmutov/cypress-map) plugin.

Instead of `cy.find` element looking for the `class="new"` elements inside the `LI` elements and returning them, we need to filter the _existing_ `LI` elements and return just a subset of them.

```js
cy.get('#fruits li')
  .filter(':has(.new)')
  // check the labels by looking at the text content
  // of the "class=name" elements.
  // Now using the "cy.find" command makes sense
  .find('.name')
  .should('read', ['Pears', 'Grapes'])
```

😊 Fun exercise: pick all fruit names that are followed by the "class=new" element. We can achieve it using a single selector with `:has` and `+` pseudo-selectors.

```js
cy.get('#fruits li .name:has(+ .new)').should('read', [
  'Pears',
  'Grapes',
])
```

<!-- fiddle-end -->
