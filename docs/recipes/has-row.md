# Table Has Row

<!-- fiddle Table has row with randomly picked id -->

Le's pick a random UUID from the list and confirm the row is present.

```html hide
<table class="table table-bordered">
  <thead>
    <tr>
      <th>UUID</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A550</td>
      <td>Joe</td>
    </tr>
    <tr>
      <td>C070</td>
      <td>Mary</td>
    </tr>
    <tr>
      <td>K999</td>
      <td>Pete</td>
    </tr>
    <tr>
      <td>T809</td>
      <td>Sue</td>
    </tr>
    <tr>
      <td>M440</td>
      <td>John</td>
    </tr>
  </tbody>
</table>
```

```js
const uuids = ['A550', 'C070', 'K999', 'T809', 'M440']
// pick one of the random ids using Lodash _.random
// https://lodash.com/docs/4.17.15#random
const randomIndex = Cypress._.random(0, uuids.length - 1)
const uuid = uuids[randomIndex]
cy.log(`picked uuid ${randomIndex}: ${uuid}`)
cy.contains('tbody tr', uuid)
  // confirm the row is at the right index position
  .invoke('index')
  .should('equal', randomIndex)
```

<!-- fiddle-end -->
