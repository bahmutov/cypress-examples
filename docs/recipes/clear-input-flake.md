# Clear Input Field Flake

📺 Watch the explanation for this recipe at [Clear Input Element Flake](https://youtu.be/NO6Joky4hHE).

<!-- fiddle Clear input field -->

```html
<input id="answer" placeholder="Enter your answer" value="00" />
```

```html hide
<script>
  setTimeout(() => {
    const input = document.getElementById('answer')
    input.value = 777
  }, 1000)
</script>
```

At first, we try to clear the input field and type our value as quickly as we can.

```js skip
// 🚨 INCORRECT
// has race condition with the application
cy.get('#answer').clear().type(42).should('have.value', 42)
```

Instead we want to check if the application has finished setting its initial value.

```js
// ✅ CORRECT
// wait for the app to finish setting the initial value
// which is different from the static attribute
cy.get('#answer')
  .should('have.attr', 'value')
  .then((staticValue) => {
    cy.get('#answer')
      .invoke('val')
      .should('not.equal', staticValue)
  })
// now we can clear the input field safely
cy.get('#answer').clear().type(42).should('have.value', 42)
```

<!-- fiddle-end -->

## See also

- [Input Element Clears NaN Value](./input-clears-nan.md)
