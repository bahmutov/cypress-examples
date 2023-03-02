# Map input values

Let's grab all input fields and see if we can confirm their values.

<!-- fiddle Map input values -->

```html hide
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
<script>
  // set an input field value after 1 second delay
  setTimeout(() => {
    document.getElementById('birth_date').value = '01-20-1999'
  }, 1000)
</script>
```

Let's grab the form input elements and get the value from each one. We can get the "value" property from each HTML input element.

```js
const expectedValues = [
  'Joe',
  'Smith',
  '01-20-1999',
  'male',
  'female',
  '',
  'abc1234',
  'abc1234',
  '',
  'Submit',
]
```

```js skip
cy.get('#signup-form input')
  .then(($inputs) => Cypress._.map($inputs, (el) => el.value))
  .should('deep.equal', expectedValues)
```

The above code would fail if the values are set after a delay, since `cy.then` does not retry. We could write the entire extraction code in the `should(callback)` function to enable retries:

```js
cy.get('#signup-form input').should(($inputs) => {
  const values = Cypress._.map($inputs, (el) => el.value)
  expect(values).to.deep.equal(expectedValues)
})
```

We can also write the same code using [cypress-map](https://github.com/bahmutov/cypress-map) to take advantage of query chains in Cypress v12+.

```js
cy.get('#signup-form input')
  .map('value')
  .should('deep.equal', expectedValues)
```

<!-- fiddle-end -->

## See also

- [Form values](./form-values.md)
- [jQuery form serializeArray method](./form-serialize-array.md)
- [Form validation](./form-validation.md) recipe
