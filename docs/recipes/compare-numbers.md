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
