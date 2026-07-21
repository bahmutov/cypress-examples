# Test JSON+LD object

Sometimes the pages include machine-readable nodes with [JSON+LD](https://json-ld.org/) text. We can easily read / test these objects from Cypress tests.

<!-- fiddle JSON+LD parsing -->

```html
<div id="singer">
  <h2>John Lennon</h2>
  <script type="application/ld+json">
    {
      "@context": "https://json-ld.org/contexts/person.jsonld",
      "@id": "http://dbpedia.org/resource/John_Lennon",
      "name": "John Lennon",
      "born": "1940-10-09",
      "spouse": [
        "http://dbpedia.org/resource/Yoko_Ono",
        "http://dbpedia.org/resource/Cynthia_Lennon"
      ]
    }
  </script>
</div>
```

Let's confirm the name and date of birth.

```js
cy.contains('#singer', 'John Lennon')
  // find the element and grab its text
  .find('script[type="application/ld+json"]')
  .invoke('text')
  // convert into a simple JSON object
  .then(JSON.parse)
  // and validate any properties
  .should('deep.include', {
    name: 'John Lennon',
    born: '1940-10-09',
  })
```

<!-- fiddle-end -->

If you need more advanced parsing, check out [jsonld.js](https://github.com/digitalbazaar/jsonld.js).
