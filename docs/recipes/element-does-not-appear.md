# Element Does Not Appear

Imagine the page is loading and _might_ flash a quick error message. In most cases, the message is not there, but sometimes it quickly comes and goes. Even if the message stays, how do you confirm that an element _does not exist_? If you simply check the existence, the check quickly resolves _before_ the element is there

```js
// such check would not help if it runs
// before the error element shows up
cy.get('.error').should('not.exist')
```

What we need is a custom command or assertion that keeps checking the DOM for a period of time. Once it sees an element that we are looking for, the test should immediately fail. We can write such test using `cy.document` and `cy.then` combination.

<!-- fiddle Error element does not appear -->

```html hide
<div id="main">
  <p id="message">Loading...</p>
</div>
```

```js app
setTimeout(() => {
  document.getElementById('message').innerText = 'Finished'
}, 2000)
// a possible error message
// set the right side to 1 to always have the error element
if (Math.random() < 0) {
  setTimeout(() => {
    document.getElementById('main').innerHTML +=
      '<p class="error" id="error">Got an error, retrying</p>'
    setTimeout(() => {
      // remove the error element
      const error = document.getElementById('error')
      error.parentNode.removeChild(error)
    }, 300)
  }, 1000)
}
```

We can "ping" the DOM using a "while" loop. To terminate the loop, we can use the comment timeout and finding the DOM element "#message" with specific text.

```js hide
cy.contains('#message', 'Loading...')
// confirm the ".error" element NEVER shows up during 2 seconds
// if we find the element "#message" with text "Finished" we stop checking
cy.document().then((doc) => {
  const started = Date.now()
  const selector = '.error'
  // check the DOM every N milliseconds
  const delay = 50
  // maximum timeout while checking the DOM
  const timeout =
    Cypress.config('defaultCommandTimeout') || 2_000
  cy.log(
    `checking if ${selector} appears within ${timeout}ms`,
  ).then(async () => {
    while (Date.now() - started < timeout - delay) {
      const gameHistoryTable = doc.querySelector(selector)
      if (gameHistoryTable) {
        throw new Error(`Element ${selector} was found`)
      }
      const finished = doc.querySelector('#message')
      if (finished.innerText.includes('Finished')) {
        // all done
        break
      }
      await Cypress.Promise.delay(delay)
    }
  })
})

cy.contains('#message', 'Finished')
```

<!-- fiddle-end -->
