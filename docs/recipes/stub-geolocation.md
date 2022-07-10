# Stub Geolocation

<!-- fiddle Test geolocation error -->

See the [Geolocation API getCurrentPosition](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition).

```html
<div id="message" />
<button id="locate">Locate me</button>
<script>
  const message = document.getElementById('message')
  document
    .getElementById('locate')
    .addEventListener('click', () => {
      navigator.geolocation.getCurrentPosition(
        function onSuccess() {
          // success getting the browser location
        },
        function onError(err) {
          message.innerText = err.message
        },
      )
    })
</script>
```

```js
// simulate the browser API calling
// the "onError" callback function
// passed by the app to geolocation.getCurrentPosition
const error = new Error('Test geo error')
cy.window().then((win) => {
  cy.stub(win.navigator.geolocation, 'getCurrentPosition')
    .callsArgWith(1, error)
    .as('getCurrentPosition')
})
cy.get('#locate').click()
// confirm the application behaves as it should
cy.contains('#message', error.message)
// and the stub was actually used
cy.get('@getCurrentPosition').should('have.been.calledOnce')
```

<!-- fiddle-end -->
