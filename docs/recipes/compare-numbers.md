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

## Check the numbers are ready to be compared

What if the page is loading the numbers? At first, each score is showing the text "loading..." - we cannot use `parseInt` until the element has the text matching a number regular expression. No worries, thanks to the built-in [retry-ability](https://on.cypress.io/retry-ability), Cypress will retry getting the text from the element until the assertion `.invoke('text').should('match', /^\d+$/)` passes, and the number can really be converted to an integer.

<!-- fiddle Check the numbers are ready -->

```html hide
<p>
  During the tournament, the player A got
  <span class="score" id="first-score">loading...</span> points,
  while the player B got
  <span class="score" id="second-score">loading...</span> points.
</p>
<style>
  .score {
    font-weight: 700;
  }
</style>
<script>
  setTimeout(() => {
    document.getElementById('first-score').innerText = 60
  }, 350)
  setTimeout(() => {
    document.getElementById('second-score').innerText = 81
  }, 750)
</script>
```

Get the first score from the DOM element when it shows a number

```js
cy.get('.score')
  .first()
  .invoke('text')
  // it is a number
  .should('match', /^\d+$/)
  .then(parseInt)
  .as('scoreA')
```

Get the second score from the DOM element when it shows a number

```js
cy.get('.score')
  .eq(1)
  .invoke('text')
  // it is a number
  .should('match', /^\d+$/)
  .then(parseInt)
  .as('scoreB')
```

Let's compare the numbers stored as aliases.

```js
cy.then(function () {
  expect(this.scoreA, 'compare scores').to.be.below(this.scoreB)
})
```

<!-- fiddle-end -->

## The entire element is replaced

We should be careful when checking an element - maybe the entire part of the page is replaced and our DOM reference is stale and detached from the DOM. Then we will never "see" the text "loading..." changing into a number, as the example below shows. The entire `<P>` element has its inner HTML replaced with new children elements. We should query from the top of the page and avoid keeping any inner element references.

<!-- fiddle The element is replaced on load -->

```html hide
<p id="scores">
  During the tournament, the player A got
  <span class="score">loading...</span> points, while the player
  B got <span class="score">loading...</span> points.
</p>
<style>
  .score {
    font-weight: 700;
  }
</style>
<script>
  setTimeout(() => {
    document.getElementById('scores').innerHTML = `
      During the tournament, the player A got
      <span class="score">60</span> points,
      while the player B got
      <span class="score">81</span> points.
    `
  }, 600)
</script>
```

Keep querying the top-level page until the first score shows a number. Even if the entire paragraph `<P>` is replaced, the `cy.get` will retry and retry until its assertion callback passes.

```js skip
cy.get('.score:first')
  .should(($el) => {
    expect($el.text()).to.match(/^\d+$/)
  })
  .invoke('text')
  .then(parseInt)
  .as('scoreA')
```

**Tip:** the jQuery `:first` selector gives us the first score element.

An even shorter version uses the [cy.contains](https://on.cypress.io/contains) command with a regular expression argument.

```js
cy.contains('.score', /^\d+$/)
  .invoke('text')
  .then(parseInt)
  .as('scoreA')
```

Get the second score from the DOM element and it should already be a number.

```js
cy.get('.score').eq(1).invoke('text').then(parseInt).as('scoreB')
```

Let's compare the numbers stored as aliases.

```js
cy.then(function () {
  expect(this.scoreA, 'compare scores').to.be.below(this.scoreB)
})
```

<!-- fiddle-end -->

## See also

- [Compare attribute](./compare-attribute.md)
