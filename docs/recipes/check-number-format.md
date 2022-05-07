# Check number format

<!-- fiddle Check number format -->

```html
<input id="user-number" type="number" />
<output id="formatted" />
<script>
  const output = document.getElementById('formatted')
  document
    .getElementById('user-number')
    .addEventListener('input', (e) => {
      const chars = String(e.target.value)
        .split('')
        .reverse()
        .map((c, k) => (k > 0 && k % 3 === 0 ? c + ',' : c))
        .reverse()
        .join('')
      output.innerText = chars
    })
</script>
```

```js
cy.get('#user-number').type('1234567')
```

How would we check the formatted output? We could say that the formatted output should match a regular expression.

```js skip
cy.contains('#formatted', /^(\d{1,3},?)+$/)
```

The regular expression can lead an error though. For example, the same regular expression matches _incorrectly_ formatted number. For example, the program could incorrectly set the output to "000" and it would still work!

```js skip
// oops, the application code sets the random
// launch code with just zeroes.
cy.get('#formatted').invoke('text', '000000')
// Hmm, our regular still works, since we did
// not check the formatted _value_, only the format
cy.contains('#formatted', /^(\d{1,3},?)+$/)
```

Since we know the number, simply check for the expected string without any regular expression logic in the spec.

```js
cy.contains('#formatted', '1,234,567')
```

<!-- fiddle-end -->
