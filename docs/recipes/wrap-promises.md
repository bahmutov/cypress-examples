# Wrap promises

You can use [cy.wrap](https://on.cypress.io/wrap) command to wait for promises to resolve before continuing Cypress test.

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

**👍 Highly recommended:** read the blog post [The Zen Of Cypress Data Setup](https://glebbahmutov.com/blog/setup-cypress-data/).
