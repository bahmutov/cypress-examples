# Retry-ability

For more information see [Cypress retry-ability guide](https://on.cypress.io/retry-ability).

## Element added to the DOM

Let's test a situation where the application inserts a new element to the DOM

<!-- fiddle Retry-ability / element added to the DOM -->

```html
<div id="app-example"></div>
<script>
  setTimeout(() => {
    document.getElementById('app-example').innerHTML =
      '<div id="added">Hello</div>'
  }, 2000)
</script>
```

Because Cypress querying commands have the built-in existence check, all we need to do is to ask:

```js
// cy.get will retry until it finds at least one element
// matching the selector
cy.get('#added')
```

<!-- fiddle-end -->

## Element becomes visible

If an element is already hidden in the DOM and becomes visible, we can retry finding the element by adding a visibility assertion

<!-- fiddle Retry-ability / element becomes visible -->

```html
<div id="app-example">
  <div id="loader" style="display:none">Loaded</div>
</div>
<script>
  setTimeout(() => {
    document.getElementById('loader').style.display = 'block'
  }, 2000)
</script>
```

Because Cypress querying commands have the built-in existence check, all we need to do is to ask:

```js
// the cy.get command retries until it finds at least one visible element
// matching the selector
cy.get('#loader').should('be.visible')
```

<!-- fiddle-end -->

## Element becomes visible using jQuery :visible selector

You can optimize checking if an element is visible by using the jQuery `:visible` selector

<!-- fiddle Retry-ability / check if an element is visible -->

```html
<div id="app-example">
  <div id="loader" style="display:none">Loaded</div>
</div>
<script>
  setTimeout(() => {
    document.getElementById('loader').style.display = 'block'
  }, 2000)
</script>
```

```js
// cy.get has a built-in existence assertion
cy.get('#loader:visible').should('have.text', 'Loaded')
// or use a single cy.contains command
cy.contains('#loader:visible', 'Loaded')
```

<!-- fiddle-end -->

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
