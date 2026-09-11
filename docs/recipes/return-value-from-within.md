# Return value from a custom command that uses .within

Imagine you are using a custom command and it uses the [.within()](https://on.cypress.io/within) internally. How do you return some arbitrary value from that command if the `.within()` command always yields its parent element?

## Scoped variable

<!-- fiddle return value from .within -->

```html
<div id="parent">
  The parent div
  <div class="some-child">
    Magic number is <span class="magic">42</span>
  </div>
</div>
```

```js
// we can simply use a variable in the same lexical scope
let magicNumber
cy.get('#parent')
  .within(() => {
    cy.get('.magic')
      .invoke('text')
      .then(parseInt)
      .then((x) => {
        magicNumber = x
      })
  })
  .then(() => {
    // outside the .within() callback we can use the magicNumber
    // because it should be set by now
    expect(magicNumber).to.equal(42)
  })
```

You can use a custom command in this case, just wrap the final result so it becomes the value yielded from the custom command.

```js
cy.log('**using custom command**')
Cypress.Commands.add(
  'getMagicNumber',
  (selector, options = {}) => {
    Cypress._.defaults(options, { log: true })
    cy.log(`getMagicNumber from **${selector}**`)

    let magicNumber
    cy.get(selector, options)
      .within(options, () => {
        cy.get('.magic', options)
          .invoke(options, 'text')
          .then(parseInt)
          .then((x) => {
            magicNumber = x
          })
      })
      .then(() => {
        cy.wrap(magicNumber, options)
      })
  },
)
cy.getMagicNumber('#parent', { log: false }).should('equal', 42)
```

<!-- fiddle-end -->

## Yield an object

Alternatively, we can yield an object reference by wrapping it after `cy.within`. We can even create an alias to the object and grab it inside the `cy.within` callback to avoid using scope. This is especially useful when the `cy.within` is called inside another function.

<!-- fiddle aliased object -->

Let's say we again want to grab the number shown in the "magic" element that is inside the `#parent` element.

```html
<div id="parent">
  The parent div
  <div class="some-child">
    Magic number is <span class="magic">42</span>
  </div>
</div>
```

If we want to return a Cypress chain which calls `cy.within` somewhere inside, the chain will yield the original element, NOT anything yielded inside the `cy.within(callback)` callback function.

```js skip
// WARNING: yield the element before "cy.within"
// NOT the yielded value from the inner callback
function getTheMagicNumber() {
  return cy.get('#parent').within(() => {
    return cy.get('@result').then((result) => {
      return cy.get('.magic').invoke('text').then(parseInt)
    })
  })
}
```

You might try wrapping the value to be returned using `cy.wrap` inside the `cy.within(callback)`, but that does not work either

```js skip
// WARNING: yield the element before "cy.within"
// NOT the wrapped object
function getTheMagicNumber() {
  return cy.get('#parent').within(() => {
    return cy.get('@result').then((result) => {
      return cy
        .get('.magic')
        .invoke('text')
        .then(parseInt)
        .then((n) => {
          return cy.wrap({ magicNumber: n })
        })
    })
  })
}
```

A better solution would be to use an aliased object and store the result there.

```js
function getTheMagicNumber() {
  return cy.get('#parent').within(() => {
    cy.get('@result').then((result) => {
      cy.get('.magic')
        .invoke('text')
        .then(parseInt)
        .then((n) => {
          result.magicNumber = n

          // try returning the result object
          // nothing: this return does NOT change
          // the subject of the `cy.within` command
          return result
        })
    })
  })
}
```

```js
// prepare the
cy.wrap({ magicNumber: null }).as('result')

// just calling the function will yield the "cy.within"
// original subject - the element with id "parent"
getTheMagicNumber().should('match', '#parent')

// we need to grab the result object
cy.get('@result').should('deep.equal', { magicNumber: 42 })
```

<!-- fiddle-end -->

## Using cy.find instead of cy.within

If you just need to grab a single value within the parent element, consider using the child [cy.find](https://on.cypress.io/find) command instead of [cy.within](https://on.cypress.io/within) command.

<!-- fiddle using cy.find instead of cy.within -->

The same setup: the magic element is inside the `#parent` element

```html
<div id="parent">
  The parent div
  <div class="some-child">
    Magic number is <span class="magic">42</span>
  </div>
</div>
```

```js
function getTheMagicNumber() {
  return (
    cy
      .get('#parent')
      // using cy.find to find the child element
      // inside the current subject
      // (instead of cy.within)
      .find('.magic')
      .invoke('text')
      .then(parseInt)
      .then((n) => {
        return { magicNumber: n }
      })
  )
}

getTheMagicNumber().should('deep.equal', { magicNumber: 42 })
```

<!-- fiddle-end -->

## See also

- [querying commands](../commands/querying.md) including `.within()`
