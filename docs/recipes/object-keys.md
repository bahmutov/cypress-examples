# Object Keys

## Defined properties

If we know the exact object properties, we can use "have.keys" assertion to check an object.

<!-- fiddle Defined object keys -->

```js
// each person must have a name and an age property
const person = {
  name: 'Joe',
  age: 21,
}
expect(person, 'known keys').to.have.keys(['name', 'age'])
```

<!-- fiddle-end -->

## Optional property

What if a person object might have an optional property? There is no built-in assertion; the "include.keys" is too permissive. Thus we switch to the "satisfy" assertion and write our own predicate.

<!-- fiddle Optional object keys -->

```js
// each person must have a name and an age property
// but might have a phone number as well
const person = {
  name: 'Joe',
  age: 21,
  phone: '+1-222-333-4556',
}
expect(
  person,
  'known keys plus optional phone number',
).to.satisfy((person) => {
  const keys = Object.keys(person)
  return (
    Cypress._.isEqual(keys, ['name', 'age']) ||
    Cypress._.isEqual(keys, ['name', 'age', 'phone'])
  )
})
```

<!-- fiddle-end -->
