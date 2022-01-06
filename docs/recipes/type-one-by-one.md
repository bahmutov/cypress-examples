# Type Characters One By One

Imagine you have an input widget where the user can type the pin code one character at a time. For example, it could be a 2 factor authentication code.

<!-- fiddle Type 6 characters -->

```html
<div id="code">
  <!-- every character has its own input element -->
  <input id="code-1" type="text" size="1" maxlength="1" />
  <input id="code-2" type="text" size="1" maxlength="1" />
  <input id="code-3" type="text" size="1" maxlength="1" />
  <input id="code-4" type="text" size="1" maxlength="1" />
</div>
<style>
  input[type='text'] {
    width: 2em;
  }
</style>
```

```js
// the pin code we want to enter
const pin = 'A1B2'
for (let i = 0; i < pin.length; i++) {
  const char = pin.charAt(i)
  cy.get(`#code-${i + 1}`).type(char)
  cy.wait(200)
}
```

Alternative solution using `Array.forEach`

```js
pin.split('').forEach((char, k) => {
  cy.get(`#code-${k + 1}`)
    .type(char)
    .wait(200)
})
```

<!-- fiddle.end -->
