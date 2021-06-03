# Files

Examples of using files to represent data, read data or write data in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [cy.fixture()](https://on.cypress.io/fixture)

To load a fixture, use the `cy.fixture()` command.

<!-- fiddle cy.fixture() - load a fixture -->

```html
<button class="fixture-btn btn btn-primary">Get Comment</button>
<div class="fixture-comment"></div>
<script>
  function getComment() {
    const root = 'https://jsonplaceholder.cypress.io'
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
<!-- fiddle.skip cy.fixture() or require - load a fixture -->

```js
// we are inside the "function () { ... }"
// callback and can use test context object "this"
// "this.example" was loaded in "beforeEach" function callback
expect(this.example, 'fixture in the test context').to.deep.equal(
  requiredExample,
)

// or use "cy.wrap" and "should('deep.equal', ...)" assertion
cy.wrap(this.example).should('deep.equal', requiredExample)
```

<!-- fiddle-end -->

## [cy.readFile()](https://on.cypress.io/readfile)

To read a file's content, use the `cy.readFile()` command.

<!-- fiddle cy.readFile() - read file contents -->

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

### Writing combined JSON object

Sometimes you want to read an object from a file, add new properties, and then write the result into a JSON file. Just appending to the file would append the text, breaking the JSON format. Instead you can read the file, update the JSON object, then write the combined result back.

<!-- fiddle cy.writeFile() - write combined JSON object -->

```js
// write the initial object
const filename = './person.json'
cy.writeFile(filename, { name: 'Joe' })
// let's add another property
cy.readFile(filename).then((person) => {
  person.dress = 'sharp'
  // write the merged object
  cy.writeFile(filename, person)
})
// verify the file has the combined object
cy.readFile(filename).should('deep.equal', {
  name: 'Joe',
  dress: 'sharp',
})
```

<!-- fiddle-end -->

### Writing combined JSON array

Similarly, to add new items to the array, read the array, add new items, then write the updated array back.

<!-- fiddle cy.writeFile() - write combined JSON array -->

```js
// write the initial list
const filename = './people.json'
cy.writeFile(filename, [{ name: 'Joe' }])
// let's add another person
cy.readFile(filename).then((people) => {
  people.push({ name: 'Mike' })
  // write the merged list
  cy.writeFile(filename, people)
})
// verify the file has the combined array
cy.readFile(filename).should('deep.equal', [
  {
    name: 'Joe',
  },
  {
    name: 'Mike',
  },
])
```

<!-- fiddle-end -->
