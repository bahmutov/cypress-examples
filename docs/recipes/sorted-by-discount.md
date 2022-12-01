# Sorted by discount price

<!-- fiddle Prices are sorted -->

```css hide
.price {
  font-weight: bolder;
}
.price .old-price {
  font-weight: 100;
  text-decoration: line-through;
}
```

Notice that some entries in the list have two prices. We want to ignore the old price, and take the current discounted price when checking the sorted list.

```html
<ol id="fruits">
  <li>Oranges <span class="price">$0.99</span></li>
  <li>Mango <span class="price">$1.01</span></li>
  <li>
    Tomatoes
    <span class="price"
      ><span class="old-price">$2.70</span>
      <span>$2.19</span></span
    >
  </li>
  <li>
    Potatoes
    <span class="price"
      ><span class="old-price">$3.00</span>
      <span>$2.50</span></span
    >
  </li>
  <li>Bananas <span class="price">$2.99</span></li>
</ol>
```

Let's first write two small functions for converting text like `$1.99` into a float, and another function to convert an array of prices into an array of floats.

```js
function convertPrice(s) {
  return parseFloat(s.replace('$', ''))
}
function convertPrices(list) {
  return list.map(convertPrice)
}
```

Let's iterate over the entire list of DOM elements. For each price element, if there is an old price inside - remove it. Take the remaining text and confirm the prices are sorted.

```js
cy.get('#fruits li .price')
  .should('have.length.greaterThan', 2)
  .then(($prices) => {
    // if there is an old price, remove it
    // and take the remaining text
    return Cypress._.map($prices, (priceElement) => {
      // don't forget to clone the element before removing
      // the old price to avoid changing the page!
      const $price = Cypress.$(priceElement).clone()
      $price.find('.old-price').remove()
      return $price.text().trim()
    })
  })
  .then(console.log)
  .then(convertPrices)
  .then(console.log)
  .should('be.sorted')
```

**Bonus:** if you can remove the elements with old prices, the test would be simpler:

```js skip
cy.get('#fruits li .price .old-price')
  .should('have.length', 2)
  .invoke('remove')
cy.get('#fruits li .price')
  .then(($li) => Cypress._.map($li, 'innerText'))
  .then(convertPrices)
  .should('be.sorted')
```

<!-- fiddle-end -->

**Tip:** I used the [chai-sorted](https://www.chaijs.com/plugins/chai-sorted/) plugin to write a clear "be.sorted" assertion.

**Suggestion:** it is much better to have _positive_ labels on the elements you want to select, instead of removing elements that you do not want to have included.
