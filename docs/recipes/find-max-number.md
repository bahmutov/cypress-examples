# Find the max number

If a `cy.then(callback)` yields an element, Cypress automatically wraps it allowing to chain assertions and additional commands. For example, let's find the element with the longest distance in the following list. We need to parse each element's text, extract the distance, convert to a number, then find the element with the maximum number. **Tip:** we can use the [Lodash methods](https://lodash.com/docs) to work with jQuery objects, as if they were arrays of DOM elements.

<!-- fiddle Find the longest route -->

You can watch the explanation for this recipe in the video [Find The DOM Element With The Max Number Using Lodash maxBy Function](https://youtu.be/jBVeLoD8A-g),

```html
<ul>
  <li class="route">A to B, 10 km</li>
  <li class="route">A to C, 20 km</li>
  <li class="route longest">F to K, 42 km</li>
  <li class="route">A to Z, 15 km</li>
  <li class="route shortest">C to D, 2 km</li>
</ul>
```

```css hide
.route.longest::after {
  content: '🚂';
  margin-left: 1rem;
}
.route.shortest::after {
  content: '🚶';
  margin-left: 1rem;
}
```

Let's find the longest trip by distance. First, I will create a small utility function for extracting distance from the given DOM element.

```js
function getDistance(element) {
  const text = element.innerText
  const matched = text.match(/(?<distance>\d+\skm)/)
  const distanceText = Cypress._.get(matched, 'groups.distance')
  if (!distanceText) {
    return NaN
  }
  return parseInt(distanceText.split(' ')[0])
}
```

Now we can use the above utility to find the DOM element with the max distance `Cypress._.maxBy($list, getDistance)`.

```js
cy.get('.route')
  .should('not.be.empty')
  .then(($list) => {
    const maxEl = Cypress._.maxBy($list, getDistance)
    if (!maxEl) {
      throw new Error(
        'Could not find element with longest distance km',
      )
    }
    return maxEl
  })
  // Cypress wraps the yielded DOM element
  // thus we can directly attach our assertions
  .should('have.class', 'longest')
```

Similarly, we can find the shortest the element showing the shortest trip using `_.minBy` Lodash function.

```js
cy.get('.route')
  .should('not.be.empty')
  .then(($list) => {
    const maxEl = Cypress._.minBy($list, getDistance)
    if (!maxEl) {
      throw new Error(
        'Could not find element with shortest distance km',
      )
    }
    return maxEl
  })
  .should('have.class', 'shortest')
```

<!-- fiddle-end -->
