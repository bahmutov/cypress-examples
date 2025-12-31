# Check If Star Ratings Are Sorted

Imagine we show a list of product or reviews, and the list should be sorted. To check the sorted list I recommend using [chai-sorted](https://www.chaijs.com/plugins/chai-sorted/) assertions, but you need to extract the list of numbers first. How you get the list of numbers depends on how the ratings are shown. In this recipe, I will show 3 different possible cases: text rating, `data-` attribute, and the number of displayed star child elements. To simplify Cypress code, I will use [cypress-map](https://github.com/bahmutov/cypress-map) query commands.

📺 You can watch this recipe explained in the video [Check If Star Ratings Are Sorted](https://youtu.be/3sSac7S0rdw).

## Ratings text

<!-- fiddle Sorted text ratings -->

```html
<ol id="ratings">
  <li>5.0 ⭐️</li>
  <li>4.5 ⭐️</li>
  <li>3.0 ⭐️</li>
  <li>2.5 ⭐️</li>
</ol>
```

```js
cy.get('#ratings li')
  .map('innerText')
  // extract the ratings text
  // by splitting the text
  // and taking the first item in each array
  .mapInvoke('split', ' ')
  .map(0)
  // convert strings to numbers
  .map(parseFloat)
  .should('be.descending')
```

<!-- fiddle-end -->

## Ratings data- attribute

Instead of the text, each rated item has a `data-rating` attribute with the numeric value. We can either invoke the `getAttribute` method on each element, or get its `dataset` object, see [Dataset recipe](./dataset.md).

<!-- fiddle Sorted data-rating attributes -->

```html
<ol id="ratings">
  <li data-rating="5.0">5.0 ⭐️</li>
  <li data-rating="4.5">4.5 ⭐️</li>
  <li data-rating="3.0">3.0 ⭐️</li>
  <li data-rating="2.5">2.5 ⭐️</li>
</ol>
```

```js
cy.get('#ratings li')
  // extract the "data-rating" attributes
  .map('dataset.rating')
  .map(parseFloat)
  .should('be.descending')
```

<!-- fiddle-end -->

## Rating by counting child elements

Imagine the page shows the ratings by adding a variable number of "star" elements. In each list item, we need to count the star elements and then confirm the numbers are sorted in descending order.

<!-- fiddle Sorted numbers of child elements -->

```css
.star::before {
  content: '⭐️';
}
```

```html
<ol id="ratings">
  <li>
    <span class="star" /><span class="star" /><span
      class="star"
    /><span class="star" /><span class="star" />
  </li>
  <li>
    <span class="star" /><span class="star" /><span
      class="star"
    /><span class="star" />
  </li>
  <li>
    <span class="star" /><span class="star" /><span
      class="star"
    />
  </li>
  <li><span class="star" /><span class="star" /></li>
</ol>
```

```js
cy.get('#ratings li')
  // count the number of ".star" child elements
  // assuming each element has at least 1 star
  // using cy.mapChain from cypress-map lets us
  // yield a single number for each LI element
  .mapChain(($el) =>
    cy
      .wrap($el, { log: false })
      .find('.star', { log: false })
      .its('length', { log: false }),
  )
  .should('be.descending')
```

<!-- fiddle-end -->
