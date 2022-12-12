# Pick A Random Number

<!-- fiddle Pick a random 10 digit number -->

Our goal is to pick a random 10 digit number to validate the input field. The number cannot have a leading zero.

```html hide
<input id="number" type="number" />
<div id="message" />
<script>
  const message = document.getElementById('message')
  document
    .getElementById('number')
    .addEventListener('input', (e) => {
      if (e.target.value.match(/^[1-9]\d{9}$/)) {
        message.innerText = 'Valid number'
        message.classList.add('valid')
        message.classList.remove('invalid')
      } else {
        message.innerText = 'Invalid number format'
        message.classList.add('invalid')
        message.classList.remove('valid')
      }
    })
</script>
```

```css hide
#message.valid {
  color: green;
}
#message.invalid {
  color: red;
}
```

We can use `Math.random` to get a random number between 0 and 1. Then we chop off the first two characters `0.` and limit the length to 9 characters. This allows us to prefix the number with `1` to guarantee the number does not have a leading zero.

```js
const random = '1' + Math.random().toString().substr(2, 9)
cy.get('input#number').type(random)
// confirm the successful number message
cy.contains('#message.valid', 'Valid number').should(
  'not.have.class',
  'invalid',
)
```

<!-- fiddle-end -->
