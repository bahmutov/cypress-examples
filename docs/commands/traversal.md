# Traversal

Examples of traversing DOM elements in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [.children()](https://on.cypress.io/children)

To get children of DOM elements, use the `.children()` command.

<!-- fiddle children / get elements with class active -->

```html
<ol class="traversal-breadcrumb breadcrumb">
  <li class="breadcrumb-item"><a href="#">Home</a></li>
  <li class="breadcrumb-item"><a href="#">Library</a></li>
  <li class="breadcrumb-item active">Data</li>
</ol>
```

```js
cy.get('.traversal-breadcrumb')
  .children('.active')
  .should('contain', 'Data')
```

<!-- fiddle-end -->

You can get the number of children and check it using `have.length` assertions. Even hidden elements are counted.

<!-- fiddle children / get the number of children -->

```html
<ol id="fruit-cart">
  <li>Oranges</li>
  <li>Grapes</li>
  <li style="display:none">Apples (sold out)</li>
</ol>
```

```js
// confirm the total number of children
cy.get('#fruit-cart').children().should('have.length', 3)
// confirm the number of visible children
cy.get('#fruit-cart')
  // use the jQuery pseudo selector ":visible"
  .children(':visible')
  .should('have.length', 2)
// confirm the number of hidden children
cy.get('#fruit-cart')
  // use the jQuery pseudo selector ":hidden"
  .children(':hidden')
  .should('have.length', 1)
// get the number of hidden children
// using "not visible" pseudo selectors
cy.get('#fruit-cart')
  .children(':not(:visible)')
  .should('have.length', 1)
```

<!-- fiddle-end -->

## [.closest()](https://on.cypress.io/closest)

To get the closest ancestor DOM element, use the `.closest()` command.

<!-- fiddle closest -->

```html
<ul class="list-group">
  <li class="list-group-item">
    <span class="badge">14</span>
    Events
  </li>
  <li class="list-group-item">
    <span class="badge traversal-badge">54</span>
    Friends
  </li>
</ul>
```

```js
cy.get('.traversal-badge')
  .closest('ul')
  .should('have.class', 'list-group')
```

<!-- fiddle-end -->

## [.eq()](https://on.cypress.io/eq)

To get a DOM element at a specific index, use the `.eq()` command.

<!-- fiddle eq -->

```html
<ul class="traversal-list">
  <li>tabby</li>
  <li>siamese</li>
  <li>persian</li>
  <li>sphynx</li>
  <li>burmese</li>
</ul>
```

```js
cy.get('.traversal-list>li').eq(1).should('contain', 'siamese')
```

<!-- fiddle-end -->

## [.filter()](https://on.cypress.io/filter)

To get DOM elements that match a specific selector, use the `.filter()` command.

<!-- fiddle filter / by class -->

```html
<ul class="traversal-nav nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link" href="#">Home</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" href="#">About</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Services</a>
  </li>
</ul>
```

```js
cy.get('.traversal-nav > li a')
  .filter('.active')
  .should('contain', 'About')
```

<!-- fiddle-end -->

### Elements with an attribute

Let's grab all row elements, but then keep only the elements with an attribute `line` present:

<!-- fiddle filter / elements with an attribute -->

```html
<table id="filter-attribute">
  <tbody>
    <tr>
      <td>No line</td>
    </tr>
    <tr>
      <td>No line</td>
    </tr>
    <!-- attribute line has no value at all -->
    <tr line>
      <td>line</td>
    </tr>
    <tr line="up">
      <td>line</td>
    </tr>
    <tr line="down">
      <td>line</td>
    </tr>
    <tr>
      <td>No line</td>
    </tr>
  </tbody>
</table>
```

```js
cy.get('#filter-attribute tr')
  // only interested in the elements
  // that have the attribute "line"
  .filter('[line]')
  .should('have.length', 3)
```

<!-- fiddle-end -->

### Visible elements

You can use `.filter` to find visible elements using jQuery selector `:visible`

<!-- fiddle filter / visible elements -->

```html
<ul class="visible-items">
  <li>first</li>
  <li style="display:none">second</li>
  <li style="display:none">third</li>
  <li>fourth</li>
</ul>
```

```js
cy.get('.visible-items li')
  .should('have.length', 4) // all LI items
  // from all found elements, find only the visible ones
  .filter(':visible')
  .should('have.length', 2) // only 2 visible LI items
```

**Tip:** you can make the test more robust against flake by merging the two commands `cy.get` + `.filter` into a single one following the advice given in the [Cypress Retry-ability](https://on.cypress.io/retry-ability) guide.

```js
cy.log('**single :visible selector query**')
// use a single CSS + :visible jQuery selector
cy.get('.visible-items li:visible')
  // only 2 visible LI items
  .should('have.length', 2)
```

<!-- fiddle-end -->

### Using a callback function

You can filter elements using a predicate callback function.

<!-- fiddle filter / using a callback function -->

Let's find all list items with the text "cat" or class "pet".

```html
<ul id="animals">
  <li class="pet">Puppy</li>
  <li>Small cat</li>
  <li>Large cat</li>
  <li>Pet tarantula</li>
  <li class="pet">Hamster</li>
</ul>
```

```js
cy.get('#animals li')
  // ensure we have all items
  .should('have.length', 5)
  // find the items we are interested in
  .filter((k, el) => {
    // k is the 0-based index
    // el is the DOM element
    return (
      el.classList.contains('pet') ||
      el.innerText.includes('cat')
    )
  })
  .should('have.length', 4)
```

<!-- fiddle-end -->

Watch the video [Use cy.filter For Complex Element Filtering](https://youtu.be/AO9iPIg9yKk).

Find more filtering examples in the recipes [Computed style](../recipes/computed-style.md) and [Filter elements](../recipes/filter-elements.md). Learn how to find input elements by their current value in the recipe [Input value](../recipes/input-value.md).

### Skip an element with certain text

<!-- fiddle filter / skip element with text -->

Let's say we want to grab the list of job options from the list below. Notice that one of the entries has the descriptive text and should be skipped.

```html
<ul id="jobs">
  <li>(Pick your current job)</li>
  <li>Teacher</li>
  <li>Nurse</li>
  <li>Driver</li>
</ul>
```

We can skip the non-job list item in several ways.

```js
// 1. skip using the cy.filter(callback)
cy.get('#jobs li')
  .filter((k, el) => !el.innerText.includes('Pick'))
  .should('have.length', 3)
// 2. skip using the cy.filter(callback) using the index
cy.get('#jobs li')
  // filter out the very first element
  .filter((k) => k > 0)
  .should('have.length', 3)
// 3. filter using the text and jQuery
// :not and :contains selectors
cy.get('#jobs li')
  .filter(':not(:contains("Pick"))')
  .should('have.length', 3)
```

<!-- fiddle-end -->

## [.find()](https://on.cypress.io/find)

To get descendant DOM elements of the selector, use the `.find()` command.

<!-- fiddle find -->

```html
<ul class="pagination traversal-pagination">
  <li class="page-item">
    <a class="page-link" href="#">
      <span>&laquo;</span>
    </a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">1</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">2</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">3</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">4</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">5</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">
      <span>&raquo;</span>
    </a>
  </li>
</ul>
```

```js
// 5 individual links plus "prev" and "next" links
cy.get('.traversal-pagination')
  .find('li.page-item')
  .find('a')
  .should('have.length', 7)
```

<!-- fiddle-end -->

### Finds all elements

The `.find()` command is a child command. For every element yielded by the parent command, `.find` finds the elements matching the selectors.

<!-- fiddle find returns list items -->

```html
<ul id="a-list">
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

```js
cy.get('ul#a-list').find('li').should('have.length', 3)
```

<!-- fiddle-end -->

Now imagine we grab the `<LI>` elements and try to find elements in each one.

<!-- fiddle finds elements in each parent element -->

```html
<ul id="anchors">
  <li><a>link A</a>, <a>link B</a></li>
  <li><a>link C</a>, <a>link D</a></li>
  <li><a>link E</a>, <a>link F</a></li>
</ul>
```

```js
cy.get('ul#anchors li')
  .should('have.length', 3)
  // inside each LI element, find the A elements
  .find('a')
  .should('have.length', 6)
```

<!-- fiddle-end -->

### Find all links

If we want to find every child element with `href` attribute:

<!-- fiddle finds elements with href attribute for every LI -->

```html
<ul id="links">
  <li><a href="a">link A</a>, <a>link B</a></li>
  <li><a>link C</a>, <a href="d">link D</a></li>
  <li><a href="e">link E</a>, <a href="f">link F</a></li>
</ul>
```

Notice how only some of the `<A>` elements have `href` attribute

```js
cy.get('ul#links li')
  .should('have.length', 3)
  // inside each LI element, find the elements with href attribute
  .find('[href]')
  .should('have.length', 4)
```

<!-- fiddle-end -->

### Find links without href attribute

<!-- fiddle finds links without href attribute -->

```html
<ul id="incomplete-links">
  <li><a href="a">link A</a>, <a>link B</a></li>
  <li><a>link C</a>, <a href="d">link D</a></li>
  <li><a href="e">link E</a>, <a href="f">link F</a></li>
</ul>
```

Let's find `LI` elements, then inside each find `A` elements without `href` attribute. We can use the jQuery selector `:not` to search for elements without an attribute.

```js
cy.get('ul#incomplete-links li')
  .should('have.length', 3)
  .find('a:not([href])')
  // only two links are missing "href" attribute
  .should('have.length', 2)
```

<!-- fiddle-end -->

## [.first()](https://on.cypress.io/first)

To get the first DOM element within elements, use the `.first()` command.

<!-- fiddle first -->

```html
<table class="table traversal-table">
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Jane</td>
      <td>Lane</td>
    </tr>
    <tr>
      <td>2</td>
      <td>John</td>
      <td>Doe</td>
    </tr>
  </tbody>
</table>
```

```js
cy.get('.traversal-table td').first().should('contain', '1')
```

<!-- fiddle-end -->

## :first selector

You can also use `:first` CSS selector to merge the `cy.get` and `.first` commands into a single one for better [retry-ability](https://on.cypress.io/retry-ability)

<!-- fiddle :first CSS selector -->

```html
<table class="table traversal-table">
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Jane</td>
      <td>Lane</td>
    </tr>
    <tr>
      <td>2</td>
      <td>John</td>
      <td>Doe</td>
    </tr>
  </tbody>
</table>
```

```js
// get the first table cell using the :first CSS selector
cy.get('.traversal-table td:first').should('have.text', '1')
// get the first row
cy.get('.traversal-table tbody tr:first').contains('td', 'Lane')
```

<!-- fiddle-end -->

## [.last()](https://on.cypress.io/last)

To get the last DOM element within elements, use the `.last()` command.

<!-- fiddle last -->

```html
<div class="traversal-buttons">
  <a class="btn btn-default" href="#" role="button">Link</a>
  <button class="btn btn-default" type="submit">Button</button>
  <input class="btn btn-default" type="button" value="Input" />
  <input class="btn btn-default" type="submit" value="Submit" />
</div>
```

```js
cy.get('.traversal-buttons .btn')
  .last()
  .should('contain', 'Submit')
// you can also use the CSS selector :last to avoid
// using a separate .last() command
cy.get('.traversal-buttons .btn:last').should(
  'contain',
  'Submit',
)
```

<!-- fiddle-end -->

## [.next()](https://on.cypress.io/next)

To get the next sibling DOM element within elements, use the `.next()` command.

<!-- fiddle .next() / get next sibling DOM element -->

```html
<ul class="traversal-ul">
  <li>apples</li>
  <li class="second">oranges</li>
  <li>bananas</li>
</ul>
```

```js
cy.get('.traversal-ul')
  .contains('apples')
  .next()
  .should('have.class', 'second')
  .and('contain', 'oranges')
```

<!-- fiddle-end -->

See also [Sibling element](../recipes/sibling-element.md) recipe.

### [.next()](https://on.cypress.io/next) with selector

Given the previous element (or several), we can find the next element matching the given selector.

<!-- https://github.com/cypress-io/cypress/issues/19724 -->
<!-- fiddle .next() / get next sibling DOM element matching the selector -->

```html
<ul id="next-selector">
  <li>apples</li>
  <li>oranges</li>
  <li>bananas</li>
  <li class="selected">pineapples</li>
</ul>
```

```
// currently does not work due to bug 19724
cy.get('#next-selector li')
  .first()
  .next('.selected')
  .should('have.text', 'pineapples')
```

Workaround while [#19724](https://github.com/cypress-io/cypress/issues/19724) is open

```js
// currently does not work due to bug 19724
cy.get('#next-selector li')
  .first()
  .nextAll()
  .filter('.selected')
  .should('have.text', 'pineapples')
```

<!-- fiddle-end -->

See the video [How To Report A Cypress Bug](https://youtu.be/NnriKHmj5T8).

## [.nextAll()](https://on.cypress.io/nextall)

To get all of the next sibling DOM elements within elements, use the `.nextAll()` command.

<!-- fiddle .nextAll() - get all next sibling DOM elements -->

```html
<ul class="traversal-next-all">
  <li>apples</li>
  <li class="second">oranges</li>
  <li>bananas</li>
  <li>pineapples</li>
  <li>grapes</li>
</ul>
```

```js
cy.get('.traversal-next-all')
  .contains('oranges')
  .nextAll()
  .should('have.length', 3)
```

<!-- fiddle-end -->

## [.nextUntil()](https://on.cypress.io/nextuntil)

To get all of the next sibling DOM elements within elements until another element, use the `.nextUntil()` command.

<!-- fiddle .nextUntil() - get next sibling DOM elements until the matching selector -->

```html
<ul class="healthy-foods">
  <li id="fruits" class="header">Fruits</li>
  <li>apples</li>
  <li>oranges</li>
  <li>bananas</li>
  <li id="veggies" class="header">Vegetables</li>
  <li>cucumbers</li>
  <li>carrots</li>
  <li>corn</li>
  <li id="nuts" class="header">Nuts</li>
  <li>walnuts</li>
  <li>cashews</li>
  <li>almonds</li>
</ul>
<style>
  .header {
    font-weight: bolder;
  }
</style>
```

```js
cy.get('#veggies')
  .nextUntil('#nuts')
  .should('have.length', 3)
  .and(($veggies) => {
    expect($veggies[0]).to.have.text('cucumbers')
    expect($veggies[1]).to.have.text('carrots')
    expect($veggies[2]).to.have.text('corn')
  })
```

<!-- fiddle-end -->

## [.not()](https://on.cypress.io/not)

To remove DOM element(s) from the set of elements, use the `.not()` command.

<!-- fiddle .not() / remove DOM elements from set of DOM elements -->

```html
<div class="traversal-disabled">
  <button
    type="button"
    class="btn btn-default"
    disabled="disabled"
  >
    Disabled
  </button>
  <button type="button" class="btn btn-default">Button</button>
</div>
```

```js
cy.get('.traversal-disabled .btn')
  .not('[disabled]')
  .should('not.contain', 'Disabled')
```

<!-- fiddle-end -->

### Find all incomplete items

Another example, showing the `.not` command vs jQuery `:not(...)` selector. Let's say we have several TODO items, and some of them are already completed.

<!-- fiddle .not() / find incomplete items -->

```html
<style>
  .todo.completed {
    text-decoration: line-through;
    color: gray;
  }
</style>
<ul id="todo-items">
  <li class="todo completed">Code apps</li>
  <li class="todo">Write tests</li>
  <li class="todo completed">Get paid</li>
</ul>
```

```js
cy.get('#todo-items').within(() => {
  // there are two completed items
  cy.get('.todo.completed').should('have.length', 2)
  // but how do we find the incomplete items?
  // 1. select all elements with class "todo"
  // 2. remove all elements with class "completed"
  cy.get('.todo').not('.completed').should('have.length', 1)
  // ALTERNATIVE: a slightly more robust way that does not split the query
  // commands; we can use the jQuery ":not" selector
  cy.get('.todo:not(.completed)').should('have.length', 1)
})
```

<!-- fiddle-end -->

## [.parent()](https://on.cypress.io/parent)

To get parent DOM element of elements, use the `.parent()` command.

<!-- fiddle .parent() - get parent DOM element from DOM elements -->

```html
<p>
  Morbi leo risus, porta ac consectetur ac,
  <mark class="traversal-mark">highlight</mark> vestibulum at
  eros.
</p>
```

```js
cy.get('.traversal-mark')
  .parent()
  .should('contain', 'Morbi leo risus')
```

<!-- fiddle-end -->

## [.parents()](https://on.cypress.io/parents)

To get parent DOM elements of elements, use the `.parents()` command.

<!-- fiddle .parents() - get parent DOM elements from DOM elements -->

```html
<blockquote>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <footer>
    Someone famous in
    <cite class="traversal-cite">Source Title</cite>
  </footer>
</blockquote>
```

```js
cy.get('.traversal-cite').parents().should('match', 'blockquote')
```

<!-- fiddle-end -->

## [.parentsUntil()](https://on.cypress.io/parentsuntil)

To get parents DOM element of elements until other element, use the `.parentsUntil()` command.

<!-- fiddle .parentsUntil() - get parent DOM elements from DOM elements until el -->

```html
<ul class="nav clothes-nav">
  <li>
    <a href="#">Clothes</a>
    <ul class="menu">
      <li>
        <a href="/shirts">Shirts</a>
      </li>
      <li class="active">
        <a href="/pants">Pants</a>
      </li>
    </ul>
  </li>
</ul>
```

```js
cy.get('.clothes-nav')
  .find('.active')
  .parentsUntil('.clothes-nav')
  .should('have.length', 2)
```

<!-- fiddle-end -->

## [.prev()](https://on.cypress.io/prev)

To get the previous sibling DOM element within elements, use the `.prev()` command.

<!-- fiddle .prev() - get previous sibling DOM element -->

```html
<ul class="birds list-group">
  <li class="list-group-item">Cockatiels</li>
  <li class="list-group-item">Lorikeets</li>
  <li class="list-group-item active">Cockatoos</li>
  <li class="list-group-item">Conures</li>
  <li class="list-group-item">Eclectus</li>
</ul>
```

```js
cy.get('.birds')
  .find('.active')
  .prev()
  .should('contain', 'Lorikeets')
```

<!-- fiddle-end -->

## [.prevAll()](https://on.cypress.io/prevall)

To get all previous sibling DOM elements within elements, use the `.prevAll()` command.

<!-- fiddle .prevAll() - get all previous sibling DOM elements -->

```html
<ul class="fruits-list">
  <li>apples</li>
  <li>oranges</li>
  <li class="third">bananas</li>
  <li>pineapples</li>
  <li>grapes</li>
</ul>
```

```js
cy.get('.fruits-list')
  .find('.third')
  .prevAll()
  .should('have.length', 2)
```

<!-- fiddle-end -->

## [.prevUntil()](https://on.cypress.io/prevuntil)

To get all previous sibling DOM elements within elements until other element, use the `.prevUntil()` command.

<!-- fiddle .prevUntil() - get all previous sibling DOM elements until el -->

```html
<ul class="foods-list">
  <li id="fruits" class="header">Fruits</li>
  <li>apples</li>
  <li>oranges</li>
  <li>bananas</li>
  <li id="veggies" class="header">Vegetables</li>
  <li>cucumbers</li>
  <li>carrots</li>
  <li>corn</li>
  <li id="nuts" class="header">Nuts</li>
  <li>walnuts</li>
  <li>cashews</li>
  <li>almonds</li>
</ul>
```

```js
cy.get('.foods-list')
  .find('#nuts')
  .prevUntil('#veggies')
  .should('have.length', 3)
```

<!-- fiddle-end -->

## [.siblings()](https://on.cypress.io/siblings)

To get all sibling DOM elements of elements, use the `.siblings()` command.

<!-- fiddle .siblings() - get all sibling DOM elements -->

```html
<ul class="nav nav-pills traversal-pills">
  <li class="active"><a href="#">Home</a></li>
  <li><a href="#">Profile</a></li>
  <li><a href="#">Messages</a></li>
</ul>
```

```js
cy.get('.traversal-pills .active')
  .siblings()
  .should('have.length', 2)
```

<!-- fiddle-end -->
