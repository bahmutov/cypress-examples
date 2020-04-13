# Actions

Examples of actions being performed on DOM elements in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [.type()](https://on.cypress.io/type)

To type into a DOM element, use the `.type()` command.

<!-- fiddle type -->

```html
<form>
  <div class="form-group">
    <label for="email1">Email address</label>
    <input
      type="email"
      class="form-control action-email"
      id="email1"
      placeholder="Email"
    />
  </div>
  <div class="form-group">
    <label>Disabled Textarea</label>
    <textarea
      class="form-control action-disabled"
      disabled="disabled"
    ></textarea>
  </div>
</form>
```

```js
cy.get('.action-email')
  .type('fake@email.com')
  .should('have.value', 'fake@email.com')

  // .type() with special character sequences
  .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
  .type('{del}{selectall}{backspace}')

  // .type() with key modifiers
  .type('{alt}{option}') //these are equivalent
  .type('{ctrl}{control}') //these are equivalent
  .type('{meta}{command}{cmd}') //these are equivalent
  .type('{shift}')

  // Delay each keypress by 0.1 sec
  .type('slow.typing@email.com', { delay: 100 })
  .should('have.value', 'slow.typing@email.com')

cy.get('.action-disabled')
  // Ignore error checking prior to type
  // like whether the input is visible or disabled
  .type('disabled error checking', { force: true })
  .should('have.value', 'disabled error checking')
```

<!-- fiddle-end -->

## [.focus()](https://on.cypress.io/focus)

To focus on a DOM element, use the `.focus()` command.

<!-- fiddle.skip focus -->

```html
<form>
  <div class="form-group">
    <label for="password1">Password</label>
    <input
      type="password"
      class="form-control action-focus"
      id="password1"
      placeholder="Password"
    />
  </div>
</form>
```

```js
cy.get('.action-focus')
  .focus()
  .should('have.class', 'focus')
  .prev()
  .should('have.attr', 'style', 'color: orange;')
```

<!-- fiddle-end -->
