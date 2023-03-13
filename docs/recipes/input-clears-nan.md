# Input Element Clears NaN Value

<!-- fiddle Input clears NaN value -->

```html
<input id="count" placeholder="Enter a number" />
<script>
  const el = document.getElementById('count')
  el.addEventListener('change', function () {
    const x = parseInt(el.value)
    if (isNaN(x)) {
      setTimeout(function () {
        el.value = ''
      }, 1000)
    }
  })
</script>
```

Let's confirm the input clears an invalid value after about one second.

```js
cy.get('#count')
  .type('Hello{enter}')
  // after 900ms the value is still "Hello"
  .wait(900)
  .should('have.value', 'Hello')
// the value is cleared in the next 200ms
cy.get('#count', { timeout: 200 })
  .should('have.value', '')
  // if we enter a valid number, it stays
  .type('123{enter}')
  .wait(1100)
  .should('have.value', '123')
```

Watch this recipe in the video [The Input Element Clears Invalid Values After 1 Second](https://youtu.be/IVoDbs7hraU).

We can also write this test without [cy.wait](https://on.cypress.io/wait) command. We can precisely control the application's clock using the [cy.clock](https://on.cypress.io/clock) and the [cy.tick](https://on.cypress.io/tick) commands.

```js
// freeze the application's clock
cy.clock()
cy.get('#count').clear().type('wrong{enter}')
// advance the clock instantly by 990ms
cy.tick(990)
// the wrong value still is present
cy.get('#count').should('have.value', 'wrong')
// cross the 1 second mark by advancing
// the application's clock another 20ms
cy.tick(20)
// and the input immediately is cleared
// since the application "thinks" that 1010ms have passed
cy.get('#count', { timeout: 0 }).should('have.value', '')
```

<!-- fiddle-end -->

## See also

- [Clear Input Field Flake](./clear-input-flake.md)
