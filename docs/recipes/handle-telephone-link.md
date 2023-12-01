# Handle Telephone Links

<!-- fiddle Confirm the telephone protocol URL -->

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
