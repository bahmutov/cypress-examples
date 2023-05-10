# Hide Input Fields Before Taking A Screenshot

Imagine you want to show a screenshot of the form. By default it shows the account id in clear text, but you might not want it visible in the screenshot. We can hide the input value by changing the input field to type "password" before taking the screenshot.

<!-- fiddle Hide input fields -->

```css hide
#account {
  padding-top: 1rem;
  padding-left: 1rem;
}
```

```html hide
<div id="account">
  <div class="form-row">
    <div class="form-group">
      <label for="account-id">Account ID</label>
      <input
        type="text"
        class="form-input"
        name="account-id"
        id="account-id"
        value="7e075-d745273-cb32829"
      />
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label for="auth-token">Auth Token</label>
      <input
        type="password"
        class="form-input"
        name="auth-token"
        id="auth-token"
        value="f0a40354e095146a40a589"
      />
    </div>
  </div>
</div>
```

```js
// change the account input element to "type=password" to hide the value
cy.get('#account-id').invoke('attr', 'type', 'password')
// now take the screenshot
cy.get('#account').screenshot('account', {
  overwrite: true,
})
```

The screenshot hides both sensitive pieces of information

![Account screenshot](./pics/account.png)

<!-- fiddle-end -->

## See also

- [Hide Email](./hide-email.md)
- [Password Is Hidden](./password-is-hidden.md)
