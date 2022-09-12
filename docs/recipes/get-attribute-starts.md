# Get By Attribute That Starts With String X

<!-- fiddle Get labels that start with today or tomorrow -->

```html
<ol id="pickup">
  <li>
    <label data-label="missed">Yesterday</label>
  </li>
  <li>
    <label data-label="Today 10am-11am">Today 10am-11am</label>
  </li>
  <li>
    <label data-label="Today 2pm-3pm">Today 2pm-3pm</label>
  </li>
  <li>
    <label data-label="Tomorrow 10am-11am"
      >Tomorrow 10am-11am</label
    >
  </li>
</ol>
```

```js
// get all labels with "data-label" that start with "Today"
// or start with "Tomorrow"
cy.get('[data-label^=Today],[data-label^=Tomorrow]').should(
  'not.be.empty',
)
```

Let's say we need to get the first available time slot, which can be only the ones that are today or tomorrow.

```js
cy.get('[data-label^=Today],[data-label^=Tomorrow]')
  .first()
  .should('be.visible')
```

Alternatively, we notice that the labels have the text we can use, thus `cy.contains` command with a regular expression works here.

```js
cy.contains('label', /^Today|Tomorrow/).should('be.visible')
```

<!-- fiddle-end -->
