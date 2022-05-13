# Get multiple fields

This recipe answers the question [#15762](https://github.com/cypress-io/cypress/discussions/15762):

> How would I read multiple input fields at once/

Imagine a form with multiple input fields, we want to place all their values into a single object.

## Explicit test

First, let's write the explicit test

<!-- fiddle Multiple fields / explicit test -->

```html
<form>
  <label for="fname">First name:</label><br />
  <input type="text" id="fname" name="fname" value="Joe" /><br />
  <label for="lname">Last name:</label><br />
  <input type="text" id="lname" name="lname" value="Smith" />
</form>
```

```js
// this object will collect the values from every field
const values = {}
cy.get('#fname')
  .invoke('attr', 'value')
  .then((s) => {
    values.firstName = s
  })
cy.get('#lname')
  .invoke('attr', 'value')
  .then((s) => {
    values.lastName = s
  })
// use cy.wrap to work with an object "values"
// the assertion "deep.equal" will execute AFTER
// every field value is placed into the wrapped object
cy.wrap(values).should('deep.equal', {
  firstName: 'Joe',
  lastName: 'Smith',
})
```

<!-- fiddle-end -->

## Reusable function

Let's write a reusable function that returns a Cypress chain that yields the wrapped object

<!-- fiddle Multiple fields / reusable function -->

```html
<form>
  <label for="fname">First name:</label><br />
  <input type="text" id="fname" name="fname" value="Joe" /><br />
  <label for="lname">Last name:</label><br />
  <input type="text" id="lname" name="lname" value="Smith" />
</form>
```

```js
function getMultipleFields(selectors) {
  // this object will collect the values from every field
  const values = {}
  // return the "cy" command chain
  return cy
    .wrap(selectors)
    .each((selector) => {
      cy.get(selector)
        .invoke('attr', 'value')
        .then((s) => {
          values[selector] = s
        })
    })
    .then(() => {
      // by now all input elements were queried
      // return the wrapped "values" object
      return cy.wrap(values)
    })
}

// the "getMultipleFields" yields the object
// with input field values stores by selector
getMultipleFields(['#fname', '#lname']).should('deep.equal', {
  '#fname': 'Joe',
  '#lname': 'Smith',
})
```

<!-- fiddle-end -->

## Custom command

We can also write a [custom Cypress command](https://glebbahmutov.com/blog/writing-custom-cypress-command/):

<!-- fiddle Multiple fields / custom command -->

```html
<form>
  <label for="fname">First name:</label><br />
  <input type="text" id="fname" name="fname" value="Joe" /><br />
  <label for="lname">Last name:</label><br />
  <input type="text" id="lname" name="lname" value="Smith" />
</form>
```

```js
Cypress.Commands.add('getMultipleFields', (selectors) => {
  const values = {}
  selectors.forEach((selector) => {
    cy.get(selector)
      .invoke('attr', 'value')
      .then((s) => {
        values[selector] = s
      })
  })

  // the custom command should yield the values of values
  cy.wrap(values)
})

// call the custom command and assert the yielded object
cy.getMultipleFields(['#fname', '#lname']).should('deep.equal', {
  '#fname': 'Joe',
  '#lname': 'Smith',
})
```

<!-- fiddle-end -->

## Reusable function with aliases

If we need to get text / values from multiple page elements, we can write separate Cypress chains, saving each value under an alias. Then we can get the multiple values from the test context properties using the `function () { ... }` callback syntax.

<!-- fiddle Multiple fields / aliases -->

```html
<form>
  <label for="fname">First name:</label><br />
  <input type="text" id="fname" name="fname" value="Joe" /><br />
  <label for="lname">Last name:</label><br />
  <input type="text" id="lname" name="lname" value="Smith" />
</form>
```

```js
function getFormValues() {
  return (
    cy
      .get('form')
      .within(() => {
        cy.get('#fname').invoke('val').as('fname')
        cy.get('#lname').invoke('val').as('lname')
      })
      // by using "function (){...}" callback
      // we bind the "this" reference to the test context object
      // where every alias created using "cy.as(<name>)" command
      // is stored automatically as a property <name>
      .then(function () {
        // We can return an object with the values
        // Tip: use Lodash _.pick function
        // to pick list of properties from a larger object
        return Cypress._.pick(this, ['fname', 'lname'])
      })
  )
}

getFormValues().should('deep.equal', {
  fname: 'Joe',
  lname: 'Smith',
})
// change the input values and confirm
cy.get('#fname').clear().type('Anna')
cy.get('#lname').clear().type('Vine')
getFormValues().should('deep.equal', {
  fname: 'Anna',
  lname: 'Vine',
})
```

<!-- fiddle-end -->

## Related

See the recipe [Get form input using label](./form-input-by-label.md)
