# HTML Should Look Assertion

Plugin [cypress-map](https://github.com/bahmutov/cypress-map) has "should look" assertion that performs partial HTML element match. It lets you check the _important_ elements and their attributes only. For example, let's validate the `dialog` element and its contents.

📺 Watch this recipe explained in the video [Custom Cypress HTML Should Look Assertion](https://youtu.be/7j6vwy6cX_w).

<!-- fiddle Should look assertion -->

```html
<dialog open data-cy="ok-example">
  <p class="xyz greeting">Greetings, one and all!</p>
  <form method="dialog">
    <button>OK</button>
  </form>
</dialog>
```

We want to confirm that the dialog has the attribute "open" and has the paragraph element with the class "greeting". Dialog also should have a form and button with the text "OK". We are not interested in the text inside the paragraph element. We also don't want to validate any other classes on this element.

Let's try validating all the requirements using "normal" Cypress commands and assertions.

```js hide
cy.get('[data-cy=ok-example]')
  .should('be.visible')
  .and('match', 'dialog')
  .and('have.attr', 'open')
// need to grab the dialog element again, since
// the assertion "have.attr" yields the value
cy.get('[data-cy=ok-example]').within(() => {
  cy.get('p.greeting')
  cy.get('form').find('button').should('have.text', 'OK')
})
```

Pretty verbose. Plus there is a subtle bug. If we change the order of elements in the dialog, like moving the "p" element to be after the "form" element the test still passes. It is hard to validate the relative _order_ of HTML elements.

Now let's validate the same requirements using a single "should look" assertion. We can pass the known "tree" of element markup to match against the potentially larger DOM tree yielded in the current subject.

```js hide
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
  // so we can click on the button inside the dialog
  .contains('button', 'OK')
  .wait(1000)
  .click()
// and verify the dialog closes
cy.get('[data-cy=ok-example]')
  .should('be.hidden')
  .and('not.have.attr', 'open')
```

<!-- fiddle-end -->
