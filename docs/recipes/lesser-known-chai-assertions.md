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
cy.wrap({ name: { first: 'Joe' } }).should(
  'have.nested.property',
  'name.first',
)
```

You can even provide an expected value of the nested property.

```js
cy.wrap({ name: { first: 'Joe' } })
  .should('have.nested.property', 'name.first', 'Joe')
  // yields the nested property value
  .should('equal', 'Joe')
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
