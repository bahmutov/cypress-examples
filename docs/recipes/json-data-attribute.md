# Json Data Attribute

<!-- fiddle Get Json Data Attribute -->

```html
<div id="person" data-field='{"name": "Joe", "age": 10}'>
  First person
</div>
```

```js
cy.get('#person')
  .should('have.attr', 'data-field')
  .should('be.a', 'string')
  // we want to parse the string and then check
  // the property inside
  .and((s) => {
    const o = JSON.parse(s)
    expect(o, 'parsed').to.have.property('age', 10)
  })
```

<!-- fiddle-end -->
