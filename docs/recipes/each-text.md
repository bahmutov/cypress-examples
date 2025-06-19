# Each Text Content

📺 Find this recipe explained in the video [The Text Of Each Element Starts With The Given String](https://youtu.be/BWuWf8mqe3k).

## List updates after a delay

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
  .each((li, k) => {
    const name = li.text()
    expect(name, `state ${k + 1}`).to.match(/^mi/i)
  })
```

<!-- fiddle-end -->

## Using cypress-map queries

If we are using [cypress-map](https://github.com/bahmutov/cypress-map) plugin, we have additional queries that make writing the test much simpler.

<!-- fiddle Search results start with MI using cypress-map queries -->

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

After slight delay, the results should show several states. Each state name should start with "Mi" (let's ignore case). We query the DOM, map each found element to its text content, then check each string.

```js
cy.get('#search-results li')
  .map('innerText')
  .should((names) => {
    names.forEach((name, k) => {
      expect(name, `state ${k + 1}`).to.match(/^mi/i)
    })
  })
```

<!-- fiddle-end -->

## Using cypress-map queries and chai-each assertion

We can refactor the above solution using [chai-each](https://www.chaijs.com/plugins/chai-each/) assertion library.

<!-- fiddle Search results start with MI using chai-each assertion -->

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

After slight delay, the results should show several states. Each state name should start with "Mi" (let's ignore case). We query the DOM, map each found element to its text content, then check each string using `each.match` assertion:

```js
cy.get('#search-results li')
  .map('innerText')
  .should('each.match', /^mi/i)
```

**Important:** Cypress UI shows the last assertion only, but it does validate _every_ string in the `string[]` subject.

<!-- fiddle-end -->
