# Querying

Examples of querying for DOM elements in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api) and read [Selecting Elements: Best Practices Guide](https://on.cypress.io/best-practices#Selecting-Elements)

## [cy.get()](https://on.cypress.io/get)

To query for the button, use the `cy.get()` command.

<!-- fiddle get / button -->

```html
<div id="querying-example">
  <div class="well">
    <button id="query-btn" class="query-btn btn btn-primary">
      Button
    </button>
  </div>
</div>
```

```js
// selects the button using ID
cy.get('#query-btn').should('contain', 'Button')
// selects the button using class
cy.get('.query-btn').should('contain', 'Button')

// Use CSS selectors just like jQuery
cy.get('#querying-example .well>button:first').should(
  'contain',
  'Button',
)
```

<!-- fiddle-end -->

### Number of items

You can attach an assertion to confirm the number of elements.

<!-- fiddle get / headings -->

```html
<section>
  <h4>Example</h4>
  <h5>Querying elements</h5>
  <p>This page has heading elements</p>
  <h6>cy.get</h6>
</section>
```

```js
// find all H4 + H5 + H6 elements
// and confirm the minimum number of elements
// using the "greater" assertion
cy.get('h4,h5,h6').should('have.length.gt', 1)
```

**Tip:** use the `.should('have.length', N)` assertion to confirm the exact number of elements. For example, see [Assertions](./assertions.md) page.

<!-- fiddle-end -->

### jQuery selectors

<!-- fiddle get / with jQuery text selector -->

`cy.get` uses [jQuery selectors](https://api.jquery.com/category/selectors/), thus you can immediately use them to find elements by text (or without given text).

```html
<table>
  <tbody>
    <tr>
      <td>Same</td>
      <td>Same</td>
      <td>Different</td>
      <td>Same</td>
    </tr>
  </tbody>
</table>
```

```js
// selects all table cells with text "Same"
cy.get('td:contains("Same")').should('have.length', 3)
// if the text does not have white spaces, no need to quote it
cy.get('td:contains(Same)').should('have.length', 3)
// you can find elements NOT having the given text
cy.get('td:not(:contains(Same))')
  .should('have.length', 1)
  .and('have.text', 'Different')
```

<!-- fiddle-end -->

### Using attribute selector

You can grab elements with a given attribute. For example, let's make sure there is only a single `<a>` element pointing at "index.html":

<!-- fiddle get / anchor links with specific href -->

```html
<a href="article1.html">Article 1</a>
<a href="article2.html">Article 2</a>
<a href="article3.html">Article 3</a>
<a href="index.html">index</a>
```

```js
cy.get('a[href="index.html"]').should('have.length', 1)
```

<!-- fiddle-end -->

### Attribute prefix

Let's get the element with ID starting with "local-example" prefix

<!-- fiddle get / attribute prefix -->

```html
<ul>
  <li id="local-example-123">first</li>
  <li id="remote-example-456">second</li>
</ul>
```

```js
cy.get('[id^=local-example]').should('have.text', 'first')
```

<!-- fiddle-end -->

### Attribute suffix

Let's get the element with ID ending with "example-AF9" string

<!-- fiddle get / attribute suffix -->

```html
<ul>
  <li id="this-example-ZFX">first</li>
  <li id="that-example-AF9">second</li>
</ul>
```

```js
cy.get('[id$=example-AF9]').should('have.text', 'second')
```

<!-- fiddle-end -->

### Combining attribute selectors

Let's get the element with ID that starts with "my-" prefix and ending with "-yours" suffix

<!-- fiddle get / combine attributes -->

```html
<ul>
  <li id="my-first-123">first</li>
  <li id="my-second-yours">second</li>
</ul>
```

```js
cy.get('[id^=my-][id$=-yours]').should('have.text', 'second')
```

<!-- fiddle-end -->

#### Using data attribute

To find elements by data attribute, query using the attribute selector.

<!-- fiddle get / by data attribute -->

```html
<div data-test-id="test-example" class="example">
  Div with <code>data-test-id</code>
</div>
```

```js
cy.get('[data-test-id="test-example"]').should(
  'have.class',
  'example',
)
```

`cy.get()` yields a jQuery object, you can get its attribute by invoking the `.attr()` method.

```js
// find the element, confirm its attribute
cy.get('[data-test-id="test-example"]')
  .invoke('attr', 'data-test-id')
  .should('equal', 'test-example')

// or you can get an element's CSS property
cy.get('[data-test-id="test-example"]')
  .invoke('css', 'position')
  .should('equal', 'static')
```

Alternatively, chain assertions directly to the `cy.get()` call. See [assertions documentation](https://on.cypress.io/assertions).

```js
cy.get('[data-test-id="test-example"]')
  .should('have.attr', 'data-test-id', 'test-example')
  .and('have.css', 'position', 'static')
```

<!-- fiddle-end -->

## [cy.contains()](https://on.cypress.io/contains)

We can find elements by their content using `cy.contains()`

<!-- fiddle contains -->

```html
<div id="querying">
  <ul class="query-list">
    <li class="first">apples</li>
    <li class="second">oranges</li>
    <li class="third">bananas</li>
    <li class="fourth">more apples</li>
  </ul>
  <div class="query-button">
    <button class="btn btn-default">
      <span>Save Form</span>
    </button>
  </div>
</div>
```

```js
cy.get('.query-list')
  .contains('bananas')
  .should('have.class', 'third')

// we can pass a regexp to `.contains()`
cy.get('.query-list').contains(/^b\w+/).should('have.class', 'third')

cy.get('.query-list').contains('apples').should('have.class', 'first')

// passing a selector to contains will
// yield the selector containing the text
cy.get('div#querying')
  .contains('ul', 'oranges')
  .should('have.class', 'query-list')

cy.get('.query-button')
  .contains('Save Form')
  .should('have.class', 'btn')
```

<!-- fiddle-end -->

## [.within](https://on.cypress.io/within)

We can find elements within a specific DOM element `.within()`

<!-- fiddle .within / form example -->

```html
<h6>Name input</h6>
<input
  type="text"
  id="inputName"
  class="form-control"
  placeholder="Name"
/>
<h6>Form</h6>
<form class="query-form">
  <input
    type="text"
    id="inputEmail"
    class="form-control"
    placeholder="Email"
  />
  <input
    type="text"
    id="inputPassword"
    class="form-control"
    placeholder="Password"
  />
</form>
```

```js
// validate placeholder attributes
cy.get('.query-form').within(() => {
  cy.get('input:first').should('have.attr', 'placeholder', 'Email')
  cy.get('input:last').should('have.attr', 'placeholder', 'Password')
})
```

<!-- fiddle-end -->

### Temporarily escape `.within`

You can temporarily escape the `.within` scope by using [cy.root](https://on.cypress.io/root) + [cy.closest](https://on.cypress.io/closest) commands.

<!-- fiddle .within / escape -->

```html
<section id="escape-example">
  <h6>Name input</h6>
  <input
    type="text"
    id="inputName"
    class="form-control"
    placeholder="Name"
  />
  <h6>Form</h6>
  <form class="the-form">
    <input
      type="text"
      id="inputEmail"
      class="form-control"
      placeholder="Email"
    />
    <input
      type="text"
      id="inputPassword"
      class="form-control"
      placeholder="Password"
    />
  </form>
</section>
```

```js
cy.get('.the-form').within(() => {
  // escape back find H6
  cy.root().closest('#escape-example').contains('h6', 'Name input')
  // escape and enter text into the input field
  cy.root()
    .closest('#escape-example')
    .find('input#inputName')
    .type('Batman')
})
```

<!-- fiddle-end -->

**Note:** you need the `cy.root()` command first because `cy.closest` is a child command and cannot be used to start the new command chain.

### Number of elements

<!-- fiddle .within / picture example -->

Using `.within` followed by `cy.get` is convenient for finding multiple matching elements inside another element. For example, let's confirm that the given picture element has at least 2 `source` elements and 1 `img` child element.

```html
<picture>
  <source srcset="logo-768.png 768w, logo-768-1.5x.png 1.5x" />
  <source srcset="logo-480.png, logo-480-2x.png 2x" />
  <img src="logo-320.png" alt="logo" />
</picture>
```

```js
cy.get('picture').within(() => {
  // at least 2 source elements
  cy.get('source').should('have.length.gt', 1)
  // single img element
  cy.get('img').should('have.length', 1)
})
```

<!-- fiddle-end -->

### Within works with multiple elements

The parent command can yield multiple elements.

<!-- fiddle .within / multiple elements -->

```html
<ul id="fruits">
  <li id="item-apples"><a href="/apples">Apples</a></li>
  <li id="item-oranges"><a href="/oranges">Oranges</a></li>
</ul>
```

```js
cy.get('#fruits li').within(() => {
  cy.root().should('have.length', 2) // there are 2 LI items
  cy.contains('a', 'Apples').should('have.attr', 'href', '/apples')
  cy.contains('a', 'Oranges').should('have.attr', 'href', '/oranges')
})
```

<!-- fiddle-end -->

## [cy.root()](https://on.cypress.io/root)

We can find the root DOM element `cy.root()`

<!-- fiddle.export root example -->

```html
<ul class="query-ul">
  <li>One</li>
  <li>Two</li>
  <li>Buckle my shoe</li>
</ul>
```

```js
// By default, root is the document
cy.root().should('match', 'html')

cy.get('.query-ul').within(() => {
  // In this within, the root is now the ul DOM element
  cy.root().should('have.class', 'query-ul')
})
```

<!-- fiddle-end -->

## [Best Practices: Selecting elements](https://on.cypress.io/best-practices#Selecting-Elements)

Prefer dedicated `data-cy` or `data-test` attributes to CSS class names and element IDs. See detailed discussion at [Best Practices: Selecting elements](https://on.cypress.io/best-practices#Selecting-Elements)

<!-- fiddle Selecting Elements -->

```html
<div id="best-practices">
  <button
    id="main"
    class="btn btn-large"
    name="submission"
    role="button"
    data-cy="submit"
  >
    Submit
  </button>
</div>
```

```js
cy.get('#best-practices').within(() => {
  // Worst - too generic, no context
  cy.get('button').click()

  // Bad. Coupled to styling. Highly subject to change.
  cy.get('.btn.btn-large').click()

  // Average. Coupled to the `name` attribute which has HTML semantics.
  cy.get('[name=submission]').click()

  // Better. But still coupled to styling or JS event listeners.
  cy.get('#main').click()

  // Slightly better. Uses an ID but also ensures the element
  // has an ARIA role attribute
  cy.get('#main[role=button]').click()

  // Much better. But still coupled to text content that may change.
  cy.contains('Submit').click()

  // Best. Insulated from all changes.
  cy.get('[data-cy=submit]').click()
})
```

<!-- fiddle-end -->
