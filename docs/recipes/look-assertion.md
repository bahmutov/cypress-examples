# HTML Should Look Assertion

Plugin [cypress-map](https://github.com/bahmutov/cypress-map) has "should look" assertion that performs partial HTML element match. It lets you check the _important_ elements and their attributes only. For example, let's validate the `dialog` element and its contents.

<!-- fiddle Should look assertion -->

```html
<dialog open data-cy="ok-example">
  <p class="xyz greeting">Greetings, one and all!</p>
  <form method="dialog">
    <button>OK</button>
  </form>
</dialog>
```

We want to confirm that the dialog has the attribute "open" and has the paragraph element with the class "greeting". Dialog also should have a form and button with the text "OK".

We are not interested in the text inside the paragraph element. We also don't want to validate any other classes on this element.

```js
cy.get('[data-cy=ok-example]')
  .should(
    'look',
    `
      <dialog open>
        <p class="greeting"></p>
        <form>
          <button>OK</button>
        </form>
      </dialog>
    `,
  )
  .and('be.visible')
  // yields the subject element
  .contains('button', 'OK')
  .wait(1000)
  .click()
cy.get('[data-cy=ok-example]').should('be.hidden')
```

<!-- fiddle-end -->
