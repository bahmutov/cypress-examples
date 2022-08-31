# Input has value

<!-- fiddle Input element has some value -->

```html
<input id="greeting" type="text" value="hello" />
<input id="empty" type="text" />
<!-- this input is filled 1 second after the start -->
<input id="dynamic" type="text" />
```

```html hide
<script>
  setTimeout(() => {
    document.getElementById('dynamic').value = 'present'
  }, 1000)
</script>
```

```css hide
input {
  display: block;
}
```

To confirm the input element has some value, we should first grab the value as a `prop` using `have.prop` assertion. This assertion yields the value of the property, and we can chain another assertion to confirm it.

```js
// confirm the input has some value
cy.get('#greeting')
  .should('have.prop', 'value')
  // yields "hello"
  .should('not.be.empty')
// confirm the second input has an empty value
cy.get('#empty')
  .should('have.prop', 'value')
  // yields ""
  .should('be.empty')
// confirm dynamic input gets its value
// after some delay using command retries
cy.get('#dynamic')
  .should('have.prop', 'value')
  // yields "" at first, then yields "present"
  // after the application sets it
  .should('not.be.empty')
```

<!-- fiddle-end -->
