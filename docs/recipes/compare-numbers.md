# Compare numbers

Let's compare two numbers on the page. We need to grab the text of each element, convert the text to a number, and compare them.

<!-- fiddle Compare numbers -->

```html
<p>
  During the tournament, the player A got
  <span class="score">60</span> points, while the player B got
  <span class="score">81</span> points.
</p>
<style>
  .score {
    font-weight: 700;
  }
</style>
```

```js
cy.get('.score')
  .first()
  .invoke('text')
  .then(parseInt)
  // anything we extract from the page
  // should be used in cy.then(callback)
  .then((scoreA) => {
    cy.get('.score')
      .eq(1)
      .invoke('text')
      .then(parseInt)
      // the second score from the page
      // is passed to cy.then(callback)
      .then((scoreB) => {
        // now both scoreA and scoreB are in scope
        // and can be compared using an assertion
        expect(scoreA, 'player B wins').to.be.lessThan(scoreB)
      })
  })
```

Watch video [Compare Two Scores](https://youtu.be/wGeoWxBq3P4).

<!-- fiddle-end -->

## Avoid pyramid of callbacks

If you need to extract multiple values from the page, you soon run into a "pyramid of Doom" of nested `cy.then(() => ...)` callbacks. You can avoid the pyramid by saving the extracted values using `cy.as` aliases, and then using a single `cy.then(function () { ... })` callback. In the callback function, each alias is available under `this.name` property.

The same example above can be rewritten as:

<!-- fiddle Compare multiple numbers -->

```html
<p>
  During the tournament, the player A got
  <span class="score">60</span> points, while the player B got
  <span class="score">81</span> points.
</p>
<style>
  .score {
    font-weight: 700;
  }
</style>
```

```js
// get the first score
cy.get('.score')
  .first()
  .invoke('text')
  .then(parseInt)
  .as('scoreA')
```

We can start another chain of commands to get the second value

```js
// get the second score
cy.get('.score').eq(1).invoke('text').then(parseInt).as('scoreB')
```

Let's compare both values. We can use [cy.then](https://on.cypress.io/then) command with a `function () { ... }` callback (do not use `() => ...` syntax!)

```js
cy.then(function () {
  expect(this.scoreA, 'compare scores').to.be.below(this.scoreB)
})
```

<!-- fiddle-end -->

Instead of the pyramid of callbacks, each data value is grabbed using a single flat chain with at most one `cy.then(callback)` nesting level.

Watch this example in the video [Flatten Cypress Pyramid Of Callbacks Using Aliases](https://youtu.be/0kl1GjchqQc).

## See also

- [Compare attribute](./compare-attribute.md)
