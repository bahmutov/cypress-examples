# Sibling element

<!-- fiddle Sibling element -->

In the example below we do not have a good selector for the warning below the user name. How do we find it?

```html
<div class="user">
  <div class="name">Joe Smith</div>
  <p>Email not verified</p>
</div>
<style>
  .name {
    font-size: x-large;
  }
</style>
```

By using a CSS sibling selector `+`

```js
cy.get('.name')
  .should('include.text', 'Joe')
  .find('+ p')
  .should('have.text', 'Email not verified')
// we can use the combined selector right away
cy.contains('.name + p', 'Email not verified').should(
  'be.visible',
)
```

You can also use the [cy.next](https://on.cypress.io/next) command

```js
cy.get('.name')
  .should('include.text', 'Joe')
  .next('p') // cy.next allows using a selector
  .should('have.text', 'Email not verified')
```

<!-- fiddle-end -->

## Multiple elements

The sibling CSS selector returns multiple elements, one for each of the initial elements.

<!-- fiddle.only Multiple elements -->

```html
<div class="person">Employee 1</div>
<p>Joe</p>
<p>hourly</p>
<p class="age">27</p>
<div class="person">Employee 2</div>
<p>Anna</p>
<p>fulltime</p>
<p class="age">25</p>
```

Let's say we want to select just the names. Each name `p` is a sibling of the `.person` element.

```js
cy.get('.person + p')
  .should('have.length', 2)
  .spread((first, second) => {
    expect(first, 'first name').to.have.text('Joe')
    expect(second, 'second name').to.have.text('Anna')
  })
```

The above can be expressed using `cy.next` command

```js
cy.get('.person')
  .next() // immediate sibling
  .spread((first, second) => {
    expect(first, 'first name').to.have.text('Joe')
    expect(second, 'second name').to.have.text('Anna')
  })
  .next()
  .next()
  .should('have.class', 'age')
```

<!-- fiddle-end -->
