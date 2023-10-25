# Use cy.within To Limit The DOM Search

📺 Watch this recipe explained in the video [Find The Right Item Using The cy.within Command Or The Parent Selector](https://youtu.be/YpbkEBE42QI).

<!-- fiddle Limit the DOM search -->

Notice that we have the same item "Apples" in both lists. How do we confirm the "Apples" in the second list of all products?

```html
<ul id="recent-items">
  <h2>Recent items</h2>
  <li data-purchase-id="81777">Apples</li>
  <li data-purchase-id="61101">Pears</li>
</ul>
<ul id="items">
  <h2>All products</h2>
  <li data-product-id="190" data-price="299">Apples</li>
  <li data-product-id="871" data-price="390">Bananas</li>
  <li data-product-id="253" data-price="159">Kiwi</li>
  <li data-product-id="809" data-price="249">Pears</li>
</ul>
```

We can limit the search using the [cy.within](https://on.cypress.io/within) command

```js
cy.get('#items').within(() => {
  // there should be several items
  cy.get('li').should('have.length.above', 0)
  // find the product we are looking for
  cy.contains('li', 'Apples')
    // and confirm its "data" attributes
    .should('have.attr', 'data-product-id', '190')
    .and('have.attr', 'data-price', '299')
})
```

**Tip:** you can confirm multiple `data-` attributes by using the DOM element property (see the recipe [Dataset HTML attributes](./dataset.md))

```js
cy.contains('#items li', 'Apples')
  // yields "DOMStringMap" object
  .should('have.prop', 'dataset')
  // which we can convert into an object
  .then(JSON.stringify)
  .then(JSON.parse)
  // and compare as plain object
  .should('deep.equal', {
    productId: '190',
    price: '299',
  })
```

**Note:** child command `cy.then` does not retry. Thus if the element has dynamic attributes that load later, you might want to use the query `toPlainObject` from [cypress-map](https://github.com/bahmutov/cypress-map) to make the entire chain retry-able.

```js
// preserve the entire retry-able chain of queries
cy.contains('#items li', 'Apples') // query
  .invoke('prop', 'dataset') // query
  .toPlainObject() // query
  .should('deep.equal', {
    productId: '190',
    price: '299',
  })
```

<!-- fiddle-end -->
