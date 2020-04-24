# Aliasing

Examples of referencing DOM elements or resources for later use in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## .as

<!-- fiddle .as() - alias a DOM element for later use -->

```html
<button class="network-btn btn btn-primary">Get Comment</button>
<div class="network-comment"></div>
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
        Row 1: Cell 1 <button class="btn btn-primary">Change</button>
      </td>
      <td>
        Row 1: Cell 2 <button class="btn btn-primary">Change</button>
      </td>
    </tr>
    <tr>
      <td>
        Row 2: Cell 1 <button class="btn btn-primary">Change</button>
      </td>
      <td>
        Row 2: Cell 2 <button class="btn btn-primary">Change</button>
      </td>
    </tr>
  </tbody>
</table>
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

<!-- fiddle .as() - alias a route for later use -->

```html
<button class="network-btn btn btn-primary">Get Comment</button>
<div class="network-comment"></div>
<script>
  // we fetch all data from this REST json backend
  const root = 'https://jsonplaceholder.cypress.io'

  function getComment() {
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
