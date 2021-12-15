# Create Long Text

Sometimes you need to create a long string for testing. Use the built-in [Lodash](https://lodash.com/docs) `_.repeat` function to do so. For example, to check how the application truncates the pasted text:

<!-- fiddle Create long text -->

```html
<textarea
  id="text"
  placeholder="Enter long text"
  rows="5"
  cols="50"
></textarea>
<div id="output" />
<script>
  document
    .getElementById('text')
    .addEventListener('blur', function (e) {
      console.log('changed', e.target.value)
      document.getElementById('output').innerText =
        e.target.value.slice(0, 30) + '...'
    })
</script>
```

```js
// need to generate text longer than 100 characters
// use Lodash repeat method and use a space to make
// the text look nicer
const text = Cypress._.repeat('123456789 ', 11)
expect(text).to.have.length(110)
cy.get('#text').type(text).blur()
// confirm the output element has the sliced text
cy.get('#output')
  .invoke('text')
  .should('have.length', 33)
  .and('match', /\.\.\.$/)
```

<!-- fiddle-end -->
