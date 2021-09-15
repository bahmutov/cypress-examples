# Traversal

Examples of traversing DOM elements in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [.children()](https://on.cypress.io/children)

To get children of DOM elements, use the `.children()` command.

<!-- fiddle children -->

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

## [.last()](https://on.cypress.io/last)

To get the last DOM element within elements, use the `.last()` command.

<!-- fiddle last -->

```html
<div class="traversal-buttons">
  <a class="btn btn-default" href="#" role="button">Link</a>
  <button class="btn btn-default" type="submit">
    Button
  </button>
  <input class="btn btn-default" type="button" value="Input" />
  <input class="btn btn-default" type="submit" value="Submit" />
</div>
```

```js
cy.get('.traversal-buttons .btn').last().should('contain', 'Submit')
```

<!-- fiddle-end -->

## [.next()](https://on.cypress.io/next)

To get the next sibling DOM element within elements, use the `.next()` command.

<!-- fiddle .next() - get next sibling DOM element -->

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
  .should('contain', 'oranges')
```

<!-- fiddle-end -->

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

<!-- fiddle .nextUntil() - get next sibling DOM elements until next el -->

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
```

```js
cy.get('#veggies').nextUntil('#nuts').should('have.length', 3)
```

<!-- fiddle-end -->

## [.not()](https://on.cypress.io/not)

To remove DOM element(s) from the set of elements, use the `.not()` command.

<!-- fiddle .not() / remove DOM elements from set of DOM elements -->

```html
<div class="traversal-disabled">
  <button type="button" class="btn btn-default" disabled="disabled">
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
// there are two completed items
cy.get('#todo-items').within(() => {
  cy.get('.todo.completed').should('have.length', 2)
  // select all elements with class "todo"
  // remove all elements with class "completed"
  cy.get('.todo').not('.completed').should('have.length', 1)
  // slightly more robust command that does not split the query
  // can be written using the jQuery ":not" selector
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
  <mark class="traversal-mark">highlight</mark> vestibulum at eros.
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
cy.get('.birds').find('.active').prev().should('contain', 'Lorikeets')
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
cy.get('.traversal-pills .active').siblings().should('have.length', 2)
```

<!-- fiddle-end -->
