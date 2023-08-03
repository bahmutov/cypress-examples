# Prepare To Spy

## Wait for the property to exist

We can automatically wait for a new `window` property to be added before spying on it. For example, let's spy on the `window.logEvent` method _after_ the application sets it up.

<!-- fiddle Wait for the method to exist -->

```html
<button id="action">Action!</button>
<script>
  setTimeout(() => {
    console.log('loading app')
    window.logEvent = (name) => console.log('log event %s', name)
    // immediately log something
    logEvent('initialized')
  }, 10)
  document
    .getElementById('action')
    .addEventListener('click', () => {
      logEvent('action')
    })
</script>
```

```js
console.log('loading test')
cy.window().its('logEvent')
cy.window().then((win) => {
  cy.spy(win, 'logEvent').as('logEvent')
})
```

Now we can click on the button and confirm the spy `logEvent` is called correctly.

```js
cy.contains('button', 'Action').click()
cy.get('@logEvent').should(
  'have.been.calledOnceWithExactly',
  'action',
)
```

<!-- fiddle-end -->

## Prepare to spy

But what about the very first `logEvent` call? The once that happens _immediately_ after the application creates it?

```js
window.logEvent = (name) => console.log('log event %s', name)
// immediately log something
logEvent('initialized')
```

How do we spy on the `logEvent('initialized')` call? By the time the test "figures" out the new property exists, it is too late.

```js
cy.window().its('logEvent')
// too late, the app already called it
```

<!-- fiddle Prepare to spy -->

```html
<button id="action">Action!</button>
<script>
  setTimeout(() => {
    console.log('loading app')
    window.logEvent = (name) => console.log('log event %s', name)
    // immediately log something
    logEvent('initialized')
  }, 10)
  document
    .getElementById('action')
    .addEventListener('click', () => {
      logEvent('action')
    })
</script>
```

```js
console.log('loading test')
// prepare new stub instance
const stub = cy.stub().as('logEvent')
// prepare for the application to set "window.logEvent"
cy.window().then((win) => {
  let logEvent
  Object.defineProperty(win, 'logEvent', {
    get() {
      return logEvent
    },
    set(method) {
      // we want to spy on the "window.logEvent",
      // so we call the real method function
      logEvent = stub.callsFake(method)
    },
  })
})
```

As soon as the application tries to set the `window.logEvent = ...` we "catch" the assignment and wrap it in our Sinon stub.

```js
cy.get('@logEvent').should(
  'have.been.calledOnceWithExactly',
  'initialized',
)
```

<!-- fiddle-end -->
