# Validate An Email

📺 Watch this recipe explained in [Validate Email Format Using Built-in Browser Input Element](https://youtu.be/iRJJqijuFYI)

Using the browser's `input` DOM element we can validate a string to check if it is a valid email expression or not.

<!-- fiddle validate an email -->

```js
// create an input type email DOM element
// We can use jQuery to simplify the syntax
const input = Cypress.$('<input type="email">')[0]
input.value = 'gleb@acme.co'
expect(input.checkValidity(), 'first email is valid').to.be.true
input.value = 'gleb'
expect(input.checkValidity(), 'second string is not an email').to
  .be.false
```

<!-- fiddle-end -->

**Note:** using a regular expression to validate an email is [tricky](https://emailregex.com/)
