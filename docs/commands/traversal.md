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
cy.get('.traversal-list>li')
  .eq(1)
  .should('contain', 'siamese')
```

<!-- fiddle-end -->

## [.filter()](https://on.cypress.io/filter)

To get DOM elements that match a specific selector, use the `.filter()` command.

<!-- fiddle filter -->

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
  <input
    class="btn btn-default"
    type="button"
    value="Input"
  />
  <input
    class="btn btn-default"
    type="submit"
    value="Submit"
  />
</div>
```

```js
cy.get('.traversal-buttons .btn')
  .last()
  .should('contain', 'Submit')
```

<!-- fiddle-end -->
