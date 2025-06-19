# Text changes

In this example, we want to confirm that the text on the page changes after the user clicks the button. We do not know the initial text, just know that is changes in response to the click.

## Simple solution

<!-- fiddle Text changes -->

```html
<div id="output">Original text</div>
<button id="change">Do it</button>
<script>
  document
    .getElementById('change')
    .addEventListener('click', () => {
      // change the text, but do it after a random delay,
      // almost like the application is loading something from the backend
      setTimeout(() => {
        document.getElementById('output').innerText = 'Changed!'
      }, 1000 + 1000 * Math.random())
    })
</script>
```

```js
cy.get('#output')
  .invoke('text')
  .then((text) => {
    cy.get('#change').click()
    cy.get('#output').should('not.have.text', text)
  })
```

<!-- fiddle-end -->

📺 Watch the explanation video [Confirm The Text On The Page Changes After A Click](https://youtu.be/BbxjeXmIUeo).

## Using a static alias

We can use an alias to store the original text. But there is a catch: make sure the alias is NOT evaluated later after the button click.

<!-- fiddle Text changes using a static alias -->

```html
<div id="output">Original text</div>
<button id="change">Do it</button>
<script>
  document
    .getElementById('change')
    .addEventListener('click', () => {
      // notice that in this example, the text changes right away
      document.getElementById('output').innerText = 'Changed!'
    })
</script>
```

The first solution will not work: the "originalText" alias will be re-evaluated during `cy.get('@originalText')` command execution. Because the text is likely to have changed by then, the alias resolved to "Changed!".

```js skip
// 🚨 WILL NOT WORK
cy.get('#output')
  .invoke('text')
  .as('originalText')
  .should('be.a', 'string')
cy.get('#change').click()
// the alias gets re-evaluated, and its value
// is the new text, leading to the failure
cy.get('@originalText').then((text) => {
  cy.get('#output').should('not.have.text', text)
})
```

To get around this problem, we can save the value just once using the `type: static` option of the [cy.as](https://on.cypress.io/as) command

```js
// ✅ correct solution
cy.get('#output')
  .invoke('text')
  // the text before the click
  // is stored in the alias and never changes
  .as('originalText', { type: 'static' })
cy.get('#change').click()
cy.get('@originalText').then((text) => {
  cy.get('#output').should('not.have.text', text)
})
```

<!-- fiddle-end -->

See also [Counter increments](./counter-increments.md)
