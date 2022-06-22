# Keep it simple

<!-- fiddle Keep it simple -->

Cypress has Chai, Chai-jQuery, Chai-Sinon assertions bundled, thus if you have a value, you can simply use `expect(value).to...` assertions to use it. No need to wrap the value using the `cy.wrap` command simply to call `cy.wrap(value).should(...)`.

```js
// ⚠️ COMPLICATED WAY
cy.wrap('CYPRESSIO').as('text')
cy.get('@text').should('match', /cypress/i)
// of course, the above is possible, but wrapping
// a value, adding an alias, then getting it back
// just to check if the value matches a regular expression
// ✅ RECOMMENDED
expect('CYPRESSIO').to.match(/cypressio/i)
```

For more examples, see the [Assertions page](./../commands/assertions.md).

<!-- fiddle-end -->
