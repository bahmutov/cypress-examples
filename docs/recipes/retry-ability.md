# Retry-ability

For more information see [Cypress retry-ability guide](https://on.cypress.io/retry-ability).

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
