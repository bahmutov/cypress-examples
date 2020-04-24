# Files

Examples of using files to represent data, read data or write data in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [cy.fixture()](https://on.cypress.io/fixture)

To load a fixture, use the `cy.fixture()` command.

<!-- fiddle cy.fixture() - load a fixture -->

```html
<button class="fixture-btn btn btn-primary">Get Comment</button>
<div class="fixture-comment"></div>
<script>
  const root = 'https://jsonplaceholder.cypress.io'

  function getComment() {
    $.ajax({
      url: `${root}/comments/1`,
      method: 'GET',
    }).then(function (data) {
      $('.network-comment').text(data.body)
    })
  }

  $('.fixture-btn').on('click', function (e) {
    e.preventDefault()
    getComment(e)
  })
</script>
```

```js
// Instead of writing a response inline you can
// use a fixture file's content.

cy.server()
cy.fixture('example.json').as('comment')
cy.route('GET', 'comments/*', '@comment').as('getComment')

// we have code that gets a comment when
// the button is clicked in scripts.js
cy.get('.fixture-btn').click()

cy.wait('@getComment')
  .its('responseBody')
  .should('have.property', 'name')
  .and('include', 'Using fixtures to represent data')

// you can also just write the fixture in the route
cy.route('GET', 'comments', 'fixture:example.json').as('getComment')

// we have code that gets a comment when
// the button is clicked in scripts.js
cy.get('.fixture-btn').click()

cy.wait('@getComment')
  .its('responseBody')
  .should('have.property', 'name')
  .and('include', 'Using fixtures to represent data')

// or write fx to represent fixture
// by default it assumes it's .json
cy.route('GET', 'comments', 'fx:example').as('getComment')

// we have code that gets a comment when
// the button is clicked in scripts.js
cy.get('.fixture-btn').click()

cy.wait('@getComment')
  .its('responseBody')
  .should('have.property', 'name')
  .and('include', 'Using fixtures to represent data')
```

<!-- fiddle-end -->

## cy.fixture or require

You can use `require` to load JSON fixtures.

<!-- could not make this test work yet -->
<!-- fiddle.skip cy.fixture() or require - load a fixture' -->

```js
// we are inside the "function () { ... }"
// callback and can use test context object "this"
// "this.example" was loaded in "beforeEach" function callback
expect(this.example, 'fixture in the test context').to.deep.equal(
  requiredExample,
)

// or use "cy.wrap" and "should('deep.equal', ...)" assertion
// @ts-ignore
cy.wrap(this.example, 'fixture vs require').should(
  'deep.equal',
  requiredExample,
)
```

<!-- fiddle-end -->

## [cy.readFile()](https://on.cypress.io/readfile)

To read a file's content, use the `cy.readFile()` command.

<!-- fiddle cy.readFile() - read file contents' -->

```js
// You can read a file and yield its contents
// The filePath is relative to your project's root.
cy.readFile('cypress.json').then((json) => {
  expect(json).to.be.an('object')
})
```

<!-- fiddle-end -->

## [cy.writeFile()](https://on.cypress.io/writefile)

To write to a file with the specified contents, use the `cy.writeFile()` command.

<!-- fiddle cy.writeFile() - write to a file -->

```js
// https://on.cypress.io/writefile

// You can write to a file

// Use a response from a request to automatically
// generate a fixture file for use later
cy.request('https://jsonplaceholder.cypress.io/users').then(
  (response) => {
    cy.writeFile('cypress/fixtures/users.json', response.body)
  },
)
cy.fixture('users').should((users) => {
  expect(users[0].name).to.exist
})

// JavaScript arrays and objects are stringified
// and formatted into text.
cy.writeFile('cypress/fixtures/profile.json', {
  id: 8739,
  name: 'Jane',
  email: 'jane@example.com',
})

cy.fixture('profile').should((profile) => {
  expect(profile.name).to.eq('Jane')
})
```

<!-- fiddle-end -->
