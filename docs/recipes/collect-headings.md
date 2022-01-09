# Collect Headings

Imagine we want to collect all sections, and for each section extract important information into a list. At the end we need to write the entire extracted object into a file.

<!-- fiddle Collect headings -->

```html
<section>
  <h2>Install</h2>
  <ol>
    <li>Step 1</li>
    <li>Step 2</li>
    <li>Step 3</li>
  </ol>
</section>
<section>
  <h2>Use</h2>
  <h3>Case 1</h3>
  <p>...</p>
  <h3>Case 2</h3>
  <p>...</p>
</section>
```

```js
const sections = {}
cy.get('section')
  .should('have.length.gt', 0)
  .each(($section) => {
    cy.wrap($section)
      .find('h2')
      .invoke('text')
      .then((heading) => {
        sections[heading] = []
        cy.wrap($section)
          .find('li,h3')
          .each(($item) => {
            sections[heading].push($item.text())
          })
      })
  })
  .then(() => {
    // save into a file
    cy.writeFile('out.json', sections)
  })
```

<!-- fiddle-end -->

See also [cy.each recipe](./each-example.md).
