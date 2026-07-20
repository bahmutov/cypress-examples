# Paste event

## Synthetic paste event

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

## Real paste event

<!-- fiddle.skip paste into a text area using a real event -->

**Important:** not working yet, asking in [#759](https://github.com/dmtrKovalenko/cypress-real-events/issues/759)

```html
<textarea id="txt"></textarea>
```

```js
// Grant clipboard permissions to the test window origin
cy.wrap(
  Cypress.automation('remote:debugger:protocol', {
    command: 'Browser.grantPermissions',
    params: {
      permissions: ['clipboardReadWrite'],
      origin: window.location.origin,
    },
  }),
)

const text = `Hello, world! ${Cypress._.random(1e6)}`
cy.log(text)
cy.get('#txt').realMouseDown()
cy.get('#txt').focus()
cy.document().invoke('hasFocus').should('be.true')
// cy.window().its('navigator.clipboard').invoke('writeText', text)

cy.get('#txt').focus().realPress(['Meta', 'V'])
// cy.get('#txt').type('{meta}v')
```

<!-- fiddle-end -->
