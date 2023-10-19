# Every Element Has HREF Link

📺 Watch this recipe explained in the video [Confirm That Every Element With A Data Attribute Has The HREF Attribute Too](https://youtu.be/sppI7xabyoA).

<!-- fiddle Confirm every element with data attribute has a href link -->

The following list has elements with different `data-` attributes. They all have `href` attributes, let's confirm it. Then let's confirm the reverse: elements without `data-` attributes have no `href`.

```html
<ul>
  <li>apples</li>
  <li data-product href="https://acme.co">pears</li>
  <li data-price="199" href="https://acme.co/buy">grapes</li>
  <li>kiwi</li>
  <li data-cy="recent" href="https://acme.co/recent-items">
    melons
  </li>
</ul>
```

```js
// find all elements with `data-*` attribute
// by first grabbing all elements, then filtering
// to leave only the ones with a "data-" attribute
cy.get('*')
  .filter((k, el) => {
    const attributes = el.getAttributeNames()
    return attributes.some((attribute) =>
      attribute.startsWith('data-'),
    )
  })
  // confirm each element has an href attribute
  .each(($el, k) => {
    expect($el, `el ${k + 1}`).to.have.attr('href')
  })
```

Let's confirm elements without `data-` attributes have no `href` links.

```js
cy.get('*')
  .filter((k, el) => {
    const attributes = el.getAttributeNames()
    return !attributes.some((attribute) =>
      attribute.startsWith('data-'),
    )
  })
  // confirm each element without "data-"
  // also does not have "href"
  .each(($el, k) => {
    expect($el, `el ${k + 1}`).to.not.have.attr('href')
  })
```

We can also reverse the problem: every element with `href` attribute must have a `data-` attribute.

```js
cy.get('[href]').each(($el, k) => {
  const attributes = $el[0].getAttributeNames()
  expect(attributes, 'has data-').to.satisfy((attributes) =>
    attributes.some((attribute) =>
      attribute.startsWith('data-'),
    ),
  )
})
```

The elements without `href` attribute should have no `data-` attributes.

```js
cy.get(':not([href])').each(($el, k) => {
  const attributes = $el[0].getAttributeNames()
  expect(attributes, 'has no data-').to.satisfy(
    (attributes) =>
      !attributes.some((attribute) =>
        attribute.startsWith('data-'),
      ),
  )
})
```

<!-- fiddle-end -->
