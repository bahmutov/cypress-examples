# Text changes

In this example, we want to confirm that the text on the page changes after the user clicks the button. We do not know the initial text, just know that is changes in response to the click.

<!-- fiddle Text changes -->

```html
<div id="output">Original text</div>
<button id="change">Do it</button>
<script>
  document
    .getElementById('change')
    .addEventListener('click', () => {
      // change the text, but do it after a random delay,
      // almost like the application is loading something from the backend
      setTimeout(() => {
        document.getElementById('output').innerText = 'Changed!'
      }, 1000 + 1000 * Math.random())
    })
</script>
```

```js
cy.get('#output')
  .invoke('text')
  .then((text) => {
    cy.get('#change').click()
    cy.get('#output').should('not.have.text', text)
  })
```

<!-- fiddle-end -->

Watch the explanation video [Confirm The Text On The Page Changes After A Click](https://youtu.be/BbxjeXmIUeo).

See also [Counter increments](./counter-increments.md)
