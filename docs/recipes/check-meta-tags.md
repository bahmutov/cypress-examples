# Check meta tags

```js
// confirm the page title includes the string "TodoMVC"
cy.get('head title').should('include.text', 'TodoMVC')
// confirm the meta tag name is "Gleb Bahmutov"
cy.get('head meta[name=author]').should(
  'have.attr',
  'content',
  'Gleb Bahmutov',
)
// confirm the meta tag description includes the expected text "workshop"
cy.get('head meta[name=description]')
  .should('have.attr', 'content')
  .should('include', 'workshop')
```

Watch the video [Check Head Title And Meta Tags](https://www.youtube.com/watch?v=jyVonM8uOpQ)
