# Form values

Let's take a `FORM` element and confirm the values the user has entered.

<!-- fiddle form values -->

```html
<form method="POST" id="signup-form" class="signup-form">
  <div class="form-row">
    <div class="form-group">
      <label for="first_name">First name</label>
      <input
        type="text"
        class="form-input"
        name="first_name"
        id="first_name"
        value="Joe"
      />
    </div>
    <div class="form-group">
      <label for="last_name">Last name</label>
      <input
        type="text"
        class="form-input"
        name="last_name"
        id="last_name"
        value="Smith"
      />
    </div>
  </div>
  <div class="form-row">
    <div class="form-group form-icon">
      <label for="birth_date">Birth date</label>
      <input
        type="text"
        class="form-input"
        name="birth_date"
        id="birth_date"
        placeholder="MM-DD-YYYY"
      />
    </div>
    <div class="form-radio">
      <label for="gender">Gender</label>
      <div class="form-flex">
        <input
          type="radio"
          name="gender"
          value="male"
          id="male"
          checked="checked"
        />
        <label for="male">Male</label>
        <input
          type="radio"
          name="gender"
          value="female"
          id="female"
        />
        <label for="female">Female</label>
      </div>
    </div>
  </div>
  <div class="form-group">
    <label for="phone_number">Phone number</label>
    <input
      type="number"
      class="form-input"
      name="phone_number"
      id="phone_number"
    />
  </div>
  <div class="form-row">
    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        class="form-input"
        name="password"
        id="password"
        value="abc1234"
      />
    </div>
    <div class="form-group">
      <label for="re_password">Repeat your password</label>
      <input
        type="password"
        class="form-input"
        name="re_password"
        id="re_password"
        value="abc1234"
      />
    </div>
  </div>
  <div class="form-text">
    <a href="#" class="add-info-link">Additional info</a>
    <div class="add_info">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-input"
          name="email"
          id="email"
        />
      </div>
      <div class="form-group">
        <label for="country">Country</label>
        <div class="select-list">
          <select name="country" id="country" required>
            <option value="US" selected>United State</option>
            <option value="UK">Great Britain</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="city">City</label>
        <div class="select-list">
          <select name="city" id="city" required>
            <option value="NY">New York</option>
            <option value="BO" selected>Boston</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="form-group">
    <input
      type="submit"
      name="submit"
      id="submit"
      class="form-submit"
      value="Submit"
    />
  </div>
</form>
```

We can confirm the individual input elements in the form

```js
// limit all queries to the found form
// using https://on.cypress.io/within
cy.get('#signup-form').within(() => {
  cy.get('#first_name').should('have.value', 'Joe')
  cy.get('#last_name').should('have.value', 'Smith')
  cy.get('#country').should('have.value', 'US')
  cy.get('#city').should('have.value', 'BO')
  // confirm the password field value
  // matches the confirmation field value
  cy.get('#password')
    .invoke('val')
    .then((password) => {
      // note that the Command Log shows the
      // value of the field, might leak
      // sensitive data
      // read https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/
      // on how to avoid this
      cy.get('#re_password').should('have.value', password)
    })
})
```

```js
cy.get('#signup-form')
  .should('have.length', 1)
  // from the jQuery object
  // grab the first element (the form)
  // and its property "elements" which
  // gives all the input elements and their values
  .its('0.elements')
  // we are not interested in every field
  // just a few main ones. We pick them using
  // the Lodash library bundled with Cypress
  .then((o) =>
    Cypress._.pick(
      o,
      'first_name',
      'last_name',
      'password',
      're_password',
      'country',
      'city',
    ),
  )
  .then((elements) =>
    // the elements is a collection of HTML input elements
    // we can map the HTML elements to their values
    // using the Lodash _.mapValues function
    Cypress._.mapValues(elements, (el, key) => {
      return el.value
    }),
  )
  .then((formValues) => {
    // now that we have an object with values
    // we can confirm the entered values
    expect(formValues).to.deep.include({
      first_name: 'Joe',
      last_name: 'Smith',
      city: 'BO',
      country: 'US',
    })
    // we do not confirm the password, just
    // that it equals the re-entered password
    if (formValues.password !== formValues.re_password) {
      throw new Error('Password must match')
    }
  })
```

Alternative solution: construct the `FormData` object

```js
cy.get('#signup-form')
  .then(($form) => new FormData($form[0]))
  .then(Object.fromEntries)
  .should('deep.include', {
    first_name: 'Joe',
    last_name: 'Smith',
    city: 'BO',
    country: 'US',
  })
```

<!-- fiddle-end -->

Tip: for better object validation, take a look at [cy-spok](https://github.com/bahmutov/cy-spok) plugin.
