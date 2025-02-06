## 11: Check Links Quickly

📺 Watch this recipe explained in the video [Lesson 11: Check Multiple Links Quickly](https://youtu.be/1yPuK57Eqho).

<!-- fiddle Check all links using cy.request -->

```html
<ul id="links-to-check">
  <li><a href="https://glebbahmutov.com">my site</a></li>
  <li>
    <a href="https://glebbahmutov.com/soccer"
      >my site soccer page</a
    >
  </li>
  <li><a href="https://cypress.tips">cypress.tips</a></li>
  <!-- this url is broken on purpose -->
  <!-- <li><a href="https://cypress.TIPZ">cypress.TIPZ</a></li> -->
</ul>
```

```js
cy.get('#links-to-check a')
  // cy.map comes from the cypress-map plugin
  .map('href')
  .each((url) => cy.request(url))
```

**Note:** we can "simplify" the callback by constructing an unary version of `cy.request` function command to avoid any `cy.request` confusion from multiple arguments passed by [cy.each](https://on.cypress.io/each). For more on unary functions and a good example, read my blog post [Functional JavaScript interview question](https://glebbahmutov.com/blog/functional-js-interview-question/)

```js
cy.log('**unary example**')
cy.get('#links-to-check a')
  // cy.map comes from the cypress-map plugin
  .map('href')
  .each(Cypress._.unary(cy.request))
```

<!-- fiddle-end -->
