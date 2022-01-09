# Setting a property in a complex environment object

Based on the question [#14374](https://github.com/cypress-io/cypress/discussions/14374)

Imagine we have a complex object set as the [Cypress environment variables](https://on.cypress.io/environment-variables) when using [Cypress.env](https://on.cypress.io/env) method.

<!-- fiddle Set one env property -->

```js
Cypress.env({
  person: {
    name: {
      first: 'Joe',
      last: 'Smith',
    },
    age: 82,
  },
})

// we can get individual property
expect(
  Cypress.env('person').name.last,
  'last name from person',
).to.equal('Smith')
// same by getting the entire env object
expect(
  Cypress.env().person.name.last,
  'last name from env',
).to.equal('Smith')

// you can use bundled Lodash _.get method
expect(
  Cypress._.get(Cypress.env(), 'person.name.last'),
  'last name using _.get',
).to.equal('Smith')
// what if we want to change a single nested property
// deep inside the environment object without
// changing anything else?
// Solution: get the entire object,
// then set an individual property and then set it back
const env = Cypress.env()
env.person.name.last = 'Smitz'
Cypress.env(env)
expect(Cypress.env().person.name.last, 'changed name').to.equal(
  'Smitz',
)
// NOTE: you do not need to even use `Cypress.env` to set the updated
// object reference after changing one of its properties.
env.person.name.last = 'Bravo'
expect(
  Cypress.env().person.name.last,
  'changed by reference',
).to.equal('Bravo')

// Advanced: note that the object references are the same
// if we ask for property "person" from the environment object
// it is the same reference as the one we got already under "env.person.name"
const name = Cypress.env('person').name
expect(name).to.equal(env.person.name)
```

<!-- fiddle-end -->

Thus the simplest answer is: get the environment object and set the properties directly.
