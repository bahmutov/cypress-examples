# Paste event

<!-- fiddle paste into a text area -->

```html hide
<textarea id="txt"></textarea>
<script>
  document
    .getElementById('txt')
    .addEventListener('paste', (e) => {
      if (window.Cypress) {
        // using synthetic events does not paste text
        // thus we need to do it ourselves
        // so if we are inside a Cypress test
        // (synthetic JS events), then set the value of the textarea
        e.target.value = e.clipboardData.getData('text')
      }
    })
</script>
```

```js
Cypress.Commands.add(
  'paste',
  { prevSubject: true, element: true },
  ($element, data) => {
    const clipboardData = new DataTransfer()
    clipboardData.setData('text', data)
    const pasteEvent = new ClipboardEvent('paste', {
      bubbles: true,
      cancelable: true,
      data,
      clipboardData,
    })

    cy.get($element).then(() => {
      $element[0].dispatchEvent(pasteEvent)
    })
  },
)
```

```js
const greeting = `hello ${Cypress._.random(1, 1e6)}`
cy.get('#txt').paste(greeting).should('have.value', greeting)
```

<!-- fiddle-end -->
