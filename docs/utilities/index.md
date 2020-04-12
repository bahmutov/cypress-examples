# Utilities

Examples of the use of methods from other commonly used libraries in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io)

## [Cypress.\_](https://on.cypress.io/_)

To call a lodash method, use the `Cypress._.method()` command.

<!-- fiddle lodash -->

```js
cy.request('https://jsonplaceholder.cypress.io/users').then((response) => {
  let ids = Cypress._.chain(response.body).map('id').take(3).value()

  expect(ids).to.deep.eq([1, 2, 3])
})
```

<!-- fiddle-end -->

## [Cypress.\$](https://on.cypress.io/$)

To call a jQuery method, use the `Cypress.$` command.

<!-- fiddle jQuery -->

```html
<ul class="list-group utility-jquery">
  <li class="list-group-item">
    <span class="badge">5</span>
    Watches
  </li>
  <li class="list-group-item">
    <span class="badge">14</span>
    Sweaters
  </li>
  <li class="list-group-item">
    <span class="badge">22</span>
    Scarves
  </li>
</ul>
<script>
  document
    .querySelector('li.list-group-item')
    .addEventListener('click', (e) => {
      e.target.classList.add('active')
    })
</script>
```

```js
let $li = Cypress.$('.utility-jquery li:first')

cy.wrap($li)
  .should('not.have.class', 'active')
  .click()
  .should('have.class', 'active')
```

<!-- fiddle-end -->

## [Cypress.Blob](https://on.cypress.io/blob)

To work with blobs, convert strings, and other utility functions, use the `Cypress.Blob` library.

<!-- fiddle blob -->

```html
<div class="utility-blob"></div>
```

```js
cy.get('.utility-blob').then(($div) =>
  // https://github.com/nolanlawson/blob-util#imgSrcToDataURL
  // get the dataUrl string for the javascript-logo
  Cypress.Blob.imgSrcToDataURL(
    'https://example.cypress.io/assets/img/javascript-logo.png',
    undefined,
    'anonymous',
  ).then((dataUrl) => {
    debugger
    // create an '<img />' element and set its src to the dataUrl
    let img = Cypress.$('<img />', { src: dataUrl })
    // need to explicitly return cy here since we are initially returning
    // the Cypress.Blob.imgSrcToDataURL promise to our test
    // append the image
    $div.append(img)

    cy.get('.utility-blob img').click().should('have.attr', 'src', dataUrl)
  }),
)
```

<!-- fiddle-end -->

## [Cypress.minimatch](https://on.cypress.io/minimatch)

To test out glob patterns against strings, use the `Cypress.minimatch` library.

<!-- fiddle minimatch -->

```js
Cypress.minimatch('/users/1/comments', '/users/*/comments', {
  matchBase: true,
})
```

<!-- fiddle-end -->
