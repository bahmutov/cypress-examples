# Sum Of Numbers

<!-- fiddle Sum of numbers -->

When the user changes what they see in this example ("all posts", drafts, or just the published posts), the page shows the post count. The total number of drafts plus published posts should equal to the total number of all posts.

📺 Watch this recipe explained in the video [Simplify Sum Of Numbers Example To Avoid Callback Pyramid Of Doom ](https://youtu.be/6iQZhtXSag8)

```html hide
<form>
  <input
    type="radio"
    id="all"
    name="showing"
    value="all"
    checked
  />
  <label for="all">All</label>
  <input type="radio" id="draft" name="showing" value="draft" />
  <label for="draft">Draft</label>
  <input
    type="radio"
    id="published"
    name="showing"
    value="published"
  />
  <label for="published">Published</label>
  <p id="counts">All posts: 10 of 45</p>
</form>
<script>
  const p = document.getElementById('counts')
  document
    .getElementById('all')
    .addEventListener('change', () => {
      p.innerText = 'All posts: 10 of 45'
    })
  document
    .getElementById('draft')
    .addEventListener('change', () => {
      p.innerText = 'Draft posts: 5 of 15'
    })
  document
    .getElementById('published')
    .addEventListener('change', () => {
      p.innerText = 'Published posts: 20 of 30'
    })
</script>
```

Let's verify it first using a "pyramid of doom" approach.

```js skip
// last digits of the string
const regex = /\d+$/g
cy.get('#counts')
  .invoke('text')
  .then((allText) => {
    // show drafts
    cy.get('input#draft').check()
    cy.get('#counts')
      .invoke('text')
      .then((draftText) => {
        // show published
        cy.get('input#published').check()
        cy.get('#counts')
          .invoke('text')
          .then((publishedText) => {
            // parse each text and get the count
            const all = parseInt(allText.match(regex).pop())
            const draft = parseInt(draftText.match(regex).pop())
            const published = parseInt(
              publishedText.match(regex).pop(),
            )
            expect(
              draft + published,
              'draft + published',
            ).to.equal(all)
          })
      })
  })
```

Ok, there are a lot of callbacks in the code above. Let's simplify it.

I like parsing the text into the number right away to make sure the text is parsed correctly. We can parse each string and save the number under an alias. Then we can get all aliases at once using the `cy.then(function callback)` form.

```js skip
const regex = /\d+$/g
cy.get('#counts')
  .invoke('text')
  .invoke('match', regex)
  .invoke('pop')
  .then(parseInt)
  .should('be.a', 'number')
  .as('all')
cy.log('**show drafts**')
cy.get('input#draft').check()
cy.get('#counts')
  .invoke('text')
  .invoke('match', regex)
  .invoke('pop')
  .then(parseInt)
  .should('be.a', 'number')
  .as('draft')
cy.log('**show published**')
cy.get('input#published').check()
cy.get('#counts')
  .invoke('text')
  .invoke('match', regex)
  .invoke('pop')
  .then(parseInt)
  .should('be.a', 'number')
  .as('published')
  // now use cy.then(function callback)
  .then(function () {
    expect(
      this.draft + this.published,
      'draft + published',
    ).to.equal(this.all)
  })
```

Let's remove duplication by creating a custom query command.

```js
Cypress.Commands.addQuery('lastNumber', () => {
  return ($el) => {
    const regex = /\d+$/g
    return parseInt($el.text().match(regex).pop())
  }
})
cy.get('#counts').lastNumber().as('all')
cy.log('**show drafts**')
cy.get('input#draft').check()
cy.get('#counts').lastNumber().as('draft')
cy.log('**show published**')
cy.get('input#published').check()
cy.get('#counts')
  .lastNumber()
  // no need to create extra alias for the last number
  // just pass it directly into the function callback
  .then(function (published) {
    expect(this.draft + published, 'draft + published').to.equal(
      this.all,
    )
  })
```

<!-- fiddle-end -->
