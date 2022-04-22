# Replace all

Let's say the user enters the phone number, possibly formatting the phone number with `-` characters or not. Before confirming the value, we want to remove all `-` characters. We can use `String.prototype.replaceAll` method to do this.

<!-- fiddle Replace all -->

```html
<input type="text" id="phone" value="202-123-4567" />
```

```js
// get the input element using cy.get command
cy.get('#phone')
  // to get the value of an <input> element
  // we should use the jQuery val() method
  .invoke('val')
  // we are now dealing with a string
  // and can call String.prototype.replaceAll
  // to remove "-" characters that might be present
  .invoke('replaceAll', '-', '')
  // check the phone number against the expected one
  .should('equal', '2021234567')
```

<!-- fiddle-end -->
