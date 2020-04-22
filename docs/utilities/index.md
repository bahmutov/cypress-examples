# Utilities

Examples of the use of methods from other commonly used libraries in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io)

<!-- prettier-ignore-start -->
## [Cypress._](https://on.cypress.io/_)
<!-- prettier-ignore-end -->

To call a lodash method, use the `Cypress._.method()` command.

<!-- fiddle lodash -->

```js
cy.request('https://jsonplaceholder.cypress.io/users').then((response) => {
  let ids = Cypress._.chain(response.body).map('id').take(3).value()

  expect(ids).to.deep.eq([1, 2, 3])
})
```

<!-- fiddle-end -->

<!-- prettier-ignore-start -->
## [Cypress.$](https://on.cypress.io/$)
<!-- prettier-ignore-end -->

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
    .addEventListener('click', function (e) {
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
let matching = Cypress.minimatch('/users/1/comments', '/users/*/comments', {
  matchBase: true,
})

expect(matching, 'matching wildcard').to.be.true

matching = Cypress.minimatch('/users/1/comments/2', '/users/*/comments', {
  matchBase: true,
})
expect(matching, 'comments').to.be.false

// ** matches against all downstream path segments
matching = Cypress.minimatch('/foo/bar/baz/123/quux?a=b&c=2', '/foo/**', {
  matchBase: true,
})
expect(matching, 'comments').to.be.true

// whereas * matches only the next path segment

matching = Cypress.minimatch('/foo/bar/baz/123/quux?a=b&c=2', '/foo/*', {
  matchBase: false,
})
expect(matching, 'comments').to.be.false
```

<!-- fiddle-end -->

## [Cypress.moment()](https://on.cypress.io/moment)

To parse or format a date using a moment method, use the `Cypress.moment()` command.

<!-- fiddle moment -->

```html
<div class="utility-moment">
  Posted at
  <span class="badge badge-primary">3:38 PM</span>
</div>
```

```js
const time = Cypress.moment('2014-04-25T19:38:53.196Z').utc().format('h:mm A')

expect(time).to.be.a('string')

cy.get('.utility-moment').contains('3:38 PM').should('have.class', 'badge')

// the time in the element should be between 3pm and 5pm
const start = Cypress.moment('3:00 PM', 'LT')
const end = Cypress.moment('5:00 PM', 'LT')

cy.get('.utility-moment .badge').should(($el) => {
  // parse American time like "3:38 PM"
  const m = Cypress.moment($el.text().trim(), 'LT')

  // display hours + minutes + AM|PM
  const f = 'h:mm A'

  expect(
    m.isBetween(start, end),
    `${m.format(f)} should be between ${start.format(f)} and ${end.format(f)}`,
  ).to.be.true
})
```

<!-- fiddle-end -->

## [Cypress.Promise](https://on.cypress.io/promise)

To instantiate a new bluebird promise, use Cypress.Promise.

<!-- fiddle promise -->

```js
let waited = false

/**
 * @return Bluebird<string>
 */
function waitOneSecond() {
  // return a promise that resolves after 1 second
  // @ts-ignore TS2351 (new Cypress.Promise)
  // eslint-disable-next-line no-unused-vars
  return new Cypress.Promise((resolve, reject) => {
    setTimeout(() => {
      // set waited to true
      waited = true

      // resolve with 'foo' string
      resolve('foo')
    }, 1000)
  })
}

cy.then(() =>
  // return a promise to cy.then() that
  // is awaited until it resolves
  // @ts-ignore TS7006
  waitOneSecond().then((str) => {
    expect(str).to.eq('foo')
    expect(waited).to.be.true
  }),
)

// you can also wait on a promise from the application code
// using https://on.cypress.io/wrap
cy.wrap(waitOneSecond()).should('equal', 'foo')
```

<!-- fiddle-end -->
