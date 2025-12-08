# Popover

<!--
  enable once we bump to Cypress v15 and newer Electron browser
  https://github.com/bahmutov/cypress-examples/issues/293
-->

<!-- fiddle.skip Open and close a popover using invoker command -->

Requires modern browser that understands both [Popovers](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using) and [Invoker commands](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API)

```html
<button commandfor="mycommandpopover" command="toggle-popover">
  Toggle popover
</button>
<div id="mycommandpopover" popover>Popover content</div>
```

```js
cy.get('#mycommandpopover').should('not.be.visible')
cy.contains('button', 'Toggle popover')
  .should('have.attr', 'command', 'toggle-popover')
  .and('have.attr', 'commandfor', 'mycommandpopover')
  .click()
cy.get('#mycommandpopover').should('be.visible')

cy.log('**close popover**')
cy.contains('button', 'Toggle popover').click()
cy.get('#mycommandpopover').should('not.be.visible')
```

<!-- fiddle-end -->
