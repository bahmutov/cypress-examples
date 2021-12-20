# `cy.each` examples

## Collect items text

<!-- fiddle .each / collect items text -->

Let's say we have a list of items

```html
<ul>
  <li>Apples</li>
  <li>Bananas</li>
  <li>Grapes</li>
</ul>
```

Let's put all list items into a list and check it.

```js
const list = []
cy.get('li')
  .each(($li) => {
    list.push($li.text())
  })
  .then(() => {
    // by the time ".each" is finished
    // the list is populated
    expect(list).to.deep.equal(['Apples', 'Bananas', 'Grapes'])
  })
```

<!-- fiddle-end -->

## Count items with matching text

<!-- fiddle .each / count items by text -->

If we have a list of items and want to count how many times the word "Apples" is in it

```html
<ul>
  <li>Apples</li>
  <li>Bananas</li>
  <li>Grapes</li>
  <li>Apples</li>
  <li>Apples</li>
  <li>Kiwi</li>
</ul>
```

We should keep the count variable outside the `.each` callback and use `.then` to compare it to the expected value.

```js
let count = 0
cy.get('li')
  .each(($li) => {
    if ($li.text() === 'Apples') {
      count += 1
    }
  })
  .then(() => {
    // by the time ".each" is finished, the count has been updated
    expect(count, 'Apples count').to.equal(3)
  })
```

We can also use the built-in jQuery `:contains(text)` selector

```js
cy.get('li:contains("Apples")').should('have.length', 3)
```

<!-- fiddle-end -->

## Stop `cy.each` iteration

The original [issue #8652](https://github.com/cypress-io/cypress/issues/8652)

<!-- fiddle .each / stop iteration by returning false -->

Let's take the list of fruits again

```html
<ul>
  <li>Apples</li>
  <li>Bananas</li>
  <li>Grapes</li>
</ul>
```

Let's print each item and then check that we have called `console.log` three times.

```js
// iterate through all fruits
cy.spy(console, 'log').as('console')
cy.get('li').each(($el) => {
  console.log($el.text())
  // prints "Apples", "Bananas", "Grapes"
})
cy.get('@console')
  .should('have.been.calledThrice')
  // reset the console.log stub
  .invoke('resetHistory')

// iterate over fruits, but stop when reach Bananas
cy.get('li').each(($el) => {
  if ($el.text() === 'Bananas') {
    // stop iteration
    return false
  }
  console.log($el.text())
  // prints "Apples"
})
cy.get('@console')
  .should('have.been.calledOnce')
  .invoke('resetHistory')

cy.takeRunnerPic('each-example')
```

<!-- fiddle-end -->

![Each example test](./pics/each-example.png)

## How to read values from elements using `.each`?

<!-- fiddle .each / read numbers from elements -->

```html
<ul>
  <li>10</li>
  <li>5</li>
  <li>6</li>
</ul>
```

```js
const list = []
cy.get('li')
  .each(($li) => {
    list.push(parseInt($li.text()))
  })
  // by the time ".each" is finished
  // the list should have 3 numbers, let's grab it
  .wrap(list)
  .should('deep.equal', [10, 5, 6])
```

<!-- fiddle-end -->

<!-- fiddle .each / read numbers using a custom command -->

```html
<ul>
  <li>10</li>
  <li>5</li>
  <li>6</li>
</ul>
```

**alternative:** using a custom command

```js
// let's make a custom command to read the values from the list
Cypress.Commands.add('grabList', (selector) => {
  const grabbedList = []
  cy.log(`grabList **${selector}**`)
  cy.get(selector)
    .each(($li) => {
      // let's not even parse anything
      grabbedList.push($li.text())
    })
    // yield the grabbed list using either wrap or then
    .then(() => grabbedList)
})
cy.grabList('li')
  .should('deep.equal', ['10', '5', '6'])
  // let's convert it
  .then((list) => list.map((x) => parseInt(x)))
  .should('deep.equal', [10, 5, 6])

cy.takeRunnerPic('each-list')
```

<!-- fiddle-end -->

![Each example test](./pics/each-list.png)
