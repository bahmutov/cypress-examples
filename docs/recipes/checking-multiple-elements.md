# Checking Multiple Elements

Imagine that we have a list of items, each item has multiple parts to check. For example, here is a Task list with the title, priority, and status fields. We often need to find the list of elements and check the specific fields inside each element.

<!-- fiddle Cy.elements example -->

```html
<ul id="tasks">
  <li>
    <span class="title">Clean room</span>
    <span class="priority">high</span>
    <span class="status">complete</span>
  </li>
  <li>
    <span class="title">Write code</span>
    <span class="priority">medium</span>
    <span class="status">in progress</span>
  </li>
  <li>
    <span class="title">Add tests</span>
    <span class="priority">low</span>
    <span class="status">to do</span>
  </li>
</ul>
```

```css
ul#tasks {
  list-style: none;
  line-height: 2rem;
  .priority {
    background-color: lightBlue;
    padding: 5px 10px;
    border-radius: 3px;
    font-weight: bold;
  }
  .status {
    background-color: lightYellow;
    padding: 5px 10px;
    border-radius: 3px;
    font-weight: bold;
  }
}
```

Let's find all task elements and check the text content for `.title`, `.priority`, and `.status` elements inside. Using the `cy.elements` query from [cypress-map](https://github.com/bahmutov/cypress-map) plugin makes it simple. It yields an array of arrays of strings.

```js
// make sure the assertion shows the full array
chai.config.truncateThreshold = 300
cy.elements(
  '#tasks li', // the parent selector: the list elements
  // all these selectors are used inside each element
  // found by the parent selector
  '.title',
  '.priority',
  '.status',
).should('deep.equal', [
  ['Clean room', 'high', 'complete'],
  ['Write code', 'medium', 'in progress'],
  ['Add tests', 'low', 'to do'],
])
```

<!-- fiddle-end -->

## See also

- [Query multiple elements](./query-multiple-elements.md)
