# Conditional Accept

## Either dialog can appear

Imagine the application developers are condition A/B experiments to see which "Accept terms and conditions" [HTML Dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) works best.

<!-- fiddle Accept one of the two dialogs -->

```html hide
<button id="continue">Continue to accept</button>
<!-- the first experiment -->
<dialog id="accept1">
  <input type="checkbox" id="accept1box" />
  <label>Accept terms and conditions</label>
  <br />
  <button id="accept1close" disabled>Accept</button>
</dialog>
<!-- the second experiment -->
<dialog id="accept2">
  <p>
    By clicking this button, you accept the terms and conditions
  </p>
  <button id="accept2close">Accept all</button>
</dialog>
<script>
  document
    .getElementById('continue')
    .addEventListener('click', () => {
      // the conditional experiment
      // have of users will see the first dialog
      // the other users will see the second dialog
      const chance = Math.random()
      console.log('chance %f', chance)
      if (chance < 0.5) {
        document.getElementById('accept1').showModal()
      } else {
        document.getElementById('accept2').showModal()
      }
    })
  // the first experiment code
  document
    .getElementById('accept1box')
    .addEventListener('click', (e) => {
      if (e.target.checked) {
        document
          .getElementById('accept1close')
          .removeAttribute('disabled')
      }
    })
  document
    .getElementById('accept1close')
    .addEventListener('click', () => {
      document.getElementById('accept1').close()
    })
  // the second experiment code
  document
    .getElementById('accept2close')
    .addEventListener('click', () => {
      document.getElementById('accept2').close()
    })
</script>
```

At the start, both dialogs are present in the document.

```js
cy.get('dialog')
  .should('have.length', 2)
  .each(($dialog, k) => {
    expect($dialog, `dialog ${k + 1}`).to.not.be.visible
  })
```

```js
cy.get('button#continue').click()
// to make the demo clear, delay by 1 second
cy.wait(1000, { log: false })
// get the visible dialog
cy.get('dialog#accept1:visible, dialog#accept2:visible').then(
  ($dialog) => {
    expect($dialog, 'one element only').to.have.length(1)
    // we know the dialog is one of the two possible dialogs
    // use https://api.jquery.com/is/ to determine which flow to use
    if ($dialog.is('#accept1')) {
      cy.log('**dialog 1**')
      cy.get('#accept1box').check()
      cy.get('button#accept1close').click()
      cy.get('dialog#accept1').should('not.be.visible')
    } else {
      cy.log('**dialog 2**')
      cy.get('button#accept2close').click()
      cy.get('dialog#accept2').should('not.be.visible')
    }
  },
)
```

<!-- fiddle-end -->

## See also

- [Conditional Testing](./conditional-testing.md)
- [Dialog HTML Element](./dialog-element.md)
