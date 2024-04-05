# Form Submit Button

## Fill the required inputs

<!-- fiddle Fill the required inputs before submit -->

```html hide
<form class="action-form" id="example-form">
  <div class="form-group">
    <label for="item">Item (*)</label>
    <input
      type="text"
      class="form-control"
      id="item"
      name="item"
      required
    />
  </div>
  <div class="form-group">
    <label for="count">Count (*)</label>
    <input
      type="number"
      class="form-control"
      id="count"
      name="count"
      required
    />
  </div>
  <div class="form-group">
    <label for="couponCode1">Coupon Code</label>
    <input
      type="text"
      class="form-control"
      id="couponCode1"
      name="coupon"
    />
  </div>
  <div class="form-group">
    <label for="ZipCode">Zip code (*)</label>
    <input
      type="text"
      class="form-control"
      id="ZipCode"
      name="ZipCode"
      minlength="4"
      required
    />
  </div>
  <button id="submit">Submit</button>
</form>
<script>
  const form = document.getElementById('example-form')
  const submit = document.getElementById('submit')
  function checkForm() {
    const valid = form.checkValidity()
    console.log({ valid })
    if (valid) {
      submit.removeAttribute('disabled')
    } else {
      submit.setAttribute('disabled', 'disabled')
    }
  }
  document
    .querySelectorAll('form#example-form input')
    .forEach((input) => {
      input.addEventListener('keypress', checkForm)
    })
  checkForm()
</script>
```

Initially the "Submit" button is disabled

```js
cy.get('button#submit').should('be.disabled')
```

Let's fill only the required fields

```js
const values = {
  item: 'apples',
  count: 10,
  ZipCode: '90210',
}
Object.entries(values).forEach(([id, value]) => {
  cy.get(`#${id}`).type(String(value))
})
```

Once the required fields have values, the "Submit" button should be enabled.

```js
cy.get('button#submit').should('be.enabled')
```

<!-- fiddle-end -->
