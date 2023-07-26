# Iterate Over Elements

There are lots of ways to iterate over page elements using the built-in Cypress commands or [cypress-map](https://github.com/bahmutov/cypress-map) queries.

## using [cy.each](https://on.cypress.io/each)

<!-- fiddle jQuery cy.each callback has jQuery objects -->

```html
<ul id="fruits">
  <li>Kiwi</li>
  <li>Grapes</li>
</ul>
```

```js
cy.get('#fruits li').each(($el) => {
  expect($el, 'is jQuery').to.satisfy(Cypress.dom.isJquery)
  expect($el, 'is not a DOM element').to.not.satisfy(
    Cypress._.isElement,
  )
})
```

<!-- fiddle-end -->

Unfortunately, `cy.each` does not change the current subject, so we cannot easily extract data from multiple elements.

## using $.each

<!-- fiddle jQuery $.each callback has DOM elements -->

```html
<ul id="fruits">
  <li>Kiwi</li>
  <li>Grapes</li>
</ul>
```

```js
cy.get('#fruits li').then(($el) => {
  $el.each((k, el) => {
    expect(el, 'is DOM element').to.satisfy(Cypress._.isElement)
  })
})
```

<!-- fiddle-end -->

## using cy.map

Let's bring the [cypress-map](https://github.com/bahmutov/cypress-map) queries.

<!-- fiddle cypress-map / cy.map callback has DOM elements -->

```html
<ul id="fruits">
  <li>Kiwi</li>
  <li>Grapes</li>
</ul>
```

```js
cy.get('#fruits li')
  // current subject is jQuery<Element> object
  .map((el) => {
    expect(el, 'is DOM element').to.satisfy(Cypress._.isElement)
    return el
  })
  // the mapped result is an array of elements
  .should('be.an', 'Array')
```

<!-- fiddle-end -->

If we need to get something specific from the elements, we need to use DOM element methods.

<!-- fiddle cypress-map / cy.map can access the DOM element properties and methods -->

```html
<ul id="fruits">
  <li data-product-id="kiwi">Kiwi</li>
  <li data-product-id="grape">Grapes</li>
</ul>
```

```js
cy.get('#fruits li')
  .map((el) => {
    return el.dataset.productId
  })
  .should('deep.equal', ['kiwi', 'grape'])
```

**Tip:** you can achieve the same result by using the built-in deep property shortcut in `cy.map`

```js
cy.get('#fruits li')
  .map('dataset.productId')
  .should('deep.equal', ['kiwi', 'grape'])
```

<!-- fiddle-end -->

## using cy.mapInvoke

<!-- fiddle cypress-map / cy.map calls DOM methods -->

```html
<ul id="fruits">
  <li data-product-id="kiwi">Kiwi</li>
  <li data-product-id="grape">Grapes</li>
</ul>
```

```js
cy.get('#fruits li')
  .map((el) => {
    return el.getAttribute('data-product-id')
  })
  .should('deep.equal', ['kiwi', 'grape'])
```

<!-- fiddle-end -->

The same "invoke" method on each DOM element can be done using `cy.mapInvoke`

<!-- fiddle cypress-map / cy.mapInvoke calls DOM methods -->

```html
<ul id="fruits">
  <li data-product-id="kiwi">Kiwi</li>
  <li data-product-id="grape">Grapes</li>
</ul>
```

```js
cy.get('#fruits li')
  .mapInvoke('getAttribute', 'data-product-id')
  .should('deep.equal', ['kiwi', 'grape'])
```

<!-- fiddle-end -->

We can even wrap each DOM element using jQuery to be able to its methods, if you _really_ want to.

<!-- fiddle cypress-map / cy.map to jQuery methods -->

```html
<ul id="fruits">
  <li data-product-id="kiwi">Kiwi</li>
  <li data-product-id="grape">Grapes</li>
</ul>
```

```js
cy.get('#fruits li')
  .map((el) => {
    return Cypress.$(el).attr('data-product-id')
  })
  .should('deep.equal', ['kiwi', 'grape'])
```

<!-- fiddle-end -->

Finally, let's take the elements, make a jQuery from each one -> we get an array of jQuery objects, each with one element. Then we can use `cy.mapInvoke` to call the jQuery method `attr` on each jQuery object.

<!-- fiddle cypress-map / cy.map to jQuery array to cy.mapInvoke -->

```html
<ul id="fruits">
  <li data-product-id="kiwi">Kiwi</li>
  <li data-product-id="grape">Grapes</li>
</ul>
```

```js
cy.get('#fruits li')
  .map(Cypress.$)
  .should('be.an', 'Array')
  .mapInvoke('attr', 'data-product-id')
  .should('deep.equal', ['kiwi', 'grape'])
```

<!-- fiddle-end -->
