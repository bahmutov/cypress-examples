# Split Element Query

Usually I prefer a single "merged" selector with my query commands. But sometimes we need to split the queries because we are trying to check _different_ elements. Here is one such scenario. Imagine our page shows a list of "accordion" elements and all elements should be expanded at first. We might right a straightforward check using a single query selector:

## Single query selector

<!-- fiddle Single query selector -->

```html
<div id="panels">
  <div role="accordion" aria-expanded="true">One</div>
  <div role="accordion" aria-expanded="true">Two</div>
</div>
```

```js
cy.get('#panels [role=accordion][aria-expanded=false]').should(
  'not.exist',
)
```

<!-- fiddle-end -->

## Single query selector fails

What the single selector above `cy.get(selector).should('not.exist')` fails to do is to distinguish _which_ elements do not exist. For example, we might not see _any_ panels (which we expect implicitly), yet the test passes

<!-- fiddle Single query selector but there are no panels -->

```html
<div id="panels"></div>
```

```js
cy.get('#panels [role=accordion][aria-expanded=false]').should(
  'not.exist',
)
```

<!-- fiddle-end -->

This is probably not what we expected to confirm, right? We want _some_ panels, and all of them collapsed. Thus we want separate query commands; one to confirm that there are panels (with built-in existence assertion), then another query selector to confirm that all panels have been expanded.

## Split query commands

<!-- fiddle Split query commands -->

```html
<div id="panels">
  <div role="accordion" aria-expanded="true">One</div>
  <div role="accordion" aria-expanded="true">Two</div>
</div>
```

```js
// cy.get has a built-in existence assertion
cy.get('#panels [role=accordion]')
  .find('[aria-expanded=false]')
  .should('not.exist')
```

<!-- fiddle-end -->
