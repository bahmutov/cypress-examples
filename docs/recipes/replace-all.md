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

Watch the video [Clean Up A Phone Number From An Input Element Before Checking It](https://youtu.be/xoGDeWYovn8).

What if the user could enter the phone number using `-`, ``, and `(`characters? You can call`replaceAll` several times.

```js
// clear the input element and type the same
// number with separator characters
cy.get('#phone')
  .clear()
  .type('(202) 123-4567')
  .invoke('val')
  .invoke('replaceAll', '-', '')
  .invoke('replaceAll', '(', '')
  .invoke('replaceAll', ')', '')
  .invoke('replaceAll', ' ', '')
  // check the phone number against the expected one
  .should('equal', '2021234567')
```

An alternative approach is to use the `String.prototype.replace(regex, ...)` method. For example, we can remove all non-digit characters.

```js
// get the input element using cy.get command
cy.get('#phone')
  // to get the value of an <input> element
  // we should use the jQuery val() method
  .invoke('val')
  // remove all non-digit characters
  // using the regular expression \D
  .invoke('replace', /\D/g, '')
  // check the phone number against the expected one
  .should('equal', '2021234567')
```

<!-- fiddle-end -->
