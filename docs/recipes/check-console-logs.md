# Check console logs

Imagine we have an application that can `console.log` an error message. We want to interact with the application and fail the test if there was such a log call. Watch the explanation for the tests below in the video [Fail The Test If The App Calls console.log With The Word Error](https://youtu.be/KE4A1Iupo60).

## Check at the end of the test

We can spy on the `console.log` method calls and inspect the calls at the end of the test.

<!-- fiddle Check at the end of the test -->

```html
<script>
  setTimeout(() => {
    console.log('started')
    // change to 1 to see the test fail
    if (Math.random() < 0) {
      console.log('Random error')
    } else {
      console.log('All is good')
    }
  }, 100)
</script>
```

```js
cy.window()
  .its('console')
  .then((console) => {
    cy.spy(console, 'log').as('log')
  })
// perform some action or give app time to
// do its thing that might log an error message
cy.wait(1000)
// check the logs by going through all recorded calls
cy.get('@log')
  .invoke('getCalls')
  .then((calls) => {
    // open the DevTools to see the dumped table
    console.table(calls)
  })
  // cy.each can work with an array of objects
  .each((call) => {
    // inspect each console.log argument
    call.args.forEach((arg) => {
      expect(arg).to.not.contain('error')
    })
  })
```

<!-- fiddle-end -->

## Check each console.log call as it happens

We can take another approach and stub the `console.log` and inspect the arguments. If there is an error message, we can throw an error and fail the test. If there is no error message, we can call the original log method.

<!-- fiddle Immediately throw an error if console.log is called with an error -->

```html
<script>
  setTimeout(() => {
    console.log('started')
    // change to 1 to see the test fail
    if (Math.random() < 0) {
      console.log('Random error')
    } else {
      console.log('All is good')
    }
  }, 100)
</script>
```

```js
cy.window()
  .its('console')
  .then((console) => {
    cy.stub(console, 'log').callsFake((...args) => {
      args.forEach((arg) => {
        expect(arg).to.not.contain('error')
      })
      // all is good, call the original log method
      console.log.wrappedMethod(...args)
    })
  })
// perform some action or give app time to
// do its thing that might log an error message
cy.wait(1000)
```

<!-- fiddle-end -->

## Throw on console.error

If we want to simply throw an error and fail the test as soon as the application calls `console.error` method, we can use `cy.stub(console, 'error').throw('Console error')`

<!-- fiddle Throw an error if application uses console.error -->

```html
<script>
  setTimeout(() => {
    // change to 1 to see the test fail
    if (Math.random() < 0) {
      console.error('Something is not right')
    } else {
      console.log('All is good')
    }
  }, 100)
</script>
```

```js
cy.window()
  .its('console')
  .then((console) => {
    cy.stub(console, 'error').throws('Console error')
  })
// perform some action or give app time to
// do its thing that might log an error message
cy.wait(1000)
```

<!-- fiddle-end -->
