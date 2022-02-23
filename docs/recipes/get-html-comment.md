# Get HTML comment

<!-- fiddle Get HTML comment -->

```html
<p>There is an HTML comment after this paragraph</p>
<!-- I am a comment -->
```

```js
cy.get('p')
  .then(($p) => {
    // from the jQuery object get the DOM element
    // then use the "nextSibling" to get the "\n" text node
    // then the "nextSibling" again to get the comment node
    return $p[0].nextSibling.nextSibling
  })
  .should('deep.include', {
    nodeName: '#comment',
    data: ' I am a comment ',
  })
```

<!-- fiddle-end -->
