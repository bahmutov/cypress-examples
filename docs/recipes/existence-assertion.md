# Built-in Existence Assertion

📺 Watch this recipe explained in the video [Built-in Existence Assertion](https://youtu.be/hLHYacIUO9I).

Cypress [querying commands](../commands/querying.md) have a built-in existence assertion. The following commands are equivalent:

```js
cy.get('selector').should('exist')
// same as
cy.get('selector')

cy.contains('selector', /regex/).should('exist')
// same as
cy.contains('selector', /regex/)

cy.get('parent selector')
  .should('exist')
  .find('child selector')
  .should('exist')
// same as
cy.get('parent selector').find('child selector')
```

## Element does not exist

If you want to test the opposite, if you want to confirm the element does not exist, then add `should('not.exist')` assertion.

```js
cy.get('selector').should('not.exist')
```

## Disable the built-in existence assertion

Any assertion attached to a DOM querying command disables the built-in existence assertion. The most common situation is attaching a `should(empty callback)` assertion to perform [conditional testing](./conditional-testing.md). For example, let's click the button if it exists on the page. If the button does not exist, we continue to the next part:

```js
cy.get('button')
  // disable the built-in existence assertion
  // by attaching a dummy should(callback) assertion
  .should(() => {})
  .then(($button) => {
    // if jQuery object has an element inside
    // then click on it
    if ($button.length) {
      cy.wrap($button).click()
    }
  })
```

## Empty jQuery object

If you disable the built-in existence assertion, then it is on you to confirm the element is present or not.

<!-- fiddle Empty jQuery element -->

```html
<div id="parent">Hello</div>
```

The code below looks weird. It finds the non-existence element "child" and confirms its text is an empty string.

```js
cy.get('#parent')
  .should('be.visible')
  .find('child')
  .should(($el) => {
    expect($el.text()).to.equal('')
  })
```

Once you realize that `should($el)` disables the built-in existence assertion, then the code is clear. You get an empty jQuery object `$el`. If you call `$().text()`, it returns an empty string.

```js
expect(Cypress.$().text(), 'empty jQuery text').to.equal('')
```

What do you expect to find on the page? If the `child` element MUST be present, then explicitly check for it before passing the object to the next callback to check its text. For example, let's confirm the text in the parent element:

```js
cy.get('#parent')
  .should('be.visible')
  .and('exist')
  .and(($el) => {
    expect($el.text()).to.equal('Hello')
  })
```

**Tip:** `cy.should` and `cy.and` are aliases to the same method. I usually use `cy.and` to make the test code more readable.

If you are not sure if the element is present, then check the jQuery object inside the `should(callback)`

```js
cy.get('#parent')
  .should('be.visible')
  .find('child')
  .should(($el) => {
    if ($el.length) {
      // child element exists
      // let's check its text
      expect($el.text()).to.equal('')
    }
  })
```

<!-- fiddle-end -->

**Tip:** not knowing what to expect to find on the page is a sign of a bad test. Try to control your data and avoid "if / else" conditional testing.
