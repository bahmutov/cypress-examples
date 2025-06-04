# Array Includes A Primitive Value

## Checking an array

<!-- fiddle Checking array -->

```js
const countries = ['Germany', 'US', 'Denmark', 'China']
// explicit assertion
expect(countries, 'Denmark is a country').to.include('Denmark')
```

You can check the current subject with automatic retries

```js
const ages = []
// implicit assertion on the current subject
cy.wrap(ages, { log: false })
  // "include" and "contain" are aliases to the same assertion
  .should('include', 30)
  .and('contain', 42)
  // the values are strictly equal, so "42" is not the same as 42
  .and('not.include', '42')
// the array is modified at some point
setTimeout(() => {
  ages.push(10)
}, 500)
setTimeout(() => {
  ages.push(30)
}, 1000)
setTimeout(() => {
  ages.push(42)
}, 1500)
```

<!-- fiddle-end -->

## Checking network requests

<!-- fiddle Checking network requests -->

```js hide
// application sends a few analytics network requests
setTimeout(() => {
  fetch('https://acme.co/analytics', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eventId: 'login' }),
  })
}, 500)
setTimeout(() => {
  fetch('https://acme.co/analytics', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      eventId: 'cart_empty',
      userId: '1234',
    }),
  })
}, 800)
```

The test stubs all `/analytics` requests and should confirm one of the has `eventId: cart_empty` in the request body.

```js
cy.intercept('POST', '/analytics', {}).as('analytics')
cy.get('@analytics.all')
  .map('request.body.eventId')
  .should('include', 'cart_empty')
```

<!-- fiddle-end -->

## Checking network requests with array flattening

Sometimes an application might send a list of requests to save on bandwidth. We need to flatten the collected network request bodies first before checking the `eventId` values.

<!-- fiddle Checking network requests with flattening -->

```js hide
if (Math.random() < 0.5) {
  // separate network calls
  setTimeout(() => {
    fetch('https://acme.co/analytics', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventId: 'login' }),
    })
  }, 500)
  setTimeout(() => {
    fetch('https://acme.co/analytics', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId: 'cart_empty',
        userId: '1234',
      }),
    })
  }, 800)
} else {
  // combined single network call sending both events
  setTimeout(() => {
    fetch('https://acme.co/analytics', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // send both analytics events as an array
      body: JSON.stringify([
        { eventId: 'login' },
        {
          eventId: 'cart_empty',
          userId: '1234',
        },
      ]),
    })
  }, 1000)
}
```

The test stubs all `/analytics` requests and should confirm one of the has `eventId: cart_empty` in the request body.

```js
cy.intercept('POST', '/analytics', {}).as('analytics')
cy.get('@analytics.all')
  .map('request.body')
  // the requests might arrive as a single object
  // or an array of objects, so at this point we can have
  // [event1, event2, [event3, event4], event5]
  // by invoking Array.flat() method, we remove nested arrays
  // [event1, event2, event3, event4, event5]
  .invoke('flat')
  .map('eventId')
  .should('include', 'cart_empty')
```

<!-- fiddle-end -->

## See also

- [Array includes another array](./array-includes-another-array.md)
