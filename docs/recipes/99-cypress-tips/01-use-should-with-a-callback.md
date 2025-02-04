# 01: Use Should With A Callback

These examples show the test behavior from the lesson "Use .should() with a callback" in the course [99 Cypress.io Tips](https://filiphric.com/course/99-cypress-tips).

## Separate queries

<!-- fiddle Separate queries -->

```html
<ul>
  <li data-cy="card-text">Milk</li>
  <li data-cy="card-text">Bread</li>
  <li data-cy="card-text">Juice</li>
</ul>
```

We can check each element's separately

```js
cy.get('[data-cy=card-text]').eq(0).should('have.text', 'Milk')
cy.get('[data-cy=card-text]').eq(1).should('have.text', 'Bread')
cy.get('[data-cy=card-text]').eq(2).should('have.text', 'Juice')
```

<!-- fiddle-end -->

## Combined cy.then callback

<!-- fiddle Combined cy.then callback -->

```html
<ul>
  <li data-cy="card-text">Milk</li>
  <li data-cy="card-text">Bread</li>
  <li data-cy="card-text">Juice</li>
</ul>
```

We can check every element inside the jQuery object inside the `cy.then` callback function using the [Chai-jQuery](https://www.chaijs.com/plugins/chai-jquery/) assertions like `expect ... to have text`.

```js
cy.get('[data-cy=card-text]').then(($cards) => {
  expect($cards[0]).to.have.text('Milk')
  expect($cards[1]).to.have.text('Bread')
  expect($cards[2]).to.have.text('Juice')
})
```

<!-- fiddle-end -->

## cy.then does not retry

What happens if the cards are loaded after a delay? If there are NO cards, then the `cy.get('[data-cy=card-text]')` retries until _at least one_ element is found. In our case, all 3 cards arrive at once.

<!-- fiddle 3 cards appear at once and cy.then works -->

```html
<ul id="list"></ul>
```

```js app
setTimeout(() => {
  document.getElementById('list').innerHTML = `
      <li data-cy="card-text">Milk</li>
      <li data-cy="card-text">Bread</li>
      <li data-cy="card-text">Juice</li>
    `
}, 1000)
```

```js
// the cy.get retries until at least one element is found
cy.get('[data-cy=card-text]')
  // the jQuery object is passed to "cy.then" callback
  .then(($cards) => {
    expect($cards[0]).to.have.text('Milk')
    expect($cards[1]).to.have.text('Bread')
    expect($cards[2]).to.have.text('Juice')
  })
```

<!-- fiddle-end -->

But what happens if the cards load one by one? What happens if the cards load their text dynamically? Let's find out. Remove the "skip" modifier from the next test.

<!-- fiddle.skip 3 cards appear one by one and cy.then fails -->

```html
<ul id="list"></ul>
```

```js app
// the cards are added one by one
// - after 1 second the first card appears
// - after another second the second card appears
// - after another second the third card appears
setTimeout(() => {
  document.getElementById('list').innerHTML = `
      <li data-cy="card-text">Milk</li>
    `
}, 1000)
setTimeout(() => {
  document.getElementById('list').innerHTML += `
      <li data-cy="card-text">Bread</li>
    `
}, 2000)
setTimeout(() => {
  document.getElementById('list').innerHTML += `
      <li data-cy="card-text">Juice</li>
    `
}, 3000)
```

```js
cy.get('[data-cy=card-text]').then(($cards) => {
  expect($cards[0]).to.have.text('Milk')
  expect($cards[1]).to.have.text('Bread')
  expect($cards[2]).to.have.text('Juice')
})
```

The test fails when it tries to check the `$cards[1]` which is undefined; only the first card element is present in the jQuery object `$cards`.

<!-- fiddle-end -->

## cy.should callback retries

Let's replace `cy.then(callback)` with `cy.should(callback)`. If the callback throws an error, Cypress retries the entire query chain before the `cy.should('callback)` and tries it again with the new jQuery object.

<!-- fiddle 3 cards appear one by one plus cy.should callback -->

```html
<ul id="list"></ul>
```

```js app
// the cards are added one by one
// - after 1 second the first card appears
// - after another second the second card appears
// - after another second the third card appears
setTimeout(() => {
  document.getElementById('list').innerHTML = `
      <li data-cy="card-text">Milk</li>
    `
}, 1000)
setTimeout(() => {
  document.getElementById('list').innerHTML += `
      <li data-cy="card-text">Bread</li>
    `
}, 2000)
setTimeout(() => {
  document.getElementById('list').innerHTML += `
      <li data-cy="card-text">Juice</li>
    `
}, 3000)
```

```js
cy.get('[data-cy=card-text]').should(($cards) => {
  expect($cards[0]).to.have.text('Milk')
  expect($cards[1]).to.have.text('Bread')
  expect($cards[2]).to.have.text('Juice')
})
```

The test finishes in 3 seconds, when the 3rd element is appended to the list and every assertion in the `cy.should(callback)` finishes.

<!-- fiddle-end -->

## Use better assertions

Instead of verbose `cy.should(callback)`, you can find better queries and assertions, like the ones provided by the plugin [cypress-map](https://github.com/bahmutov/cypress-map). For example, you can use the [Custom Cypress Should Read Assertion](https://glebbahmutov.com/blog/cypress-map-should-read-assertion/) to have an elegant and short test:

<!-- fiddle 3 cards appear one by one checked by "should read" assertion -->

```html
<ul id="list"></ul>
```

```js app
// the cards are added one by one
// - after 1 second the first card appears
// - after another second the second card appears
// - after another second the third card appears
setTimeout(() => {
  document.getElementById('list').innerHTML = `
      <li data-cy="card-text">Milk</li>
    `
}, 1000)
setTimeout(() => {
  document.getElementById('list').innerHTML += `
      <li data-cy="card-text">Bread</li>
    `
}, 2000)
setTimeout(() => {
  document.getElementById('list').innerHTML += `
      <li data-cy="card-text">Juice</li>
    `
}, 3000)
```

```js
// the assertion "should read" comes from cypress-map plugin
cy.get('[data-cy=card-text]').should('read', [
  'Milk',
  'Bread',
  'Juice',
])
```

<!-- fiddle-end -->
