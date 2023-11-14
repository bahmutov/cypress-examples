# Wrap promises

You can use [cy.wrap](https://on.cypress.io/wrap) command to wait for promises to resolve before continuing Cypress test.

📺 Watch this recipe explained in [Use cy.wrap Command To Wrap Promises In Your Cypress Tests](https://youtu.be/V24_8oGXwy8).

## A single promise

<!-- fiddle Wrap a single promise -->

```js
cy.wrap(Promise.resolve(42)).should('equal', 42)
```

<!-- fiddle-end -->

## Multiple promises

Use `Promise.all` to create a single promise to wait for multiple promises.

<!-- fiddle Multiple promises -->

Let's compute SHA of the given text using an asynchronous function from the [Compute SHA256](./sha-256.md) recipe.

```js hide
async function digestMessage(message) {
  // encode as (utf-8) Uint8Array
  const msgUint8 = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest(
    'SHA-256',
    msgUint8,
  ) // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('') // convert bytes to hex string
  return hashHex
}
```

We can compute sha of multiple strings in parallel.

```js
cy.wrap(
  Promise.all([
    digestMessage('foo'),
    digestMessage('bar'),
    digestMessage('baz'),
  ]),
)
  // resolves with an array of hashes
  .should('have.length', 3)
  // use cy.spread to spread the array elements into arguments
  .spread((sha1, sha2, sha3) => {
    expect(sha1, 'sha1 !== sha2').to.not.equal(sha2)
    expect(sha1, 'sha1 !== sha3').to.not.equal(sha3)
    expect(sha2, 'sha2 !== sha3').to.not.equal(sha3)
  })
```

The same wait can be achieved by mapping data into an array of promises using `cy.map` from [cypress-map](https://github.com/bahmutov/cypress-map) plugin and then applying `Promise.all` function. Note: you need to bind `Promise.all` method to the `Promise` itself to work properly, typical [JavaScript context madness](https://glebbahmutov.com/blog/no-binding-necessary/).

```js
cy.wrap(['foo', 'bar', 'baz'])
  .map(digestMessage)
  .then(Promise.all.bind(Promise))
  .then((shas) => {
    shas.forEach((sha, k) => {
      expect(sha, `sha ${k + 1}`).to.be.a('string')
    })
  })
```

<!-- fiddle-end -->

## Use the returned selector to click

📺 Watch this example explained in the video [Wrap Asynchronous Function](https://youtu.be/28Q9aJFpgwQ).

Let's say we want to get the element selector to find and then click. Let's say the user wants to do something like this:

```js
const someValue = await someFunction()
await cy.get(someValue).click()
```

<!-- fiddle Click the returned selector -->

```html
<button id="one">Click 1</button>
```

```js
function getButtonSelector() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('#one')
    }, 1000)
  })
}
// get the selector from an asynchronous function "getButtonSelector"
// and click on that selector
cy.wrap(getButtonSelector()).then(cy.get).click()
```

<!-- fiddle-end -->

## When to create a promise

**Note:** promises are eager, they start running as soon as they are created. I think this is the main problem many people experience and why they prefer using the `await` syntax.

```js skip
// these two functions run in parallel!
getButtonSelector()
getButtonSelector()
// the user probably meant to run these functions one after another
await getButtonSelector()
await getButtonSelector()
```

Let's see the timing problem.

<!-- fiddle When is promise created -->

```html
<button id="one">Click 1</button>
```

```js
function getButtonSelector() {
  return new Promise((resolve) => {
    console.log('getButtonSelector created')
    setTimeout(() => {
      console.log('getButtonSelector resolved')
      resolve('#one')
    }, 1000)
  })
}
```

```js skip
// the promise is created before "Log start" is printed
cy.wait(1000).log('start')
cy.wrap(getButtonSelector()).then(cy.get).click()
```

One solution is to create the promise in the "correct" order during Cypress test step execution is to use `cy.then`

```js skip
cy.wait(1000)
  .log('start')
  .then(getButtonSelector)
  .then(cy.get)
  .click()
```

Another solution is to treat the function as an object, and use the `cy.invoke` command to call it. Unfortunately the built-in `cy.invoke` command does not fully handle promises, plus we don't want to retry calling the asynchronous function `getButtonSelector`. I will use my `cy.invokeOnce` command from the [cypress-map](https://github.com/bahmutov/cypress-map) plugin to call the current subject funtion using `Function.prototype.call` method.

```js
cy.wait(1000).log('start')
cy.wrap(getButtonSelector)
  .invokeOnce('call')
  .then(cy.get)
  .click()
```

<!-- fiddle-end -->

**👍 Highly recommended:** read the blog post [The Zen Of Cypress Data Setup](https://glebbahmutov.com/blog/setup-cypress-data/).
