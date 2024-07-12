# Pseudo CSS selectors

These examples are based on the article [Meet the Pseudo Class Selectors](https://css-tricks.com/pseudo-class-selectors/).

## Links

<!-- fiddle pseudo-selectors / links -->

Some of the anchor elements below do not have `href` attribute, thus they are not _links_. Let's select the anchors with `href` attributes.

```html
<div data-cy="pseudo-links">
  <a href="first">first</a>, <a>second</a>,
  <a href="third">third</a>,
</div>
```

```js
cy.get('[data-cy=pseudo-links]')
  .scrollIntoView()
  .within(() => {
    // by default, "a" returns all 3 elements
    cy.get('a').should('have.length', 3)
    // select "a" elements with "href" attribute
    cy.get('a:link').should('have.length', 2)
    // which is equivalent to
    cy.get('a[href]').should('have.length', 2)
  })
```

<!-- fiddle-end -->

## Empty elements

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
cy.get('[data-cy=empty-elements]')
  .scrollIntoView()
  .within(() => {
    cy.get('p:empty')
      .should('have.length', 3)
      .last()
      .should('have.class', 'nothing')
  })
```

<!-- fiddle-end -->

## First letter

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
cy.get('[data-cy=first-letter]')
  .scrollIntoView()
  .within(() => {
    // Cypress does not recognize the selector "p::first-letter"
    // because the jQuery engine does not support them
    // thus the following DOES NOT WORK with error
    // "Syntax error, unrecognized expression: p::first-letter"
    // cy.get('p::first-letter')
  })
```

<!-- fiddle-end -->

## After content CSS selector `::after`

<!-- fiddle pseudo-selectors / after selector -->

```html
<style>
  /* add a word after each paragraph */
  [data-cy='after-example'] p::after {
    content: 'Joe Smith';
    margin-left: 1em;
  }
</style>
<div data-cy="after-example">
  <p>Write more tests</p>
</div>
```

```js
cy.get('[data-cy=after-example]')
  .scrollIntoView()
  .within(() => {
    // Cypress does not recognize the selector "p::after"
    // because the jQuery engine does not support them
    // so we get the content through the computed style
    // see https://codepen.io/chriscoyier/pen/Pzzawj
    cy.window().then((win) => {
      cy.contains('more tests').then(($el) => {
        const after = win.getComputedStyle($el[0], '::after')
        const afterContent = after.getPropertyValue('content')
        // the content is a string, thus we need to quote it
        expect(afterContent).to.equal('"Joe Smith"')
      })
    })
  })
```

<!-- fiddle-end -->

### Checking the `::after` content using `cypress-map`

You can shorten the above code snippet using [cypress-map](https://github.com/bahmutov/cypress-map) queries

<!-- fiddle pseudo-selectors / after selector using cypress-map -->

```html
<style>
  /* add a word after each paragraph */
  [data-cy='after-example'] p::after {
    content: 'Joe Smith';
    margin-left: 1em;
  }
</style>
<div data-cy="after-example">
  <p>Write more tests</p>
</div>
```

```js
cy.get('[data-cy=after-example] p')
  // from jQuery object, get the actual element
  // and call "window.getComputedStyle(element, '::after')"
  .applyToFirstRight(window.getComputedStyle, '::after')
  .invoke('getPropertyValue', 'content')
  .should('equal', '"Joe Smith"')
```

<!-- fiddle-end -->

## Before content CSS selector `::before`

<!-- fiddle pseudo-selectors / before selector -->

```html
<style>
  /* add a word in front of each paragraph */
  [data-cy='before-example'] p::before {
    content: 'Greeting';
    margin-right: 1em;
  }
</style>
<div data-cy="before-example">
  <p>Hello, world!</p>
</div>
```

```js
cy.get('[data-cy=before-example]')
  .scrollIntoView()
  .within(() => {
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
