# Request a specific comment

Imagine we have a page showing a number of a comment to fetch. The test needs to read the number from the page, then make a request to the API, and confirm the comment resource exists.

<!-- fiddle Request a specific comment -->

```html
<div>Comment number <span data-cy="comment-number">#23#</span></div>
```

```js
// first, find the element on the page
cy.get('[data-cy=comment-number]')
  .invoke('text')
  // the text might have other characters which we will remove
  // the comment number must be an integer
  // thus we will remove all non-digit characters
  .invoke('replace', /[\D]/g, '')
  .should('not.be.empty')
  .then(parseInt)
  .should('be.a', 'number')
  .and('be.greaterThan', 0)
  .then((n) => cy.log(`comment number: **${n}**`))
  .then((n) => {
    // cy.request automatically fails if the resource is missing
    // https://on.cypress.io/request
    cy.request(`https://jsonplaceholder.cypress.io/comments/${n}`)
      .its('body')
      .should('have.keys', ['id', 'postId', 'name', 'body', 'email'])
      .then((comment) => {
        expect(comment, 'fetched the right comment').to.have.property(
          'id',
          n,
        )
        // let's fetch the post for this comment
        cy.log(`fetching post **${comment.postId}**`)
        cy.request(
          `https://jsonplaceholder.cypress.io/posts/${comment.postId}`,
        )
          .its('body')
          .should('have.keys', ['id', 'userId', 'body', 'title'])
        // we can fetch the user by id, or confirm something else
      })
  })
```

<!-- fiddle-end -->

You can find this recipe explained in the video [Request A Specific Comment Using Text From The Page](https://youtu.be/pz_orYM-7xM)
