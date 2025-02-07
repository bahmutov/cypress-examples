# Lesser Known Chai Assertions

See [Chai BDD page](https://www.chaijs.com/api/bdd/) and [Cypress assertions](../commands/assertions.md)

## nested property

<!-- fiddle Nested property -->

```js
expect({ a: { b: ['x', 'y'] } }).to.have.nested.property(
  'a.b[1]',
)
expect({ a: { b: ['x', 'y'] } }).to.nested.include({
  'a.b[1]': 'y',
})
```

Or using the current subject

```js
cy.wrap({ name: { first: 'Joe' } })
  .should('have.nested.property', 'name.first')
  // yields the nested property value
  .should('equal', 'Joe')
```

You can even provide an expected value of the nested property.

```js
cy.wrap({ name: { first: 'Joe' } })
  .should('have.nested.property', 'name.first', 'Joe')
  // yields the nested property value
  .should('equal', 'Joe')
```

The assertion is similar to the [cy.its](https://on.cypress.io/its) + `should('equal', value)` combination.

```js
cy.wrap({ name: { first: 'Joe' } })
  .its('name.first')
  .should('equal', 'Joe')
```

The assertion works well with arrays

```js
cy.wrap([
  { sum: 42 },
  { sum: 101 },
  { sum: { errors: ['Invalid operation'] } },
]).should(
  'have.nested.property',
  '[2].sum.errors.[0]',
  'Invalid operation',
)
// Note: you can omit the dot before the array index
// and even omit the "[ ]" brackets
cy.wrap([
  { sum: 42 },
  { sum: 101 },
  { sum: { errors: ['Invalid operation'] } },
]).should(
  'have.nested.property',
  '2.sum.errors.0',
  'Invalid operation',
)
```

<!-- fiddle-end -->

## own property

You can check if an object or its prototype includes a property

<!-- fiddle Own property -->

```js
Object.prototype.b = 2

expect({ a: 1 }).to.have.property('a')
// property "b" comes from the prototype
expect({ a: 1 }).to.have.property('b')
```

You can limit the assertion to the object's own properties

```js
expect({ a: 1 }).to.have.own.property('a')
expect({ a: 1 }).to.not.have.own.property('b')
```

Using `own.include` you can check a "part" of an object with the values

```js
expect({ a: 1 }).to.own.include({ a: 1 })
expect({ a: 1 })
  .to.include({ b: 2 })
  .but.not.own.include({ b: 2 })
```

The same can be done with a subject

```js
cy.wrap({ name: 'Joe', age: 20 })
  .should('own.include', {
    name: 'Joe',
  })
  // yields the original object
  .should('own.property', 'age')
  // yields the property value
  .should('be.closeTo', 20, 2)
```

<!-- fiddle-end -->

## Should satisfy

📺 You can watch the explanation for `should satisfy` assertion in the video [Lesser Known Chai Assertions Like Satisfy A Predicate](https://youtu.be/ODkNYjf1hbs).

<!-- fiddle Satisfy -->

```js
expect(1).to.satisfy(function (num) {
  return num > 0
})
// you can add a string message after the predicate
cy.wrap(1).should('satisfy', (num) => num > 0, 'positive')
// you can flip the assertion and check
// if the predicate is NOT satisfied
cy.wrap(1).should(
  'not.satisfy',
  (num) => num < 0,
  'not negative',
)
```

It is convenient to use explicit `should('satisfy', predicate)` because you can add a nice log message.

```html
<ul id="people">
  <li>Joe</li>
  <li>John</li>
  <li>Anna</li>
  <li>Mary</li>
</ul>
```

```js
const isEven = (n) => n % 2 === 0
cy.log('**should callback**')
cy.get('#people li').should(($li) => {
  expect($li.length % 2 === 0, 'even number of elements').to.be
    .true
})
cy.log('**should satisfy with a message**')
cy.get('#people li')
  .its('length')
  .should('satisfy', isEven, 'even number of people in the list')
```

<!-- fiddle-end -->

## Members

<!-- fiddle Array members -->

Checks if the subject array has the same items as the given array, the order does not matter.

```js
cy.wrap([1, 2, 3]).should('have.members', [3, 2, 1])
```

If you want to check the order, use `ordered`

```js
cy.wrap([1, 2, 3]).should('have.ordered.members', [1, 2, 3])
```

<!-- fiddle-end -->

## Extensible

Checks if new properties can be added to the object

<!-- fiddle Extensible -->

```js
// A plain object is extensible
cy.wrap({ name: 'Joe' }).should('be.extensible')
// A sealed object is not extensible
cy.wrap(Object.seal({ name: 'Joe' })).should('not.be.extensible')
```

<!-- fiddle-end -->

## Sealed

Checks if the object is sealed (no new properties, but existing properties can be assigned new values)

<!-- fiddle Sealed -->

```js
// A plain object is not sealed
cy.wrap({ name: 'Joe' }).should('not.be.sealed')
// A sealed object is sealed
cy.wrap(Object.seal({ name: 'Joe' })).should('be.sealed')
```

<!-- fiddle-end -->

## Frozen

Checks if the object is frozen and nothing can be changed about it.

<!-- fiddle Frozen -->

```js
// A plain object is not frozen
cy.wrap({ name: 'Joe' }).should('not.be.frozen')
// A frozen object
cy.wrap(Object.freeze({ name: 'Joe' }))
  .should('be.frozen')
  // frozen objects are also sealed
  .and('be.sealed')
```

<!-- fiddle-end -->

## Finite

The object is a number that is neither a `NaN` nor `Infinity`

<!-- fiddle Finite -->

```js
cy.wrap(NaN).should('not.be.finite')
cy.wrap(Infinity).should('not.be.finite')
cy.wrap(42).should('be.finite')
```

**Tip:** Lodash bundled with Cypress includes predicates checking numbers

```js
cy.wrap(NaN).should(
  'not.satisfy',
  Cypress._.isFinite,
  '_.isFinite',
)
cy.wrap(Infinity).should(
  'not.satisfy',
  Cypress._.isFinite,
  '_.isFinite',
)
cy.wrap(42).should('satisfy', Cypress._.isFinite, '_.isFinite')
```

<!-- fiddle-end -->

## Custom type tag

<!-- fiddle Custom type tag -->

checking built-in types

```js
expect('foo').to.be.a('string')
expect({ a: 1 }).to.be.an('object')
expect(null).to.be.a('null')
expect(undefined).to.be.an('undefined')
expect(new Error()).to.be.an('error')
expect(Promise.resolve()).to.be.a('promise')
expect(new Float32Array()).to.be.a('float32array')
expect(Symbol()).to.be.a('symbol')
```

If we have our own custom types, we can confirm them

```js
const myObj = {
  [Symbol.toStringTag]: 'myCustomType',
}
cy.wrap(myObj)
  .should('not.be.an', 'object')
  .and('to.be.a', 'myCustomType')
```

<!-- fiddle-end -->
