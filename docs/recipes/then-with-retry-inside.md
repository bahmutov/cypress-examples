# cy.then Callback With Retries Inside

The [cy.then](https://on.cypress.io/then) command does not retry its callback function, but the code inside the callback can still use normal Cypress commands with retries. Here is an example.

<!-- fiddle Cy.then with retries callback -->

```css hide
button.initial {
  color: orange;
  background-color: green;
}
```

```html hide
<button id="clickme" class="initial">Click me</button>
<script>
  const btn = document.getElementById('clickme')
  btn.addEventListener('click', () => {
    setTimeout(() => {
      btn.className = ''
    }, 1700)
  })
</script>
```

Let's confirm that clicking on the button removes the initial class names.

```js
cy.get('button#clickme').then(($btn) => {
  // get the class names once
  const classes = $btn.attr('class')
  cy.wrap($btn)
    .click()
    // the assertion will retry until the application code
    // removes the class names
    .should('not.have.class', classes)
})
```

<!-- fiddle-end -->

## Refactored test 1

We can refactor the test a little to get the button inside the `cy.then` callback and pass the initial class names.

<!-- fiddle Cy.then with retries callback refactored 1 -->

```css hide
button.initial {
  color: orange;
  background-color: green;
}
```

```html hide
<button id="clickme" class="initial">Click me</button>
<script>
  const btn = document.getElementById('clickme')
  btn.addEventListener('click', () => {
    setTimeout(() => {
      btn.className = ''
    }, 1700)
  })
</script>
```

```js
cy.get('button#clickme')
  .invoke('attr', 'class')
  // this way the class name is written to the Command Log
  .should('be.a', 'string')
  .then((classes) => {
    cy.get('button#clickme')
      .click()
      .should('not.have.class', classes)
  })
```

<!-- fiddle-end -->

## Refactored test 2

I would try to make the test "know" the class name that should not be present after the click. Then the same test can written very shortly.

<!-- fiddle Cy.then with retries callback refactored 2 -->

```css hide
button.initial {
  color: orange;
  background-color: green;
}
```

```html hide
<button id="clickme" class="initial">Click me</button>
<script>
  const btn = document.getElementById('clickme')
  btn.addEventListener('click', () => {
    setTimeout(() => {
      btn.className = ''
    }, 1700)
  })
</script>
```

```js
cy.get('button#clickme')
  .should('have.class', 'initial')
  .click()
  .should('not.have.class', 'initial')
```

<!-- fiddle-end -->
