# Find an object in an array

Sometimes we want to confirm an array has an object. If we know all object properties we can use `deep.have` assertion:

<!-- fiddle Find an object with the given property -->

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

// check if the given organization is included
cy.wrap(person)
  .its('organizationIds')
  .should('not.be.empty')
  // need to use the full object to compare
  .and('deep.include', {
    id: 2,
    name: 'IEEE',
  })
```

If we only know some of the expected properties like `id: 2` then we need to be more careful. For example, we can extract the ID values first and check if the list includes the expected value:

```js
cy.wrap(person)
  .its('organizationIds')
  .should('not.be.empty')
  .then((list) => Cypress._.map(list, 'id'))
  .should('include', 2)
```

Alternatively, we can extract the objects with the known fields to have more context:

```js
cy.wrap(person)
  .its('organizationIds')
  .should('not.be.empty')
  .then((list) =>
    // from every object in the list, pick the "name" property
    Cypress._.map(list, (o) => Cypress._.pick(o, 'name')),
  )
  .should('deep.include', { name: 'IEEE' })
```

<!-- fiddle-end -->

## See also

- [Array includes a primitive value](./array-includes-a-primitive-value.md)
- [Array includes another array](./array-includes-another-array.md)
