# Querying

Examples of querying for DOM elements in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api) and read [Selecting Elements: Best Practices Guide](https://on.cypress.io/best-practices#Selecting-Elements)

## [cy.get()](https://on.cypress.io/get)

To query for the button, use the `cy.get()` command.

<!-- fiddle cy.get / button -->

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

<!-- fiddle cy.get / headings -->

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

<!-- fiddle cy.get / with jQuery text selector -->

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

### Escaping special characters

If the element's selector has special characters like `.` or `:` escape the using `\\` character

<!-- fiddle cy.get / escape special characters -->

```html
<div id="user:1234" class="admin.user">Joe</div>
```

```js
cy.get('#user\\:1234').should('have.text', 'Joe')
cy.get('.admin\\.user')
  // no need to escape the non-selector text
  .should('have.id', 'user:1234')
```

<!-- fiddle-end -->

### Find elements without given class

<!-- fiddle cy.get / find elements without given class -->

In the HTML below all links have the class "help", but some links have the class "external". We want to find all links having the class "help", but without the class "external".

```html
<a href="article1.html" class="help external">Article 1</a>
<a href="article2.html" class="help">Article 2</a>
<a href="article3.html" class="help external">Article 3</a>
<a href="index.html" class="help">index</a>
```

```js
cy.get('a.help:not(.external)')
  .should('have.length', 2)
  .within(() => {
    // confirm the two found elements
    cy.root().eq(0).should('have.text', 'Article 2')
    cy.root().eq(1).should('have.text', 'index')
  })
```

<!-- fiddle-end -->

### Using attribute selector

You can grab all elements that have an attribute present. For example, to find all `<LI>` rows with the attribute "line" present:

<!-- fiddle cy.get / elements with an attribute -->

```html
<ul id="row-attributes">
  <li>No line</li>
  <li>No line</li>
  <!-- this attribute "line" has no value at all -->
  <li line>line</li>
  <li line="up">line</li>
  <li line="down">line</li>
  <li>No line</li>
</ul>
```

```js
cy.get('#row-attributes li[line]').should('have.length', 3)
```

<!-- fiddle-end -->

You can grab elements with a given attribute. For example, let's make sure there is only a single `<a>` element pointing at "index.html":

<!-- fiddle cy.get / anchor links with specific href -->

```html
<div id="specific-href">
  <a href="article1.html">Article 1</a>
  <a href="article2.html">Article 2</a>
  <a href="article3.html">Article 3</a>
  <a href="index.html">index</a>
</div>
```

```js
cy.get('#specific-href a[href="index.html"]')
  .should('have.length', 1)
  .and('have.text', 'index')
```

<!-- fiddle-end -->

### Escape the attribute

Sometimes an attribute can have a special character like `.` or `:` in it. Please escape the attribute using the `\\` character.

<!-- fiddle cy.get / escape special characters in attribute -->

```html
<div id="escape-attribute" attr.aria-label="Attribute example">
  Example
</div>
```

```js
cy.get('[attr\\.aria-label="Attribute example"]')
  .should('have.id', 'escape-attribute')
  // ignore the newline characters by using the assertion "include.text"
  // rather than the assertion "have.text"
  .and('include.text', 'Example')
```

<!-- fiddle-end -->

### Attribute prefix

Let's get the element with ID starting with "local-example" prefix

<!-- fiddle cy.get / attribute prefix -->

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

<!-- fiddle cy.get / attribute suffix -->

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

### Attribute contains text

Let's find an anchor element with HREF attribute that includes the text "help"

<!-- fiddle cy.get / attribute contains text -->

```html
<a href="/some/link.html">Link 1</a>
<a href="/another/link">Link 2</a>
<a href="/link/to/help/article.html">Link 3</a>
```

```js
// quotes around the text without spaces are optional
cy.get('a[href*="help"]')
  .should('have.length', 1)
  .and('have.text', 'Link 3')
```

<!-- fiddle-end -->

### Having attribute disabled

Let's find all buttons with the attribute "disabled" present. While we are at it, let's find all the elements _without_ such attribute.

<!-- fiddle cy.get / having attribute disabled -->

```html
<div id="few-buttons">
  <button>First</button>
  <button disabled>Second</button>
  <button disabled>Third</button>
  <button>Fourth</button>
</div>
```

```js
// finds both button that have the attribute "disabled"
cy.get('#few-buttons button[disabled]')
  .should('have.length', 2)
  .first()
  .should('have.text', 'Second')
// finds the two buttons without the attribute "disabled"
cy.get('#few-buttons button:not([disabled])')
  .should('have.length', 2)
  .last()
  .should('have.text', 'Fourth')
```

<!-- fiddle-end -->

### Combining attribute selectors

Let's get the element with ID that starts with "my-" prefix and ending with "-yours" suffix

<!-- fiddle cy.get / combine attributes -->

```html
<ul id="combine-attributes">
  <li id="my-first-123">first</li>
  <li id="my-second-yours">second</li>
</ul>
```

```js
cy.get('#combine-attributes').within(() => {
  cy.get('[id^=my-][id$=-yours]').should('have.text', 'second')
})
```

<!-- fiddle-end -->

#### Using data attribute

To find elements by data attribute, query using the attribute selector.

<!-- fiddle cy.get / by data attribute -->

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

### AND selector

Let's find all `P` and `LI` elements. You can combine multiple selectors using comma operator.

<!-- fiddle cy.get / AND selector -->

```html
<div id="and-selector-example">
  <ul>
    <li id="first">first</li>
    <li id="second">second</li>
  </ul>
  <p>Another line</p>
</div>
```

```js
// find all P elements inside the element with id "and-selector-example"
// and all LI elements inside the element with id "and-selector-example"
cy.get('#and-selector-example p, #and-selector-example li').should(
  'have.length',
  3,
)
// alternative: first find the element with id "and-selector-example"
// then find P and LI elements
cy.get('#and-selector-example').within(() => {
  cy.get('p, li').should('have.length', 3)
})
```

<!-- fiddle-end -->

## [cy.contains()](https://on.cypress.io/contains)

We can find elements by their content using `cy.contains()`

<!-- fiddle contains / returns an element -->

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
// finds the first element with the given text
cy.get('.query-list').contains('apples').should('have.class', 'first')
// ignore text when matching
cy.get('.query-list')
  .contains('APPLE', { matchCase: false })
  .should('have.class', 'first')
  .and('have.text', 'apples')

cy.get('.query-list')
  .contains('bananas')
  .should('have.class', 'third')

// we can pass a regexp to `.contains()`
cy.get('.query-list').contains(/^b\w+/).should('have.class', 'third')

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

### cy.contains with selector and text

You can give the element selector to match. The text can be anywhere in the element or its children.

<!-- fiddle contains / selector and text -->

```html
<div id="contains-example">
  <div
    data-cy="parent"
    style="font-weight: heavy; text-decoration: underline"
  >
    <span>Some text</span>
  </div>
</div>
```

```js
cy.get('#contains-example').within(() => {
  // finds the immediate element
  cy.contains('Some text').should('have.prop', 'nodeName', 'SPAN')
  // find the parent element with "Some text" somewhere inside
  cy.contains('[data-cy=parent]', 'Some text')
    .should('have.prop', 'nodeName', 'DIV') // we found the parent div
    .and('have.css', 'text-decoration')
    // the text-decoration style string includes color and line type
    // we are only interested in the presence of the "underline" keyword
    .should('include', 'underline')
})
```

<!-- fiddle-end -->

### cy.contains with regular expression

You can use a regular expression instead of text

<!-- fiddle contains / regular expression -->

```html
<div id="user-name">Cypress User</div>
```

```js
// ignore case
cy.contains(/cypress user/i)
// match text exactly
cy.contains(/^Cypress User$/)
```

<!-- fiddle-end -->

Even if there are optional white space characters around the text, you can still use `^` and `$` to require no other text in the element.

<!-- prettier-ignore-start -->

<!-- fiddle contains / regular expression with whitespace -->

Note  the whitespace around the word "Incredible"

```html
<div class="nickname">  Incredible    </div>
```

```js
// find the nickname "Incredible" that can have whitespace around it
// but cannot have any other characters
cy.contains('.nickname', /^\s*Incredible\s*$/)
```

<!-- fiddle-end -->

<!-- prettier-ignore-end -->

### Extract part of the text

Once you found an element with some text, you can extract a specific part using a regular expression with [named groups](https://caniuse.com/mdn-javascript_builtins_regexp_named_capture_groups), which are supported by the modern browsers.

<!-- fiddle contains / extract part of the text -->

```html
<div id="my-name">My name is Gleb, what's yours?</div>
```

```js
cy.contains('#my-name', 'My name is')
  // let's extract the name
  .invoke('text')
  // match a group using a regex
  .invoke('match', /name is (?<name>\w+),/)
  // grab just the specific group "name"
  .its('groups.name')
  .should('equal', 'Gleb')
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

### Yields the original element

The `cy.within` yields the same DOM element it received as the parent.

<!-- fiddle .within / yields the original element -->

```html
<div id="within-yields">
  The parent div
  <div class="some-child">Child element</div>
</div>
```

```js
cy.get('#within-yields')
  .within(() => {
    // we are trying to return something
    // from the .within callback,
    // but it won't have any effect
    return cy
      .contains('Child element')
      .should('have.class', 'some-child')
  })
  .should('have.id', 'within-yields')
```

<!-- fiddle-end -->

You can attempt to [cy.wrap](https://on.cypress.io/wrap) a different value - still the original parent element is going to be yielded.

<!-- fiddle .within / yields the original element even after cy.wrap -->

```html
<div id="wrap-inside-within">
  The parent div
  <div class="some-child">Child element</div>
</div>
```

```js
cy.get('#wrap-inside-within')
  .within(() => {
    // returning cy.wrap(...) has no effect on the yielded value
    // it will still be the original parent DOM element
    return cy.wrap('a new value')
  })
  .should('have.id', 'wrap-inside-within')
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

## cy.get vs .find

The [cy.get](https://on.cypress.io/get) command always starts its search from the `document` element, or, if used inside `.within`, from the [cy.root](https://on.cypress.io/root) element. The [.find](https://on.cypress.io/find) command starts the search from the current subject.

<!-- fiddle cy.get vs .find -->

```html
<div class="test-title">cy.get vs .find</div>
<section id="comparison">
  <div class="feature">Both are querying commands</div>
</section>
```

```js
cy.get('#comparison')
  .get('div')
  // finds the DIV .test-title outside the #parent
  // and the DIV .feature inside
  .should('have.class', 'test-title')
  .and('have.class', 'feature')
cy.get('#comparison')
  .find('div')
  // the search is limited to the tree at #comparison element
  .should('have.length', 1)
  .and('have.class', 'feature')
```

<!-- fiddle-end -->

## Pseudo class selectors

These examples are based on the article [Meet the Pseudo Class Selectors](https://css-tricks.com/pseudo-class-selectors/).

### Links

<!-- fiddle pseudo-selectors / links -->

Some of the anchor elements below do not have `href` attribute, thus they are not _links_. Let's select the anchors with `href` attributes.

```html
<div data-cy="pseudo-links">
  <a href="first">first</a>, <a>second</a>, <a href="third">third</a>,
</div>
```

```js
cy.get('[data-cy=pseudo-links]').within(() => {
  // by default, "a" returns all 3 elements
  cy.get('a').should('have.length', 3)
  // select "a" elements with "href" attribute
  cy.get('a:link').should('have.length', 2)
  // which is equivalent to
  cy.get('a[href]').should('have.length', 2)
})
```

<!-- fiddle-end -->

### Empty elements

Let's find all elements without any content using `:empty` pseudo selector. Notice in the markup below some `<P>` elements have no content.

<!-- fiddle pseudo-selectors / empty elements -->

```html
<div data-cy="empty-elements">
  <p></p>
  <p>Has some text</p>
  <p></p>
  <p class="nothing"></p>
</div>
```

```js
cy.get('[data-cy=empty-elements]').within(() => {
  cy.get('p:empty')
    .should('have.length', 3)
    .last()
    .should('have.class', 'nothing')
})
```

<!-- fiddle-end -->

### First letter

<!-- fiddle pseudo-selectors / first letter -->

```html
<div data-cy="first-letter">
  <p>this is some text, just an example</p>
</div>
<style>
  /* make the first letter always stand out */
  [data-cy='first-letter'] p::first-letter {
    text-transform: uppercase;
    font-weight: bold;
  }
</style>
```

```js
cy.get('[data-cy=first-letter]').within(() => {
  // Cypress does not recognize the selector "p::first-letter"
  // because the jQuery engine does not support them
  // thus the following DOES NOT WORK with error
  // "Syntax error, unrecognized expression: p::first-letter"
  // cy.get('p::first-letter')
})
```

<!-- fiddle-end -->

### Before selector

<!-- fiddle pseudo-selectors / before selector -->

```html
<div data-cy="before-example">
  <p>Hello, world!</p>
</div>
<style>
  /* add a word in front of each paragraph */
  [data-cy='before-example'] p::before {
    content: 'Greeting';
    margin-right: 1em;
  }
</style>
```

```js
cy.get('[data-cy=before-example]').within(() => {
  // Cypress does not recognize the selector "p::before"
  // because the jQuery engine does not support them
  // so we get the content through the computed style
  // see https://codepen.io/chriscoyier/pen/Pzzawj
  cy.window().then((win) => {
    cy.contains('Hello').then(($el) => {
      const before = win.getComputedStyle($el[0], '::before')
      const beforeContent = before.getPropertyValue('content')
      // the content is a string, thus we need to quote it
      expect(beforeContent).to.equal('"Greeting"')
    })
  })
})
```

<!-- fiddle-end -->
