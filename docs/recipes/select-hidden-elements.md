# Select Hidden Or Visible Elements

📺 Watch this recipe explained in the video [Select Hidden Or Visible Elements](https://youtu.be/Tm3y2Lw2Jic).

## Select hidden elements

<!-- fiddle Select hidden elements -->

```html
<ul id="people">
  <li>Joe</li>
  <li style="display:none">Ann</li>
  <li>Mary</li>
  <li style="opacity:0">Chris</li>
</ul>
```

You can find all invisible elements in the DOM using the jQuery selector [:hidden](https://api.jquery.com/hidden-selector/). **Note:** Cypress considers elements with `opacity:0` to be hidden.

```js
cy.get(':hidden')
  .map('innerText')
  .should('deep.equal', ['Ann', 'Chris'])
```

You can use `:hidden` with the [cy.filter](https://on.cypress.io/filter) command.

```js
cy.get('li')
  .filter(':hidden')
  .map('innerText')
  .should('deep.equal', ['Ann', 'Chris'])
```

**Tip:** avoid matching stray elements by using a selector + `:hidden` combination. For example, to find all hidden `<LI>` elements inside the `#people` list, use the precise selector:

```js
cy.get('#people li:hidden')
  .map('innerText')
  .should('deep.equal', ['Ann', 'Chris'])
```

<!-- fiddle-end -->

## Select visible elements

<!-- fiddle Select visible elements -->

```html
<ul id="people">
  <li>Joe</li>
  <li style="display:none">Ann</li>
  <li>Mary</li>
  <li style="opacity:0">Chris</li>
</ul>
```

You can find all visible elements in the DOM using the jQuery selector [:visible](https://api.jquery.com/visible-selector/). **Note:** Cypress considers elements with `opacity:0` to be hidden.

```js
cy.get('#people li:visible')
  .map('innerText')
  .should('deep.equal', ['Joe', 'Mary'])
```

**Note:** finding visible elements might return a lot of elements, including the parent elements in the DOM tree. In our example visible elements include the parent list element `<UL>` plus the individual `<LI>` elements.

```js
cy.get(':visible')
  .map('nodeName')
  .should('deep.equal', ['UL', 'LI', 'LI'])
```

<!-- fiddle-end -->
