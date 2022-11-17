# Concatenate the found labels

Here is another example of getting the data from the page while avoiding the "pyramid of doom" of callbacks. Let's say our page has a couple of labels and we want to find them, extract the text, and maybe form the concatenated string, and check that string.

<!-- fiddle Concatenate the found labels -->

```html
<p>
  This page has <span id="noun">a brown fox</span> that
  <span id="verb">jumped</span> over a
  <span id="adjective">slow</span> down.
</p>
```

```css hide
span {
  font-weight: bolder;
}
```

We can find each word element one by one, passing the text into the `cy.then(callback)` closure.

```js skip
// confirm the words together equal
// 'a brown fox jumped slow'
cy.get('#noun')
  .invoke('text')
  .then((noun) => {
    cy.get('#verb')
      .invoke('text')
      .then((verb) => {
        cy.get('#adjective')
          .invoke('text')
          .then((adjective) => {
            const s = `${noun} ${verb} ${adjective}`
            expect(s, 'concatenated string').to.equal(
              'a brown fox jumped slow',
            )
          })
      })
  })
```

To avoid the pyramid of nested callbacks, let's grab each part of the text and save under an alias using [cy.as](https://on.cypress.io/as) command.

```js
cy.get('#noun').invoke('text').as('noun')
cy.get('#verb').invoke('text').as('verb')
cy.get('#adjective').invoke('text').as('adjective')
```

Now we can grab all these elements at once using `cy.then(function () { ... })` callback form. Every saved alias is available under `this.<alias name>` property.

```js
cy.then(function () {
  const s = `${this.noun} ${this.verb} ${this.adjective}`
  expect(s, 'concatenated string').to.equal(
    'a brown fox jumped slow',
  )
})
```

<!-- fiddle-end -->

**Tip:** you can simplify dealing with aliased values even more by overwriting Cypress commands and assertions as shown in the recipe [Convenient access to aliases values by overwriting the should command](./overwrite-should.md).
