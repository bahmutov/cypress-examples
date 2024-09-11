# Parse Email URL

Imagine the application opens a popup window just to send an email. The app might set the window location to load a specially formatted URL that would prompt the browser to open a local email client to actually send it. The URL would look like this `mailto:recipient?subject=...&body=...`. Each key is encoded.

In the example below the email body has a link we want to test. We need to

- stub the `window.open` method call
- grab the window URL and parse it
- extract the discount link URL from the email body text
- confirm the coupon text `GLEB10OFF`

**Tip:** I have covered stubbing `window.open` in the [Stub `window.open`](./stub-window-open.md) and [Window open](./window-open.md) recipes.

## A single command chain

<!-- fiddle Email window popup -->

```html hide
<button id="email">Share link</button>
```

```js app hide
document
  .getElementById('email')
  .addEventListener('click', () => {
    const params = new URLSearchParams()
    params.append('subject', 'Use this promotion code')
    params.append(
      'body',
      [
        'Hello, friend',
        'Here is your link to get a discount',
        '',
        'https://acme.co/discount/GLEB10OFF',
      ].join('\r'),
    )
    const emailUrl = 'mailto:recipient?' + params.toString()
    window.open(
      emailUrl,
      'email-popup',
      'popup,width=300,height=300',
    )
  })
```

First, we need to prepare the `window.open` method call by stubbing it.

```js
cy.window().then((win) => {
  cy.stub(win, 'open').as('open')
})
```

Click on the button to get the app to call the `window.open` stub

```js
cy.contains('button', 'Share link').click()
```

Confirm the `window.open` was called with a string as the first argument

```js
cy.get('@open')
  .should('have.been.calledOnceWith', Cypress.sinon.match.string)
  .its('firstCall.args.0')
  // confirm the URL is an e mail link
  .should('match', /^mailto:recipient\?/)
  // grab the search arguments after the "?"
  .invoke('split', '?')
  .its(1)
  // parse the search arguments using URLSearchParams API
  .then((s) => new URLSearchParams(s))
  .then((params) => {
    // confirm individual fields
    // notice that values are already decoded by the URLSearchParams
    expect(params.get('subject'), 'subject').to.equal(
      'Use this promotion code',
    )
    // let's work with the "body" text
    return params.get('body')
  })
  .should('be.a', 'string')
  // split the text into individual lines if needed
  .invoke('split', '\r')
  // the last line is the invite link
  .at(-1)
  // confirm it is a HTTPS link
  .should('match', /^https:\/\//)
  // the discount code is the last part of the URL in our case
  .invoke('split', '/')
  .at(-1)
  .should('equal', 'GLEB10OFF')
```

<!-- fiddle-end -->

## Helpers and aliases

**Note:** above I created a long chain of queries, commands, and assertions. You can simplify the same test using [cypress-map](https://github.com/bahmutov/cypress-map) and [cy-spok](https://github.com/bahmutov/cy-spok) plugins, and you can store intermediate values using [Cypress aliases](./aliases.md)

<!-- fiddle Parse email URL using helpers -->

```html hide
<button id="email">Share link</button>
```

```js app hide
document
  .getElementById('email')
  .addEventListener('click', () => {
    const params = new URLSearchParams()
    params.append('subject', 'Use this promotion code')
    params.append(
      'body',
      [
        'Hello, friend',
        'Here is your link to get a discount',
        '',
        'https://acme.co/discount/GLEB10OFF',
      ].join('\r'),
    )
    const emailUrl = 'mailto:recipient?' + params.toString()
    window.open(
      emailUrl,
      'email-popup',
      'popup,width=300,height=300',
    )
  })
```

Our test starts the same way and stores the email URL params in an alias

```js
cy.window().then((win) => {
  cy.stub(win, 'open').as('open')
})
cy.contains('button', 'Share link').click()
// get the email URL parameters
cy.get('@open')
  .should('have.been.calledOnce')
  .its('firstCall.args.0')
  .should('match', /^mailto:recipient\?/)
  // grab the search arguments after the "?"
  .invoke('split', '?')
  .its(1)
  // store the encoded search params string in an alias
  .as('params')
```

We now have the encoded URL search parameters in an alias `params`. We can convert it to a plain object via [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) API.

```js
cy.get('@params')
  .make(URLSearchParams)
  .toPlainObject('entries')
  .should('have.keys', ['subject', 'body'])
  .as('email')
  // confirm the email subject text
  .and('have.property', 'subject', 'Use this promotion code')
```

Get the email body and extract the HTTPS link. Imagine the link could be anywhere, so let's use a regular expression with a named capture group.

```js
cy.get('@email')
  .its('body')
  .should('be.a', 'string')
  .invoke('match', /(?<link>https:\/\/\S+)/)
  .its('groups.link')
  .should('be.a', 'string')
  .as('link')
```

Now we can validate the link or visit it. Let's confirm the text `GLEB10OFF` is one of the path segments

```js
cy.get('@link')
  .invoke('split', '/')
  .should('include', 'GLEB10OFF')
```

<!-- fiddle-end -->
