# User-invalid CSS Form Validation

<!-- fiddle User-invalid pseudo selector for form validation -->

Testing the [`:user-invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid) CSS selector.

**Note:** this test requires Chrome >= v119

📺 Watch this recipe explained in the video [Test CSS Property :user-invalid Using Cypress E2E Test](https://youtu.be/BWkNZ3qQ7C8).

```html
<form>
  <label for="email">Email *: </label>
  <input id="email" name="email" type="email" required />
  <span></span>
</form>
```

```css
input:user-invalid {
  border: 2px solid red;
}

input:user-invalid + span::before {
  content: '✖';
  color: red;
}
```

Confirm the browser supports `:user-invalid` CSS selector, but first ensure the browser has full support for it.

```js hide
if (Cypress.browser.family !== 'chromium') {
  cy.log('‼️ this test requires a Chromium browser')
  return
}
const version = parseInt(Cypress.browser.majorVersion)
if (version < 119) {
  cy.log('‼️ this test requires Chrome >= v119')
  return
}
```

Enter partial email into the field with `type=email` attribute using `cy.realType` native events from the [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events) plugin.

```js
// we start without any error styles
cy.get('form input#email + span').should('not.be.visible')
cy.log('**Entering invalid string input**')
cy.get('form input#email').focus()
// using cypress-real-events to trigger the browser validation
cy.get('form input#email').realType('not an email')
// remove the focus from the input field
// so the browser knows the user stopped
// interacting with the input field
cy.get('form input#email').blur()
```

The form should trigger `:user-invalid` state, since we stopped interacting with the input field.

```js
cy.log('**check the :user-input CSS is applied**')
cy.get('form input#email + span').should('be.visible')
cy.get('form input#email').should(
  'have.css',
  'border',
  '2px solid rgb(255, 0, 0)',
)
// check the span that shows the cross mark
// needs a little bit of extra code to get the "::before content"
cy.get('form input#email + span')
  .applyToFirstRight(window.getComputedStyle, '::before')
  .invoke('getPropertyValue', 'content')
  .should('equal', '"✖"')
```

<!-- fiddle-end -->

## See also

- [Pseudo CSS selectors](./pseudo-selectors.md)
