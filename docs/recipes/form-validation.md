# Form validation

Imagine a form with HTML validations for the input elements. Let's confirm the validation errors are present, if we do not enter the item or pick the wrong quantity.

<!-- fiddle "Form validation" -->

```html
<form id="form-validation" action="/action_page.php">
  <div>
    <label for="item">Item:</label>
    <input id="item" type="text" name="item" required />
  </div>

  <div>
    <label for="quantity">Quantity (between 1 and 5):</label>
    <input
      type="number"
      id="quantity"
      name="quantity"
      min="1"
      max="5"
      required
    />
  </div>

  <input type="submit" />
</form>
```

```js
// the form is invalid due to its input fields
// we can call the native HTML method
cy.get('#form-validation').then(
  ($form) => expect($form[0].checkValidity()).to.be.false,
)
// both input elements are invalid at the start
cy.get('#form-validation :invalid').should('have.length', 2)
cy.get('#item:invalid')
  .invoke('prop', 'validationMessage')
  .should('equal', 'Please fill out this field.')

// let's fill both fields, but if we enter the
// incorrect quantity, it will have its own error message
cy.get('#item').type('Push pin')
cy.log('**numeric input field**')
cy.get('#quantity').type('1000') // too many 📌!
cy.get('#quantity:invalid')
  .invoke('prop', 'validationMessage')
  .should('eq', 'Value must be less than or equal to 5.')
cy.get('#quantity').should('match', ':invalid')
// retrieve the validity object
// https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
cy.get('#quantity:invalid')
  .invoke('prop', 'validity')
  .should('deep.include', {
    rangeOverflow: true,
    rangeUnderflow: false,
    valid: false,
    valueMissing: false,
  })

// form does not submit with invalid values
// NOTE: if we use Cypress cy.submit() command it bypasses HTML checks
// https://on.cypress.io/submit
// so we use cy.click() to experience what the user experiences
cy.get('#form-validation input[type=submit]').click()

// let's enter valid quantity and the form submits
cy.get('#quantity').clear().type('4') // a good number of 📌
// the form is now valid
cy.get('#form-validation').then(
  ($form) => expect($form[0].checkValidity()).to.be.true,
)
// there are no invalid input elements
cy.get('#form-validation :invalid').should('not.exist')
// the quantity input is valid
cy.get('#quantity')
  .should('match', ':valid')
  .and('not.match', ':invalid')
```

<!-- fiddle.end -->
