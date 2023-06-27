# Each Text Content

<!-- fiddle Search results start with MI -->

```html hide
<label>State name</label>
<input name="state" />
<ul id="search-results"></ul>
<script>
  document
    .querySelector('[name=state]')
    .addEventListener('input', (e) => {
      if (e.target.value === 'mi') {
        setTimeout(() => {
          document.getElementById('search-results').innerHTML = `
            <li>Michigan</li>
            <li>Minnesota</li>
            <li>Mississippi</li>
            <li>Missouri</li>
          `
        }, 1000)
      }
    })
</script>
```

```js
cy.get('[name=state]').type('mi')
```

After slight delay, the results should show several states. Each state name should start with "Mi" (let's ignore case)

```js
cy.get('#search-results li')
  .should('exist')
  .each((li) => {
    const name = li.text()
    expect(name, name).to.match(/^mi/i)
  })
```

<!-- fiddle-end -->
