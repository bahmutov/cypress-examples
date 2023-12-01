# Handle Telephone Links

<!-- fiddle Confirm the telephone protocol URL -->

📺 Watch this recipe explained in the video [Handle Telephone And Other Custom Protocol Links In Cypress Tests](https://youtu.be/iktuHW7tyiY).

```html
<a id="call" href="">Call ☎️</a>
```

```html hide
<script>
  const numberToCall = '+1 222-333-4567'
  document
    .getElementById('call')
    .addEventListener('click', (e) => {
      e.preventDefault()
      const phoneNumber = numberToCall.replace(/[\s-]/g, '')
      console.log('calling %s', phoneNumber)
      e.target.innerText = numberToCall
      window.navigator.href = 'tel:' + phoneNumber
    })
</script>
```

Our test can register the current browser as a handler for `tel:...` links using the `navigator.registerProtocolHandler` method call. Then opening the link will simply change the app's HREF to the phone number, while the test can continue.

```js
cy.window()
  .its('navigator')
  .invoke('registerProtocolHandler', 'tel', '/tel/%s')
  .wait(1000, { log: false }) // for demo purposes
cy.get('a#call').click()
cy.window()
  .its('navigator.href')
  .should('equal', 'tel:+12223334567')
cy.contains('a#call', '+1 222-333-4567')
```

<!-- fiddle-end -->
