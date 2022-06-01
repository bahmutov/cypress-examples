# Dialog HTML Element

This recipe shows how to test the new [HTML Dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)

## Modeless OK dialog

<!-- fiddle Modeless OK dialog -->

```html
<dialog open data-cy="ok-example">
  <p>Greetings, one and all!</p>
  <form method="dialog">
    <button>OK</button>
  </form>
</dialog>
```

```js
cy.get('dialog[data-cy=ok-example]')
  .should('be.visible')
  .contains('button', 'OK')
  .click()
cy.get('dialog').should('not.be.visible')
```

<!-- fiddle-end -->

## Modal with a form

<!-- fiddle Modal with a form -->

```html
<dialog id="favDialog">
  <form method="dialog">
    <p>
      <label
        >Favorite animal:
        <select>
          <option value="default">Choose...</option>
          <option>Brine shrimp</option>
          <option>Red panda</option>
          <option>Spider monkey</option>
        </select>
      </label>
    </p>
    <div>
      <button value="cancel">Cancel</button>
      <button id="confirmBtn" value="default">Confirm</button>
    </div>
  </form>
</dialog>
<p>
  <button id="updateDetails">Update details</button>
</p>
<output></output>
<script>
  const updateButton = document.getElementById('updateDetails')
  const favDialog = document.getElementById('favDialog')
  const outputBox = document.querySelector('output')
  const selectEl = favDialog.querySelector('select')
  const confirmBtn = favDialog.querySelector('#confirmBtn')

  // If a browser doesn't support the dialog, then hide the
  // dialog contents by default.
  if (typeof favDialog.showModal !== 'function') {
    favDialog.hidden = true
    /* a fallback script to allow this dialog/form to function
     for legacy browsers that do not support <dialog>
     could be provided here.
  */
  }
  // "Update details" button opens the <dialog> modally
  updateButton.addEventListener('click', function onOpen() {
    if (typeof favDialog.showModal === 'function') {
      favDialog.showModal()
    } else {
      outputBox.value =
        'Sorry, the <dialog> API is not supported by this browser.'
    }
  })
  // "Favorite animal" input sets the value of the submit button
  selectEl.addEventListener('change', function onSelect(e) {
    confirmBtn.value = selectEl.value
  })
  // "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
  favDialog.addEventListener('close', function onClose() {
    outputBox.value = favDialog.returnValue + ' button clicked'
  })
</script>
```

```js
cy.get('#updateDetails').click()
cy.get('#favDialog')
  .should('be.visible')
  // Dialog element has attribute "open"
  // that tells us its current status
  .and('have.attr', 'open', 'open')
  .find('form')
  .within(() => {
    cy.get('select').select('Red panda')
    cy.contains('button', 'Confirm').click()
  })
cy.get('dialog').should('not.be.visible')
cy.contains('output', 'Red panda button clicked')
```

<!-- fiddle-end -->
