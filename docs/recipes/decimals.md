# Decimals

Watch the explanation for this recipe in the video [Check The Element Contains A Number That Ends With Two Decimals](https://youtu.be/-IEFhheipzs).

## Two decimals

Let's confirm the element has text that ends with two decimal numbers.

<!-- fiddle Two decimals -->

```html
<div id="amount">1,465.30</div>
```

```js
cy.contains('#amount', /\.\d\d$/)
```

<!-- fiddle-end -->

## Optional zero last decimal

Sometimes the last digit is optional, if it is zero.

<!-- fiddle Optional last zero -->

```html
<div id="amount">1,465.3</div>
```

```js
cy.contains('#amount', /\.\d\d?$/)
```

<!-- fiddle-end -->

**Tip:** In Cypress v12 you can get the text of the element and invoke the regular expression match method, see [cypress-map](https://github.com/bahmutov/cypress-map)
