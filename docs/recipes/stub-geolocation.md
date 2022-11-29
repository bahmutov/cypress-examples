# Stub Geolocation

Imagine we have an application that tries to fetch the user's geographic location via [Geolocation API getCurrentPosition](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) method. We want to confirm the application handles the error case correctly.

Find this recipe shown in the video [Cypress Stub For Geolocation getCurrentPosition Method Using Sinon.js](https://youtu.be/zR6o_tdJKDk).

## Sinon.js callsFake

<!-- fiddle Test geolocation error via Sinon callsFake -->

```html
<div id="message" />
<button id="locate">Locate me</button>
<script>
  document
    .getElementById('locate')
    .addEventListener('click', () => {
      navigator.geolocation.getCurrentPosition(
        function onSuccess() {
          // success getting the browser location
        },
        function onError(err) {
          const message = document.getElementById('message')
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
    .callsFake((onSuccess, onError) => {
      // our stub just calls the "onError" argument
      onError(error)
    })
    .as('getCurrentPosition')
})
cy.get('#locate').click()
// confirm the application behaves as it should
cy.contains('#message', error.message)
// and the stub was actually used
cy.get('@getCurrentPosition').should('have.been.calledOnce')
```

<!-- fiddle-end -->

## Sinon.js callsArgWith

Stubbing a function and calling an argument passed by caller is a common operation, thus Sinon.js has a built-in mechanism for it via `callsArg` and `callsArgWith` methods.

```js skip
// instead of implementing a function "callsFake"
cy.stub(
  win.navigator.geolocation,
  'getCurrentPosition',
).callsFake((onSuccess, onError) => {
  // our stub just calls the "onError" argument
  onError(error)
})
// we can simply say "stub calls the argument at index 1"
// with the given argument "error"
cy.stub(
  win.navigator.geolocation,
  'getCurrentPosition',
).callsArgWith(1, error)
```

<!-- fiddle Test geolocation error via Sinon callsArgWith -->

```html
<div id="message" />
<button id="locate">Locate me</button>
<script>
  document
    .getElementById('locate')
    .addEventListener('click', () => {
      navigator.geolocation.getCurrentPosition(
        function onSuccess() {
          // success getting the browser location
        },
        function onError(err) {
          const message = document.getElementById('message')
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

## See also

- [Stub `window.print`](./stub-window-print.md)
- [Stub `window.open`](./window-open.md)
- [Stub timezone](./stub-get-timezone-method.md)
-
