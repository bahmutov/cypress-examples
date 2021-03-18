# Conditional testing

Conditional testing is [strongly discouraged](https://on.cypress.io/conditional-testing) in Cypress. But if you _must_ do something conditionally in Cypress depending on the page, here are few examples.

## Toggle checkbox

Let's say that you have a checkbox when the page loads. Sometimes the checkbox is checked, sometimes not. How do you toggle the checkbox?

<!-- fiddle Toggle first solution-->

```html
<div>
  <input type="checkbox" id="done" />
  <label for="done">Toggle me!</label>
</div>
<script>
  // sometimes the checkbox is checked
  const dice = Math.random()
  if (dice < 0.5) {
    document.querySelector('input').checked = true
  }
</script>
```

```js
// first solution using jQuery $.prop
cy.get('input').then(($checkbox) => {
  const initial = Boolean($checkbox.prop('checked'))
  // let's toggle
  cy.log(`Initial checkbox: **${initial}**`)
  // toggle the property "checked"
  $checkbox.prop('checked', !initial)
})
```

<!-- fiddle-end -->

Alternative solution

<!-- fiddle Toggle second solution -->

```html
<div>
  <input type="checkbox" id="done" />
  <label for="done">Toggle me!</label>
</div>
<script>
  // sometimes the checkbox is checked
  const dice = Math.random()
  if (dice < 0.5) {
    document.querySelector('input').checked = true
  }
</script>
```

```js
cy.get('input')
  .as('checkbox')
  .invoke('is', ':checked') // use jQuery $.is(...)
  .then((initial) => {
    cy.log(`Initial checkbox: **${initial}**`)
    if (initial) {
      cy.get('@checkbox').uncheck()
    } else {
      cy.get('@checkbox').check()
    }
  })
```

<!-- fiddle-end -->

## Element does not exist or is invisible

Imagine we want to pass the test if the element does not exist or is invisible. We will use [Cypress.dom](../cypress-api/index.md) utility methods and retry the assertion using [.should(cb)](../commands/assertions.md) method.

<!-- fiddle Does not exist or is invisible -->

```html
<div id="either">
  <div id="disappears">Should go away</div>
  <div id="hides">Should not see me</div>
</div>
<script>
  setTimeout(() => {
    const disappears = document.getElementById('disappears')
    disappears.parentNode.removeChild(disappears)
  }, 500)

  setTimeout(() => {
    const hides = document.getElementById('hides')
    hides.style.display = 'none'
  }, 1000)
</script>
```

```js
const isNonExistentOrHidden = ($el) =>
  !Cypress.dom.isElement($el) || !Cypress.dom.isVisible($el)

// let's assert an element does not exist
cy.get('#either #disappears').should(($el) => {
  expect(isNonExistentOrHidden($el)).to.be.true
})
// let's assert an element becomes invisible
cy.get('#either #hides').should(($el) => {
  expect(isNonExistentOrHidden($el)).to.be.true
})
```

<!-- fiddle-end -->

## Click a button if a class is present

Sometimes you want to click the button, but only if the element has a class

<!-- fiddle Click a button if a class is present -->

```html
<button id="first" class="urgent important" disabled="disabled">
  Click NOW
</button>
<script>
  // notice that at first the button is disabled
  // and we need to use the built-in action checks in cy.click
  const first = document.getElementById('first')
  first.addEventListener('click', () => {
    console.log('first click')
  })
  // remove the disabled property
  setTimeout(() => {
    first.disabled = false
  }, 1000)
</script>
```

```js
// spy on the console.log to make sure it is called
cy.window()
  .its('console')
  .then((console) => cy.spy(console, 'log').as('log'))

cy.get('#first').then(($first) => {
  if ($first.hasClass('important')) {
    // note that we cannot simply use jQuery .click() method
    // since it won't wait for the button to be enabled
    // $first.click()
    // instead we wrap the element and use the cy.click() command
    cy.wrap($first).click()
  }
})
// confirm the button was called correctly
cy.get('@log').should('be.calledOnceWith', 'first click')
```

<!-- fiddle-end -->
