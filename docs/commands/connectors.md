# Connectors

Examples of connecting commands in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [.each()](https://on.cypress.io/each)

<!-- fiddle each / print each element -->

To iterate over the elements of a current subject, use the `.each()` command.

```html
<ul class="connectors-each-ul">
  <li>Lara Williams</li>
  <li>William Grey</li>
  <li>Monica Pharrel</li>
</ul>
```

```js
cy.get('.connectors-each-ul>li').each(function ($el, index, $list) {
  console.log($el, index, $list)
})
```

<!-- fiddle-end -->

### Put complex logic into each callback

Let's say that we want to confirm that each element in the list has the text content `Item <index>` where the index starts with 1, and the tooltip attribute is `Click me`.

<!-- fiddle each / use cy commands inside the callback -->

```html
<ul class="items">
  <li title="Click me">Item: 1</li>
  <li title="Click me">Item: 2</li>
  <li title="Click me">Item: 3</li>
</ul>
```

```js
cy.get('.items>li').each(function ($el, index, $list) {
  cy.wrap($el)
    .should('have.text', `Item: ${index + 1}`)
    .and('have.attr', 'title', 'Click me')
})
```

<!-- fiddle-end -->

## [.its()](https://on.cypress.io/its)

To get the properties on the current subject, use the `.its()` command. For example, if the subject is the list of found elements, we can grab its `length` property and use it in the assertion:

<!-- fiddle its / number of elements -->

```html
<ul class="connectors-its-ul">
  <li>Chai</li>
  <li>Chai-jQuery</li>
  <li>Chai-Sinon</li>
</ul>
```

```js
cy.get('.connectors-its-ul>li')
  // calls the 'length' property returning that value
  .its('length')
  .should('be.gt', 2)
// tip: this is an equivalent assertion
cy.get('.connectors-its-ul>li').should('have.length.gt', 2)
```

<!-- fiddle-end -->

Under the hood, `.its` uses Lodash `_.property` method, thus you can grab the nested values using dot notation:

<!-- fiddle its / nested property -->

```js
const person = {
  name: {
    first: 'Joe',
    last: 'Smith',
  },
  organizationIds: [
    {
      id: 1,
      name: 'Acme, inc',
    },
    {
      id: 2,
      name: 'IEEE',
    },
  ],
}
cy.wrap(person)
  // grab nested property using "." notation
  .its('name.first')
  .should('equal', 'Joe')
// the dot notation works with arrays
cy.wrap(person).its('organizationIds.1.name').should('equal', 'IEEE')
```

<!-- fiddle-end -->

## [.invoke()](https://on.cypress.io/invoke)

To invoke a function on a current subject, use the `.invoke()` command.

<!-- fiddle invoke -->

```html
<div class="connectors-div">This is a div</div>
<script>
  // hide this div so we can invoke show later
  $('.connectors-div').hide()
</script>
```

```js
cy.get('.connectors-div')
  .should('be.hidden')
  // call the jquery method 'show' on the 'div.container'
  .invoke('show')
  .should('be.visible')
```

<!-- fiddle-end -->

## [.spread()](https://on.cypress.io/spread)

To spread an array as individual arguments to a callback function, use the `.spread()` command.

<!-- fiddle spread -->

```js
const arr = ['foo', 'bar', 'baz']

cy.wrap(arr).spread(function (foo, bar, baz) {
  expect(foo).to.eq('foo')
  expect(bar).to.eq('bar')
  expect(baz).to.eq('baz')
})
```

<!-- fiddle-end -->

## [.then()](https://on.cypress.io/then)

<!-- fiddle then -->

```html
<ul class="connectors-list">
  <li>Walk the dog</li>
  <li>Feed the cat</li>
  <li>Write JavaScript</li>
</ul>
```

To invoke a callback function with the current subject, use the `.then()` command.

```js
cy.log('**Callback**')
cy.get('.connectors-list>li').then(function ($lis) {
  expect($lis).to.have.length(3)
  expect($lis.eq(0)).to.contain('Walk the dog')
  expect($lis.eq(1)).to.contain('Feed the cat')
  expect($lis.eq(2)).to.contain('Write JavaScript')
})
```

If the callback function returns a value, it is yielded to the next callback, just like in a Promise callback.

```js
cy.log('**Return value**')
cy.wrap(1)
  .then((num) => {
    expect(num).to.equal(1)

    return 2
  })
  .then((num) => {
    expect(num).to.equal(2)
  })
```

But unlike a Promise, if `undefined` is returned, then the original value passed into the `.then(cb)` is yielded to the next callback.

```js
cy.log('**Returning undefined**')
cy.wrap(1)
  .then((num) => {
    expect(num).to.equal(1)
    // note that nothing is returned from this callback
  })
  .then((num) => {
    // this callback receives the original unchanged value 1
    expect(num).to.equal(1)
  })
```

If there are Cypress commands in the `.then(cb)` callback, then the value yielded by the last command will be passed to the next callback.

```js
cy.log('**Returning wrapped value**')
cy.wrap(1)
  .then((num) => {
    expect(num).to.equal(1)
    // note how we run a Cypress command
    // the result yielded by this Cypress command
    // will be passed to the second ".then"
    cy.wrap(2)
  })
  .then((num) => {
    // this callback receives the value yielded by "cy.wrap(2)"
    expect(num).to.equal(2)
  })
```

<!-- fiddle-end -->
