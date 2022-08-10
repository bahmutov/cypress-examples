# Compare attribute

<!-- fiddle Confirm the attribute is present or not -->

```html
<button id="member">Is A Member</button>
<div id="info">User is a member?</div>
<style>
  #member[active] {
    background-color: pink;
  }
  #info {
    margin: 1rem 0;
  }
  #info[active]::after {
    content: 'Yes';
    margin-left: 1rem;
  }
</style>
<script>
  const isMember = Math.random() < 0.5
  if (isMember) {
    // set the same attribute on multiple elements
    document
      .getElementById('member')
      .setAttribute('active', 'active')
    document
      .getElementById('info')
      .setAttribute('active', 'active')
  }
</script>
```

```js
cy.get('#member')
  .invoke('attr', 'active')
  .then(Boolean)
  .then(cy.log)
  .then((isActive) => {
    if (isActive) {
      cy.get('#info').should('have.attr', 'active')
    } else {
      cy.get('#info').should('not.have.attr', 'active')
    }
  })
```

<!-- fiddle-end -->

## See also

- [Compare numbers](./compare-numbers.md)
