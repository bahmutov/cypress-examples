# Aliasing

Examples of referencing DOM elements or resources for later use in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## .as

### Alias a DOM element

<!-- fiddle .as() - alias a DOM element for later use -->

```html
<table class="as-table table table-bordered">
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Row 1: Cell 1
        <button class="btn btn-primary">Change</button>
      </td>
      <td>
        Row 1: Cell 2
        <button class="btn btn-primary">Change</button>
      </td>
    </tr>
    <tr>
      <td>
        Row 2: Cell 1
        <button class="btn btn-primary">Change</button>
      </td>
      <td>
        Row 2: Cell 2
        <button class="btn btn-primary">Change</button>
      </td>
    </tr>
  </tbody>
</table>
<script>
  $('.as-table .btn').on('click', function (e) {
    e.preventDefault()
    $(e.currentTarget).addClass('btn-success').text('Changed')
  })
</script>
```

```js
// Alias a DOM element for use later
// We don't have to traverse to the element
// later in our code, we reference it with @

cy.get('.as-table')
  .find('tbody>tr')
  .first()
  .find('td')
  .first()
  .find('button')
  .as('firstBtn')

// when we reference the alias, we place an
// @ in front of its name
cy.get('@firstBtn').click()

cy.get('@firstBtn')
  .should('have.class', 'btn-success')
  .and('contain', 'Changed')
```

<!-- fiddle-end -->

### List example

Another example of aliasing a DOM element

<!-- fiddle .as() - query the alias -->

```html
<ul data-cy="query-the-alias">
  <li>Apple</li>
  <li>Banana</li>
  <li>Grape</li>
</ul>
```

```js
cy.get('[data-cy=query-the-alias]').as('fruits')
// now we can use cy.get to grab the DOM element
cy.get('@fruits')
  .should('have.prop', 'tagName', 'UL')
  .and('be.visible')
// find child elements
cy.get('@fruits').find('li').should('have.length', 3)
cy.get('@fruits').contains('li', 'Banana')
cy.get('@fruits').contains('li', 'Grape')
```

Note: if all the assertions related to the DOM elements are grouped together, it is simpler to use [cy.within](https://on.cypress.io/within) command.

```js
cy.log('**equivalent code using cy.within**')
cy.get('[data-cy=query-the-alias]').within(() => {
  cy.root()
    .should('have.prop', 'tagName', 'UL')
    .and('be.visible')
  cy.get('li').should('have.length', 3)
  cy.contains('li', 'Banana')
  cy.contains('li', 'Grape')
})
```

<!-- fiddle-end -->

### Alias a network route

<!-- fiddle .as() - alias a route for later use -->

```html
<button class="network-btn btn btn-primary">Get Comment</button>
<div class="network-comment"></div>
<script>
  function getComment() {
    // we fetch all data from this REST json backend
    const root = 'https://jsonplaceholder.cypress.io'
    $.ajax({
      url: `${root}/comments/1`,
      method: 'GET',
    }).then(function (data) {
      $('.network-comment').text(data.body)
    })
  }
  $('.network-btn').on('click', function (e) {
    e.preventDefault()
    getComment(e)
  })
</script>
```

```js
// Alias the route to wait for its response
cy.server()
cy.route('GET', 'comments/*').as('getComment')

// we have code that gets a comment when
// the button is clicked in scripts.js
cy.get('.network-btn').click()

// https://on.cypress.io/wait
cy.wait('@getComment').its('status').should('eq', 200)
```

<!-- fiddle-end -->

### Alias values

<!-- fiddle .as() - alias a value for later use -->

```html
<button data-cy="magic-number">42</button>
```

```js
// retrieve the element's text and convert into a number
cy.get('[data-cy=magic-number]')
  .invoke('text')
  .then(parseInt)
  .as('magicNumber')
// saved the value 42 under an alias
// retrieve it some time later
cy.get('@magicNumber').should('equal', 42)
```

<!-- fiddle-end -->

### Test context

The aliased values are set as properties in the `test context` object. You can retrieve them later using `this.alias` syntax **if** you use the `function () {...}` callback syntax.

<!-- fiddle .as() - alias is saved in the test context -->

Let's confirm the two list items have different text.

```html
<ul data-cy="test-context">
  <li>Purple</li>
  <li>Orange</li>
</ul>
```

```js
cy.get('[data-cy=test-context] li')
  .first()
  .invoke('text')
  .as('first')
cy.get('[data-cy=test-context] li')
  .eq(1)
  .invoke('text')
  .as('second')
  .then(function () {
    // by the time this callback runs
    // both "first" and "second" properties are set
    // notice the "function () {...}" syntax
    // to get the "this" to point at the test context object
    expect(this.first)
      .to.equal('Purple') // sanity check
      .and.not.equal(this.second)
  })
```

Alternatively, we could have used `.then` callbacks to get a "pyramid of Doom"

```js
cy.log('**using callbacks**')
cy.get('[data-cy=test-context] li')
  .first()
  .invoke('text')
  .then((first) => {
    cy.get('[data-cy=test-context] li')
      .eq(1)
      .invoke('text')
      .then((second) => {
        expect(first)
          .to.equal('Purple') // sanity check
          .and.not.equal(second)
      })
  })
```

Finally, we could have used local variables

```js
let first, second
cy.log('**using variables**')
cy.get('[data-cy=test-context] li')
  .first()
  .invoke('text')
  .then((x) => (first = x))

cy.get('[data-cy=test-context] li')
  .eq(1)
  .invoke('text')
  .then((x) => (second = x))

// by the time this callback runs, both local
// variables are set
cy.then((second) => {
  expect(first)
    .to.equal('Purple') // sanity check
    .and.not.equal(second)
})
```

<!-- fiddle-end -->
