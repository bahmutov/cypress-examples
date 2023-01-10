# Compare attribute

<!-- fiddle Confirm the attribute is present or not -->

You can watch this recipe explained in the video [Compare Element Attribute Value](https://youtu.be/lj6cIjbPmh8).

```css
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
```

```html
<button id="member">Is A Member</button>
<div id="info">User is a member?</div>
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
  .should('be.a', 'boolean')
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
