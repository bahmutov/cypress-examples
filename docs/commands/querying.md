# Querying

Examples of querying for DOM elements in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api) and read [Selecting Elements: Best Practices Guide](https://on.cypress.io/best-practices#Selecting-Elements). All Cypress querying commands automatically retry until the elements are found, see the [retry-ability examples](../recipes/retry-ability.md). Cypress supports both [CSS and jQuery selectors](../recipes/selectors.md).

```js
// checks the page until it finds an element with class "title"
cy.get('.title')
// all querying commands have a built-in existence assertion
// the above command is equivalent to:
cy.get('.title').should('exist')
```

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

Cypress querying commands use [jQuery selectors](https://api.jquery.com/category/selectors/) that go beyond the standard CSS selectors. Here are a couple of examples.

#### :checkbox selector

The [jQuery `:checkbox` selector](https://api.jquery.com/checkbox-selector/) is equivalent to `[type=checkbox]` attribute CSS selector. The jQuery docs advise to use at least the element type like `input:checkbox` to avoid the default `*:checkbox` wildcard.

<!-- fiddle cy.get / using jQuery :checkbox -->

```html
<div id="checkbox-example">
  <input type="checkbox" id="typeA" checked />
</div>
```

```js
cy.get('#checkbox-example input:checkbox')
  .should('be.checked')
  .and('have.id', 'typeA')
  .then(($checkbox) => {
    // the jQuery :checkbox selector returns the same elements
    // as the [type=checkbox] attribute selector
    cy.get('#checkbox-example input[type=checkbox]').then(
      ($el) => {
        // let's confirm it
        expect($checkbox[0], 'same DOM element').to.equal($el[0])
      },
    )
  })
```

<!-- fiddle-end -->

#### Disabled elements

<!-- fiddle cy.get / using jQuery is :disabled -->

```html
<div id="some-buttons">
  <button id="one">One</button>
  <button id="two" disabled>Two</button>
  <button id="three" disabled>Three</button>
</div>
```

```js
// get all disabled buttons
cy.get('#some-buttons button:disabled').should('have.length', 2)
// use combination of jQuery :not and :disabled selectors
cy.get('#some-buttons button:not(:disabled)')
  .should('have.length', 1)
  .and('have.text', 'One')
```

<!-- fiddle-end -->

#### Checked elements

<!-- fiddle cy.get / using jQuery is :checked -->

```html
<div id="checks">
  <div>One <input type="checkbox" id="one" /></div>
  <div>Two <input type="checkbox" id="two" checked /></div>
  <div>Three <input type="checkbox" id="three" /></div>
</div>
```

```js
// get all checked boxes
cy.get('#checks input:checked')
  .should('have.length', 1)
  .and('have.id', 'two')
// get all unchecked boxes through jQuery :not and :checked selectors
cy.get('#checks input:not(:checked)').should('have.length', 2)
```

<!-- fiddle-end -->

#### :has selector

We can find elements that contain some other element using the `:has` selector. Let's find all paragraphs with bold text inside.

<!-- fiddle cy.get / with jQuery :has selector -->

```html
<div id="main-bold">
  <p>First paragraph</p>
  <p>Second <b>paragraph</b></p>
  <p>Third paragraph</p>
  <p>Fourth <b>paragraph</b></p>
</div>
```

```js
cy.get('#main-bold p:has(b)').should('have.length', 2)
```

<!-- fiddle-end -->

For another use of `:has` selector, see the recipe [Find and Click The Accordion With A Button](../recipes/find-and-click-accordion-button.md).

#### :has with :not selector

We can also combine `:has` with `:not` selectors to find all paragraphs without `<b>` elements.

<!-- fiddle cy.get / with jQuery :has and :not selectors -->

```html
<div id="main-bold">
  <p>First paragraph</p>
  <p>Second <b>paragraph</b></p>
  <p>Third paragraph</p>
  <p>Fourth <b>paragraph</b></p>
</div>
```

```js
cy.get('#main-bold p:not(:has(b))')
  .should('have.length', 2)
  .each(($p) => {
    // should be the first or the first paragraphs
    expect($p.text()).to.match(/^(First|Third)/)
  })
```

<!-- fiddle-end -->

#### Find text with :contains selector

<!-- fiddle cy.get / with jQuery text selector -->

`cy.get` uses [jQuery selectors](https://api.jquery.com/category/selectors/), thus you can immediately use them to find elements by text (or without given text). Use `:contains(text)` to find elements with the given text string and `:not(:contains(text))` to get elements without the text.

```html
<table id="text-example">
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
cy.get('table#text-example').within(() => {
  // selects all table cells with text "Same"
  cy.get('td:contains("Same")').should('have.length', 3)
  // if the text does not have white spaces, no need to quote it
  cy.get('td:contains(Same)').should('have.length', 3)
  // you can find elements NOT having the given text
  cy.get('td:not(:contains(Same))')
    .should('have.length', 1)
    .and('have.text', 'Different')
})
```

<!-- fiddle-end -->

#### Combine :has and :contains selectors

<!-- fiddle cy.get / with jQuery has and contains -->

📺 Watch this example in the video [A Cypress Example With Disabled Button And Has Text jQuery Selectors](https://youtu.be/GYW4vIehd6Y).

```html
<div>
  <label>My button</label>
  <button disabled>Click</button>
</div>
```

Let's get the button by finding the `DIV` element that has a `LABEL` element inside with the text "My button".

```js
// the DIV has LABEL with the text "My button"
// and then get the child "BUTTON" element
cy.get('div:has( label:contains("My button") ) button')
  // and confirm we found the right button element
  .should('have.text', 'Click')
  .and('be.disabled')
```

<!-- fiddle-end -->

#### Multiple :has clauses

<!-- fiddle cy.get / with multiple jQuery has clauses -->

Let's pretend we want to find all `DIV` elements having a `LABEL` and `BUTTON` elements inside.

📺 Watch this example explained in the video [Multiple :has Selector Clauses](https://youtu.be/9WByK1QvGs4).

```html
<div>Does not have children</div>
<div>Has a label <label>Champ</label></div>
<div>
  <label>My button</label>
  <button disabled>Click</button>
</div>
<div>
  <label>My other button</label>
  <button disabled>Press</button>
</div>
<div>
  <button>Finish</button>
</div>
```

```js
// find all DIV elements with a LABEL element inside
cy.get('div:has(label)').should('have.length', 3)
// find all DIV elements with a LABEL and a BUTTON inside
cy.get('div:has(label):has(button)').should('have.length', 2)
// find all DIV elements with a LABEL or a BUTTON inside
cy.get('div:has(label, button)')
  .should('have.length', 4)
  // confirm the last element in the found list
  .last()
  .contains('button', 'Finish')
```

<!-- fiddle-end -->

### :first and :last

<!-- fiddle cy.get / with jQuery first selector -->

```html
<div id="labels">
  <div class="label">34</div>
  <div class="label">loading...</div>
</div>
```

Let's check if the first label has the text "34"

```js
cy.contains('#labels .label', '34')
```

Equivalent `cy.get` command can use the `:first` jQuery selector

```js
cy.get('#labels .label:first').should('have.text', '34')
```

You can get the second or other elements by index (zero-based) using the jQuery `:eq` selector. For example, to confirm part of the second element's text:

```js
cy.get('#labels .label:eq(1)').should('include.text', 'load')
```

<!-- fiddle-end -->

### :last

<!-- fiddle cy.get / with jQuery last selector -->

```html
<div id="student-names">
  <div class="label">Joe</div>
  <div class="label">Anna</div>
</div>
```

We can check the last element

```js
cy.get('#student-names .label:last').should('have.text', 'Anna')
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

See also the recipe [Escape Selector](../recipes/escape-selector.md).

### Find elements without a given class

<!-- fiddle cy.get / find elements without a given class -->

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
  // confirm the two found elements
  .then(($el) => Cypress._.map($el, 'innerText'))
  .should('deep.equal', ['Article 2', 'index'])
```

<!-- fiddle-end -->

### Find elements without an attribute

Let's find all anchor links without `HREF` attribute

<!-- fiddle cy.get / find elements without an attribute -->

Some of the anchor links below are missing an `href` attribute. Let's find them

```html
<div id="links">
  <a href="article1.html">Article 1</a>
  <a href="article2.html">Article 2</a>
  <a>Article 3</a>
  <a>Article 4</a>
  <a href="index.html">index</a>
</div>
```

```js
// get all "A" elements
// without the attribute "href"
cy.get('#links a:not([href])').should('have.length', 2)
```

<!-- fiddle-end -->

### Find elements with an attribute having a different value

Let's find all anchor links without `HREF` attribute

<!-- fiddle cy.get / find elements with an attribute having a different value -->

Let's find all anchor links that have the attribute `data-level` other than `primary` or do not have this attribute

```html
<div id="help-links">
  <a href="article1.html" data-level="primary">Article 1</a>
  <a href="article2.html" data-level="secondary">Article 2</a>
  <a data-level="primary">Article 3</a>
  <a>Article 4</a>
  <a href="index.html" data-level="index">index</a>
</div>
```

```js
// get all "A" elements where the attribute "data-level"
// either does not exist or has a value other than "primary"
cy.get('#help-links a:not([data-level=primary])').should(
  'have.length',
  3,
)
```

<!-- fiddle-end -->

### Find elements without two given classes

<!-- fiddle cy.get / find elements without two given classes -->

Imagine in a calendar date picker we have previous month, this month, and the next month. We want to select the current month's first day. For simplicity, I will only include three elements.

```html
<div class="datepicker">
  <!-- 5th of the last month -->
  <div class="date lastMonth">5</div>
  <div class="date" data-note="current">5</div>
  <div class="date">15</div>
  <div class="date">25</div>
  <div class="date nextMonth">5</div>
</div>
<style>
  .lastMonth:after {
    content: ' last month';
  }
  .nextMonth:after {
    content: ' next month';
  }
</style>
```

We only want to select the "5" day of the current month, and do not include the other days with the digit "5" like "15" and "25".

```js
cy.get('.date:not(.lastMonth, .nextMonth)')
  // filter by text to find exactly "5"
  .contains(/^5$/)
  // confirm the got the correct element
  .should('have.attr', 'data-note', 'current')
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

If you want to combine multiple attributes, see the recipe [# Get By Attributes](../recipes/get-by-attributes.md).

### Attribute from a variable

<!-- fiddle cy.get / attribute from a variable -->

```html
<div id="attribute-value">
  <div data-product-id="123-04-5678">Chair</div>
</div>
```

```js
const productId = '123-04-5678'
cy.get('#attribute-value')
  // use the "productId" variable value
  // to form the full selector string
  // via JavaScript template string
  .find(`[data-product-id="${productId}"]`)
  .should('have.text', 'Chair')
```

Alternative: concatenate the variable into a string using JavaScript `+` operator

```js
cy.get(
  '#attribute-value [data-product-id="' + productId + '"]',
).should('have.text', 'Chair')
```

<!-- fiddle-end -->

### Get input elements with the given value

See the recipe [Get input elements with the given value](../recipes/get-inputs-with-value.md).

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

#### Using partial data attribute

<!-- fiddle cy.get / by partial data attribute -->

```html
<div id="partial-data">
  <div data-test-id="fruit one">Apples</div>
  <div data-test-id="fruit two">Oranges</div>
  <div data-test-id="fruit one">Grapes</div>
  <div data-test-id="not a fruit">Potato</div>
</div>
```

Let's find all items with "data-test-id" that includes the text "fruit" anywhere in the string.

```js
cy.get('#partial-data [data-test-id*=fruit]').should(
  'have.length',
  4,
)
```

Let's find all items that start with "fruit" in that attribute.

```js
cy.get('#partial-data [data-test-id^=fruit]').should(
  'have.length',
  3,
)
```

Let's find the items that end the data attribute with the string "a fruit"

```js
cy.get('#partial-data [data-test-id$="a fruit"]')
  .should('have.length', 1)
  .and('have.text', 'Potato')
```

Let's find the elements with text "one" anywhere in their text

```js
cy.get('#partial-data [data-test-id*=one]')
  .should('have.length', 2)
  .first()
  .should('have.text', 'Apples')
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
cy.get(
  '#and-selector-example p, #and-selector-example li',
).should('have.length', 3)
// alternative: first find the element with id "and-selector-example"
// then find P and LI elements
cy.get('#and-selector-example').within(() => {
  cy.get('p, li').should('have.length', 3)
})
```

<!-- fiddle-end -->

### Table column

You can get the table column using CSS selectors

<!-- fiddle cy.get / Table column -->

```html
<style>
  table td {
    border: 3px solid black;
    padding: 3px 5px;
  }
  #sort-by-date {
    margin: 10px 0px;
  }
</style>
<table id="people">
  <thead>
    <tr>
      <td>Name</td>
      <td>Age</td>
      <td>Date (YYYY-MM-DD)</td>
    </tr>
  </thead>
  <tbody id="people-data">
    <tr>
      <td>Dave</td>
      <td>20</td>
      <td>2023-12-23</td>
    </tr>
    <tr>
      <td>Cary</td>
      <td>30</td>
      <td>2024-01-24</td>
    </tr>
    <tr>
      <td>Joe</td>
      <td>28</td>
      <td>2022-02-25</td>
    </tr>
    <tr>
      <td>Anna</td>
      <td>22</td>
      <td>2027-03-26</td>
    </tr>
  </tbody>
</table>
```

```js
// let's get the first column
cy.get('table#people tbody td:nth-child(1)').should(($cells) => {
  expect($cells[0]).to.have.text('Dave')
  expect($cells[1]).to.have.text('Cary')
  expect($cells[2]).to.have.text('Joe')
  expect($cells[3]).to.have.text('Anna')
})
// let's get the second column
cy.get('table#people tbody td:nth-child(2)').should(($cells) => {
  expect($cells[0]).to.have.text('20')
  expect($cells[1]).to.have.text('30')
  expect($cells[2]).to.have.text('28')
  expect($cells[3]).to.have.text('22')
})
```

Tip: you can extract multiple values and create assertions using [cypress-should-really](https://github.com/bahmutov/cypress-should-really) helpers.

<!-- fiddle-end -->

### With the given computed style

See the recipe [Computed style](../recipes/computed-style.md).

### Index of the found element

Imagine we want to find the list item with the class "active", and then see what is the index of the element among its siblings.

You can watch this example in the video [Get The Index Of An Element Using jQuery Method](https://youtu.be/8UhoGJEe4NY).

<!-- fiddle cy.get / Index of the found element -->

```html
<ol id="carousel">
  <li>apples</li>
  <li>grapes</li>
  <li class="active">kiwi</li>
</ol>
```

```css hide
li.active {
  font-weight: bold;
}
```

```js
cy.get('#carousel li.active')
  // call jQuery index() method
  // to yield the index of the active LI item
  .invoke('index')
  .should('equal', 2)
  // if you want to work with the index,
  // yield it to the next command
  .then((index) => {
    cy.log(`index is **${index}**`)
  })
```

<!-- fiddle-end -->

### Case-insensitive attribute selectors

Read [CSS case insensitive attribute selector](https://weekendprojects.dev/posts/css-case-insensitive-selector/).

🚨 Does not work, see [#25304](https://github.com/cypress-io/cypress/issues/25304)

<!-- fiddle.skip cy.get / Case-insensitive selectors -->

```html
<button class="btn-PRIMARY">Green</button>
<button class="btn-primary">Red</button>
```

```js
cy.get('button[class=btn-primary i]').should('have.length', 2)
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
cy.get('.query-list')
  .contains('apples')
  .should('have.class', 'first')
// ignore text when matching
cy.get('.query-list')
  .contains('APPLE', { matchCase: false })
  .should('have.class', 'first')
  .and('have.text', 'apples')

cy.get('.query-list')
  .contains('bananas')
  .should('have.class', 'third')

// we can pass a regexp to `.contains()`
cy.get('.query-list')
  .contains(/^b\w+/)
  .should('have.class', 'third')

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
  cy.contains('Some text').should(
    'have.prop',
    'nodeName',
    'SPAN',
  )
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

Note the whitespace around the word "Incredible"

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

### cy.contains with regular expression OR

Let's confirm that the title text is one of the three possible titles

<!-- fiddle contains / regular expression OR -->

```html
<div class="my-title">Cypress Examples Guide</div>
<style>
  .my-title {
    font-size: x-large;
  }
</style>
```

```js
// we do not know the precise expected title
// we know it can be one of three possible titles
cy.contains(
  '.my-title',
  /^(Testing Examples|Cypress Examples Guide|Short Feature Tests)$/,
)
// you can also get the text and confirm it
cy.get('.my-title')
  .invoke('text')
  .should('be.oneOf', [
    'Testing Examples',
    'Cypress Examples Guide',
    'Short Feature Tests',
  ])
```

<!-- fiddle-end -->

### cy.contains with regular expression AND

Let's find a paragraph with words "hello", "world", and "more" in it.

<!-- fiddle contains / regular expression AND -->

```html
<section id="paragraphs">
  <p class="first">
    Some text here
  </p>
  <p class="second">
    Simon says "hello" and then he says "world" and that's it.
    Nothing more.
  </p>
  <p class="third">
    I need more examples.
  </p>
</section>
```

```js
// look for a paragraph with the world "hello", "world", and "more"
// separated by some other characters.
cy.contains('#paragraphs p', /hello.+world.+more/)
  // confirm we have found the right paragraph
  .should('have.class', 'second')
```

<!-- fiddle-end -->

### cy.contains with duplicate white spaces

If the HTML element contains duplicate white spaces, using `cy.contains` becomes trickier. The example below has a double space between the `:` and `b` characters.

<!-- prettier-ignore-start -->

<!-- fiddle contains / duplicate white spaces -->

```html
<div id="spaces">LEGO:  blocks</div>
```

If you inspect this element in the browser's console, you will see that the browser returns different strings for `innerHTML` and `innerText` properties - and the browser collapses multiple spaces into one.

```
> $0.innerText.length
> 12
> $0.innerHTML.length
> 13
```

If you are using the literal string for matching, the `cy.contains` will fail, since it uses the `innerText` property.

```js
// FAILS, cannot find the element while having "  " double space
// cy.contains('#spaces', 'LEGO:  blocks')
// solution: find the element and assert its text yourself
cy.get('#spaces').should($el => {
  expect($el).to.have.html('LEGO:  blocks')
})
// you can also remove duplicate white spaces before calling cy.contains
// and for good measure trimp the text we are looking for
cy.contains('#spaces', 'LEGO:  blocks'.replace(/\s+/g, ' ').trim())
```

<!-- fiddle-end -->

<!-- prettier-ignore-end -->

### cy.contains and children elements

The `cy.contains` command can find the element even if the text is split across its children elements.

<!-- fiddle contains / needs a single element -->

```html
<ul id="sell-fruits">
  <li>
    <span class="name">Apples</span>
    <span class="price">$4.00</span>
  </li>
</ul>
```

```js
cy.contains('#sell-fruits li', 'Apples $4.00')
```

<!-- fiddle-end -->

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

### Text with double quotes

Double quotes in the text you are looking for present no problem for the `cy.contains` command.

<!-- fiddle contains / text with double quotes -->

```html
<div id="with-quotes">My name is "Cypress examples"</div>
```

```js
cy.contains('div', 'name is "Cypress examples"')
  .should('exist')
  .scrollIntoView()
  .should('have.id', 'with-quotes')
```

<!-- fiddle-end -->

### Escape text

When using the `cy.contains` command, you need to escape the backslashes `\` characters.

<!-- fiddle contains / escape text -->

```html
<div id="escape-text-example">
  <div id="message">[INFO]: this is \\a message\\</div>
</div>
```

```js
// notice how we need to escape the JavaScript string
// because it needs to have double back slashes
const msg = '[INFO]: this is \\\\a message\\\\'
cy.get('#escape-text-example')
  .contains(msg)
  .should('have.id', 'message')
cy.get('#escape-text-example')
  // almost equivalent jQuery :contains(text) selector
  // but unfortunately it breaks on back slashes
  // https://api.jquery.com/contains-selector/
  // .find(`:contains("${msg}")`)
  // we need to escape each escaped backslash!
  .find(`:contains("[INFO]: this is \\\\\\\\a message\\\\\\\\")`)
  .should('have.id', 'message')
```

<!-- fiddle-end -->

Imagine the HTML text has double white space. Then `cy.contains` struggles.

<!-- prettier-ignore-start -->

<!-- fiddle contains / escape multiple spaces -->

```html
<div data-testid="product-name">
  Garmin Instinct 2 Solar, (GRAPHITE)  (010-02627-10)
</div>
```

```js
const selector = '[data-testid=product-name]'
const text =
  'Garmin Instinct 2 Solar, (GRAPHITE)  (010-02627-10)'
cy.get(selector).should('contain.text', text)
```

```js
// the entire text does not match
cy.contains(selector, text).should('not.exist')
```

```js
// but pieces of the long text can be found correctly
cy.contains(selector, 'Garmin Instinct 2 Solar')
cy.contains(selector, '(GRAPHITE)')
cy.contains(selector, '(010-02627-10)')
// it is the double spaces that pose a problem
cy.contains(selector, ')  (').should('not.exist')
// if we remove the double space, it works
cy.contains(selector, ') (')
```

**Suggestion:** clean up the text before searching by replacing multiple spaces with a single " " character.

```js
cy.contains(selector, text.replaceAll(/\s+/g, ' '))
```

<!-- fiddle-end -->
<!-- prettier-ignore-end -->

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
  cy.get('input:first').should(
    'have.attr',
    'placeholder',
    'Email',
  )
  cy.get('input:last').should(
    'have.attr',
    'placeholder',
    'Password',
  )
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
  cy.root()
    .closest('#escape-example')
    .contains('h6', 'Name input')
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

The command `cy.within` requires the parent subject to be a single element.

<!-- fiddle.skip .within / multiple elements -->

```html
<ul id="fruits">
  <li id="item-apples"><a href="/apples">Apples</a></li>
  <li id="item-oranges"><a href="/oranges">Oranges</a></li>
</ul>
```

```js
cy.get('#fruits li')
  .should('have.length', 2) // there are 2 LI items
  // 🚨 NOT GOING TO WORK
  // "Your subject contained 2 elements"
  .within(() => {
    // Nope, not going to get here
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

See the [Pseudo CSS selectors](../recipes/pseudo-selectors.md) recipe.
