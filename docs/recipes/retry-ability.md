# Retry-ability

For more information see [Cypress retry-ability guide](https://on.cypress.io/retry-ability).

## Multiple assertions

<!-- fiddle Retry-ability / text appears and becomes red -->

```html
<div id="example"></div>
<script>
  setTimeout(() => {
    document.getElementById('example').innerHTML = `
    <button id="inner">Submit</button>
  `
  }, 2000)
  setTimeout(() => {
    document
      .getElementById('inner')
      .setAttribute('style', 'color: red')
  }, 3000)
</script>
```

```js
cy.get('#inner')
  // automatically waits for the button with text "Submit" to appear
  .should('have.text', 'Submit')
  // retries getting the element with ID "inner"
  // until finds one with the red CSS color
  .and('have.css', 'color', 'rgb(255, 0, 0)')
  .click()
```

<!-- fiddle-end -->

## Counts retries

One can even count how many times the command and assertion were retried by providing a dummy `.should(cb)` function. A similar approach was described in the blog post [When Can The Test Click?](https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/).

<!-- fiddle Retry-ability / count retries -->

```html
<div id="red-example">Will turn red</div>
<script>
  setTimeout(() => {
    document
      .getElementById('red-example')
      .setAttribute('style', 'color: red')
  }, 800)
</script>
```

```js
let count = 0
cy.get('#red-example')
  .should(() => {
    // this assertion callback only
    // increments the number of times
    // the command and assertions were retried
    count += 1
  })
  .and('have.css', 'color', 'rgb(255, 0, 0)')
  .then(() => {
    cy.log(`retried **${count}** times`)
  })
```

<!-- fiddle-end -->

## Merging queries

Instead of splitting querying commands like `cy.get(...).first()` use a single `cy.get` with a combined CSS querty using the `:first` selector.

<!-- fiddle Retry-ability / merging queries -->

```html
<ul id="items">
  <li>Apples</li>
</ul>
<script>
  setTimeout(() => {
    // notice that we re-render the entire list
    // and insert the item at the first position
    document.getElementById('items').innerHTML = `
      <li>Grapes</li>
      <li>Apples</li>
    `
  }, 2000)
</script>
```

How do we confirm that the first element in the list is "Grapes"? By using a single `cy.get` command.

```js
cy.get('#items li:first').should('have.text', 'Grapes')
// equivalent
cy.contains('#items li:first', 'Grapes')
```

<!-- fiddle-end -->

## Using aliases

You can split the Cypress commands if you use an element alias with the [cy.as](https://on.cypress.io/as) command. Cypress should re-query the entire chain, skipping the non-query commands if it notices the aliased element has been detached from the DOM.

<!-- fiddle Retry-ability / using aliases -->

```html
<div id="chain-example">
  <ul id="items">
    <li>Oranges</li>
  </ul>
</div>
<script>
  setTimeout(function () {
    // notice that we re-render the entire list
    // and insert the item at the first position
    document.getElementById('chain-example').innerHTML = `
      <ul id="items">
        <li>Grapes</li>
        <li>Apples</li>
      </ul>
    `
  }, 2000)
</script>
```

```js
// notice how we create an alias to the element we want to check
// The entire chain of commands uses 4 different commands
cy.get('#chain-example')
  .find('#items')
  .find('li')
  .first()
  .as('firstItem')
// when using the alias, if the element is detached from DOM
// the entire chain is recomputed (but non-querying commands are skipped)
cy.get('@firstItem').should('have.text', 'Grapes')
```

<!-- fiddle-end -->
