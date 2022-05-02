# Retry-ability

For more information see [Cypress retry-ability guide](https://on.cypress.io/retry-ability).

## Matching element's text

Imagine the element changes its text after two seconds. We can chain [cy.get](https://on.cypress.io/get) and [cy.invoke](https://on.cypress.io/invoke) commands to get the text and then use the `match` assertion to compare the text against a regular expression.

<!-- fiddle Retry-ability / matching element's text using regular assertion -->

```html
<div id="example">loading...</div>
<script>
  setTimeout(() => {
    document.getElementById('example').innerText = 'Ready'
  }, 2000)
</script>
```

Notice that `.invoke('text')` can be safely retried until the assertion passes or times out.

```js
cy.get('#example')
  .invoke('text')
  .should('match', /(Ready|Started)/)
```

Rather than splitting `cy.get` + `cy.invoke` commands, let's have a single command to find the element and match its text using the [cy.contains](https://on.cypress.io/contains) command.

```js
// equivalent assertion using cy.contains
// https://on.cypress.io/contains
cy.contains('#example', /(Ready|Started)/)
```

<!-- fiddle-end -->

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

## Query the element again

<!-- fiddle Retry-ability / query the element again -->

```html
<div id="cart">
  <div>Apples <input type="text" value="10" /></div>
  <div>Pears <input type="text" value="6" /></div>
  <div>Grapes <input type="text" value="5" /></div>
</div>
```

```js skip
cy.get('#cart input') // query command
  .eq(2) // query command
  .clear() // action command
  .type('20') // action command
```

The above test is ok, but if you find it to be flaky, add more assertions and query the element again to ensure you find it even if it re-rendered on the page.

```js
// merge the cy.get + cy.eq into a single query
const selector = '#cart input:nth(2)'
cy.get(selector).clear()
// query the input again to make sure has been cleared
cy.get(selector).should('have.value', '')
// type the new value and check
cy.get(selector).type('20')
cy.get(selector).should('have.value', '20')
```

<!-- fiddle-end -->

Watch the explanation for the above test refactoring in my video [Query Elements With Retry-Ability To Avoid Flake](https://youtu.be/deNl1q1el0E).

## Using aliases

You can split the Cypress commands if you use an element alias with the [cy.as](https://on.cypress.io/as) command. Cypress should re-query the entire chain, skipping the non-query commands if it notices the aliased element has been detached from the DOM.

<!-- fiddle Retry-ability / using aliases -->

```html
<div id="chain-example">
  <ul id="items">
    <li>Oranges</li>
    <li>Bananas</li>
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

The following code DOES NOT work. It only retries the last command plus assertion `.first().should('have.text', 'Grapes')`. The element becomes detached from DOM when the application overwrites the entire list, and Cypress throws an error.

```
// DOES NOT WORK, just for demo
cy.get('#chain-example')
  .find('#items')
  .find('li')
  .should('have.length', 2)
  .first()
  .should('have.text', 'Grapes')
```

We need retry the entire chain of commands from the root `cy.get` command. When the application overwrites the elements, we will re-run the `cy.get` fetching the fresh parent element. We can achieve this by storing the querying chain as an alias. Cypress retries the entire chain if the aliased element becomes detached.

```js
// notice how we create an alias to the element we want to check
// The entire chain of commands uses 4 different commands
cy.get('#chain-example')
  .find('#items')
  .find('li')
  .should('have.length', 2)
  .first()
  .as('firstItem')
// when using the alias, if the element is detached from DOM
// the entire chain is recomputed (but non-querying commands are skipped)
cy.get('@firstItem').should('have.text', 'Grapes')
```

<!-- fiddle-end -->

You can find the above example explained in the video [Use Cypress Element Alias To Avoid The Element Detached From DOM Error](https://youtu.be/VPznmFpa1Jc).
