# Check Link Attributes

📺 Watch this recipe explained in the video [Checking HEAD link elements](https://youtu.be/219EnPj5CbM).

<!-- fiddle Checking several links -->

Imagine our HTML document contains multiple `<link>` elements. We want to validate the attributes for each link.

- the `rel` attribute value should be restricted to certain values
- the `crossorigin` attribute should always equal to `anonymous`
- the `href` value should be a valid URL

```html
<head>
  <link
    rel="preconnect"
    href="https://acme1.co"
    crossorigin="anonymous"
  />
  <link
    rel="preconnect"
    href="https://acme2.co"
    crossorigin="anonymous"
  />
  <link
    rel="preconnect"
    href="https://acme3.co"
    crossorigin="anonymous"
  />
</head>
```

```js
cy.get('link[rel]').each(($link) => {
  const html = $link[0].outerHTML
  const href = $link.attr('href')
  const rel = $link.attr('rel')

  expect(rel, html).to.be.oneOf(['preconnect', 'prefetch'])
  expect($link, html).to.have.attr('crossorigin', 'anonymous')

  // check if the link URL is well-formed
  try {
    const url = new URL(href)
  } catch (error) {
    throw new Error(`Link has invalid href ${html}`)
  }
})
```

<!-- fiddle-end -->
