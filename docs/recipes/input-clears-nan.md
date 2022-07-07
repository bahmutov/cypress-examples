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

<!-- fiddle-end -->
