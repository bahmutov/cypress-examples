# Stub `window.print`

You can find this recipe shown in the video [Stub window.print Method](https://youtu.be/JzJhVEnt22s).

## App calls the `window.print` method

<!-- fiddle Stub window print -->

```html hide
<p>
  Click on the button to print this page
  <button id="print">🖨</button>
</p>
<script>
  document
    .getElementById('print')
    .addEventListener('click', () => {
      window.print()
    })
</script>
```

```js
cy.window().then((w) => {
  cy.stub(w, 'print').as('print')
})
cy.get('#print').click()
cy.get('@print').should('be.calledOnce')
```

<!-- fiddle-end -->

## Onclick button attribute

<!-- fiddle Print is the onclick button attribute -->

```html hide
<p>
  Click on the button to print this page
  <button id="print" onclick="print()">🖨</button>
</p>
```

```js
cy.window().then((w) => {
  cy.stub(w, 'print').as('print')
})
cy.get('#print').click()
cy.get('@print').should('be.calledOnce')
```

<!-- fiddle-end -->
